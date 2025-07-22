import React, { useState,useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import StudentProfileForm from '../Forms/StudentProfile';
import { collection, doc, getDoc, getDocs, query, serverTimestamp,  setDoc,  where } from 'firebase/firestore';
import { db } from '../firebase';

const StudentDashboard = () => {
  const {user} = useAuth();
  const [searchTerm,setSearchTerm] = useState('') 
  const profilepic = user?.photoURL;

  const [profile, setProfile] = useState({
    name: "", 
    bio: "",
    skills:[],
    isEditing: false
  });

  const [skillRequests, setSkillRequests] = useState([]);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const learningHistory = []; 

  const [newRequest, setNewRequest] = useState({
    skill: "",
    teacher: "",
    message: ""
  });

  const [feedback, setFeedback] = useState({
    sessionId: "",
    rating: 0,
    comment: ""
  });

    useEffect(() => {
      const isProfileCompleted = localStorage.getItem("isStudentProfileCompleted");
      if (!isProfileCompleted) {
        setShowProfilePopup(true);
      }

      const fetchDetails = async() =>{
          if(user?.uid){
            try{
              const profileRef = doc(db,'students',user.uid)
              const profileSnap = await getDoc(profileRef);
              if(profileSnap.exists()){
                const data = profileSnap.data()
                setProfile(prev => ({
                  ...prev,
                  name : data.name || "",
                  bio : data.bio || "",
                  skills : data.skills || []
                }));
              }
            }catch(error){
              console.log(error);
            }
          }
      }  

      const fetchSkillRequest = async() => {
        if (user?.uid) {
          try {
            const requestsCollectionRef = collection(db, 'skillRequests');
            const q = query(requestsCollectionRef, where('studentId', '==', user.uid));
            const querySnapshot = await getDocs(q);
            
            console.log("Query Result Count:", querySnapshot.size);

            const requests = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            setSkillRequests(requests);
            console.log("setSkillRequests called with:", requests);
          } catch (error) {
            console.error("Error fetching skill requests:", error);
          }
        }
      };

      fetchDetails()
      if(user?.uid){
        fetchSkillRequest();
      }
      
    }, [user?.uid]);

    const handleProfileComplete = () => {
      localStorage.setItem("isStudentProfileCompleted", "true");
      setShowProfilePopup(false);
    };

  const handleEditProfile = () => {
    setProfile({ ...profile, isEditing: !profile.isEditing });
  };

    const handleSaveProfile = async () => {
      try {
        const profileRef = doc(db, 'students', user.uid);
        await setDoc(
          profileRef,
          {
            name: profile.name,
            bio: profile.bio,
            skills: profile.skills
          },
          { merge: true }
        );
        alert('✅ Profile updated successfully!');
        setProfile((prev) => ({ ...prev, isEditing: false }));
      } catch (error) {
        console.error('❌ Error updating profile:', error);
        alert('Failed to save profile changes.');
      }
    };

  const handleSearch = async() => {
      if(!searchTerm.trim()) return;

      try{
        const sessionRef  = collection(db,'sessions');
        const q = query(sessionRef,where('topic','==',searchTerm.trim()));
        const querySnapshot = await getDocs(q);

        if(!querySnapshot.empty){
          const sessionMatcher = querySnapshot.docs[0].data();
          setNewRequest({
            skill: searchTerm.trim(),
            teacher: sessionMatcher.name || "",
            message: ""
          });
          alert(`✅ Found teacher ${sessionMatcher.name} for "${searchTerm}"`);
        }else{
          alert("❌ No teacher found with that subject.");
        }
      }catch(error){
       console.error("Error searching teachers:", error);
      alert("🔥 Error searching teachers. See console for details.");
      }
  }
  const handleSendRequest = async() => {
    if (!newRequest.skill || !newRequest.teacher || !newRequest.message) {
      alert("⚠️ Please fill in all the fields before sending the request.");
      return;
    }

    const LatestRequest = {
      skill : newRequest.skill,
      teacher : newRequest.teacher,
      StudentName : profile.name,
      studentId : user.uid,
      message : newRequest.message,
      status: 'pending',
      timestamp: serverTimestamp()
    }

    try{
       const requestRef = doc(collection(db, 'skillRequests'));
      await setDoc(requestRef, LatestRequest);
      alert(`Request sent for ${newRequest.skill}`);
        setNewRequest({ skill: "", teacher: "", message: "" });
    }catch(error){
      console.error("Error sending request:", error);
      alert("❌ Failed to send the request.");
    }
  };

  const handleSubmitFeedback = () => {
    alert(`Feedback submitted for session ${feedback.sessionId}`);
    setFeedback({ sessionId: "", rating: 0, comment: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
        {showProfilePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <StudentProfileForm onComplete={handleProfileComplete} />
        </div>
      )}
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <img className="h-8 w-8 rounded-full" src={profilepic} alt="Profile" referrerPolicy='no-referrer' />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Overview */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6 bg-indigo-700">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-white">Profile Overview</h3>
                  <button 
                    onClick={handleEditProfile}
                    className="text-sm text-indigo-200 hover:text-white"
                  >
                    {profile.isEditing ? "Cancel" : "Edit Profile"}
                  </button>
                </div>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="flex flex-col items-center">
                  <img 
                    className="h-24 w-24 rounded-full mb-4" 
                    src={profilepic} 
                    alt="Student"
                    referrerPolicy='no-referrer'
                  />
                  
                  {profile.isEditing ? (
                    <div className="w-full space-y-4">
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                      <textarea
                        value={profile.bio}
                        onChange={(e) => setProfile({...profile, bio: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        rows="3"
                      />
                      <button className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700" onClick={handleSaveProfile}>
                        Save Changes
                      </button>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-xl font-bold text-gray-900">{profile.name || "User Name"}</h2>
                      <p className="text-gray-600 text-center mt-2">{profile.bio || "No bio is Available"}</p>
                    </>
                  )}
                  
                  <div className="mt-6 w-full">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Skills Learned</h4>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.length > 0 ? (
                        profile.skills.map((skill, index) => (
                          <span 
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                          >
                            {skill}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-500 text-sm">No skills added yet.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Leave Feedback */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6 bg-indigo-700">
                <h3 className="text-lg font-medium text-white">Leave Feedback</h3>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Select Session</label>
                    <select 
                      value={feedback.sessionId}
                      onChange={(e) => setFeedback({...feedback, sessionId: e.target.value})}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option value="">Select a session</option>
                      {learningHistory.map(session => (
                        <option key={session.id} value={session.id}>
                          {session.date} - {session.skill} with {session.teacher}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Rating</label>
                    <div className="flex items-center mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFeedback({...feedback, rating: star})}
                        >
                          <svg
                            className={`h-6 w-6 ${star <= feedback.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Comment</label>
                    <textarea
                      value={feedback.comment}
                      onChange={(e) => setFeedback({...feedback, comment: e.target.value})}
                      rows="3"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    ></textarea>
                  </div>
                  
                  <button
                    onClick={handleSubmitFeedback}
                    disabled={!feedback.sessionId || feedback.rating === 0}
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Feedback
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Skill Requests */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6 bg-indigo-700">
                <h3 className="text-lg font-medium text-white">Skill Requests</h3>
              </div>
              <div className="px-4 py-5 sm:p-6">
                {/* Search Teachers */}
                <div className="mb-6">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange = {(e) => setSearchTerm(e.target.value)}
                      placeholder="Search teachers by skill..."
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={handleSearch}
                    >
                      Search
                    </button>
                  </div>
                </div>
                
                {/* New Request Form */}
                <div className="border border-gray-200 rounded-lg p-4 mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Send New Request</h4>
                  <div className="space-y-3">
                    <div>
                      <input
                        type="text"
                        placeholder="Skill you want to learn"
                        value={newRequest.skill}
                        onChange={(e) => setNewRequest({...newRequest, skill: e.target.value})}
                        className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Teacher name (optional)"
                        value={newRequest.teacher}
                        onChange={(e) => setNewRequest({...newRequest, teacher: e.target.value})}
                        className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <textarea
                        rows="2"
                        placeholder="Your message to the teacher"
                        value={newRequest.message}
                        onChange={(e) => setNewRequest({...newRequest, message: e.target.value})}
                        className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      ></textarea>
                    </div>
                    <button
                      onClick={handleSendRequest}
                      disabled={!newRequest.skill}
                      className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Send Request
                    </button>
                  </div>
                </div>
                
                {/* Request List */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Your Requests</h4>
                 {skillRequests.length > 0 ? (
                      <div className="overflow-hidden border border-gray-200 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Skill
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Teacher
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {skillRequests.map((request) => (
                                  <tr key={request.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                      {request.skill || '—'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {request.teacher || 'Any'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                          request.status === 'accepted'
                                            ? 'bg-green-100 text-green-800'
                                            : request.status === 'rejected'
                                            ? 'bg-red-100 text-red-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                        }`}
                                      >
                                        {request.status || 'pending'}
                                      </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      <button className="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                                      {request.status === 'pending' && (
                                        <button className="text-red-600 hover:text-red-900">Cancel</button>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <p className="text-center text-gray-500">You haven't made any skill requests yet</p>
                        )}
                </div>
              </div>
            </div>

            {/* Learning History */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6 bg-indigo-700">
                <h3 className="text-lg font-medium text-white">Learning History</h3>
              </div>
              <div className="px-4 py-5 sm:p-6">
                {learningHistory.length > 0 ? (
                  <div className="overflow-hidden border border-gray-200 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skill</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Your Rating</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {learningHistory.map((session) => (
                          <tr key={session.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(session.date).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{session.skill}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{session.teacher}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <svg 
                                    key={i}
                                    className={`h-4 w-4 ${i < session.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-center text-gray-500">No learning history yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;