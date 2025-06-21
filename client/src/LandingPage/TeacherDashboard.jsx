import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import TeacherProfile from '../Forms/TeacherProfile';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const TeacherDashboard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);

  const [profileData, setProfileData] = useState({
    name: '',
    profession: '',
    bio: '',
    rating: 0,
    students: 0,
    sessions: 0,
    skills: []
  });

  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [showAddSession, setShowAddSession] = useState(false);
  const [sessionHistory, setSessionHistory] = useState([]);

  const { user } = useAuth();
  const profilepic = user?.photoURL;

  useEffect(() => {
    const isCompleted = localStorage.getItem('isTeacherProfileCompleted');
    if (!isCompleted) {
      setShowProfileForm(true);
    }

    const fetchProfile = async () => {
      if (user?.uid) {
        const docRef = doc(db, 'teachers', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfileData(docSnap.data());
        }
      }
    };

    fetchProfile();
  }, [user]);

  const handleProfileCompleted = () => {
    localStorage.setItem('isTeacherProfileCompleted', 'true');
    setShowProfileForm(false);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    try {
      if (user?.uid) {
        const profileToSave = {
          ...profileData,
          uid: user.uid,
          email: user.email
        };

        await setDoc(doc(db, 'teachers', user.uid), profileToSave);
        alert('Profile saved successfully');
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error saving teacher profile:', error.message);
      alert('Failed to save profile');
    }
  };

  const handleAddSession = () => {
    const newSession = {
      id: upcomingSessions.length + 1,
      student: '',
      date: '',
      duration: '',
      subject: ''
    };
    setUpcomingSessions([...upcomingSessions, newSession]);
    setShowAddSession(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showProfileForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <TeacherProfile onComplete={handleProfileCompleted} />
        </div>
      )}

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
          <div className="flex items-center space-x-4">
            <img
              className="h-8 w-8 rounded-full"
              src={profilepic}
              alt="Profile"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Overview */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 bg-indigo-700 flex justify-between items-center rounded-t-lg">
                <h3 className="text-white font-medium text-lg">Profile Overview</h3>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-indigo-200 hover:text-white"
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>
              <div className="p-6">
                <div className="flex flex-col items-center">
                  <img
                    className="h-24 w-24 rounded-full mb-4"
                    src={profilepic}
                    alt="Teacher"
                    referrerPolicy="no-referrer"
                  />

                  {isEditing ? (
                    <div className="w-full space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={profileData.name}
                          onChange={handleProfileChange}
                          className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Profession</label>
                        <input
                          type="text"
                          name="profession"
                          value={profileData.profession}
                          onChange={handleProfileChange}
                          className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Bio</label>
                        <textarea
                          name="bio"
                          value={profileData.bio}
                          onChange={handleProfileChange}
                          className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2"
                        />
                      </div>
                      <button
                        onClick={handleSaveProfile}
                        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
                      >
                        Save Changes
                      </button>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-xl font-bold">{profileData.name || 'Your Name'}</h2>
                      <p className="text-gray-600">{profileData.profession || 'Your Profession'}</p>
                      <p className="text-sm text-gray-600 mt-2 text-center">{profileData.bio || 'Your bio will appear here.'}</p>
                      <div className="grid grid-cols-2 gap-4 mt-6 w-full">
                        <div className="bg-gray-50 p-4 rounded text-center">
                          <p className="text-sm text-gray-500">Students</p>
                          <p className="text-2xl font-bold text-indigo-600">{profileData.students || '0'}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded text-center">
                          <p className="text-sm text-gray-500">Sessions</p>
                          <p className="text-2xl font-bold text-indigo-600">{profileData.sessions || '0'}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 bg-indigo-700 rounded-t-lg">
                <h3 className="text-white font-medium text-lg">Skills Offered</h3>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2">
                  {profileData.skills?.length > 0 ? (
                    profileData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500">No skills added yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sessions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Sessions */}
            <div
              className="bg-white shadow rounded-lg"
              onMouseEnter={() => setShowAddSession(true)}
              onMouseLeave={() => setShowAddSession(false)}
            >
              <div className="px-4 py-5 bg-indigo-700 flex justify-between items-center rounded-t-lg">
                <h3 className="text-white font-medium text-lg">Upcoming Sessions</h3>
                {showAddSession && (
                  <button
                    onClick={handleAddSession}
                    className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700"
                  >
                    Add Session
                  </button>
                )}
              </div>
              <div className="p-6">
                {upcomingSessions.length > 0 ? (
                  upcomingSessions.map((session) => (
                    <div key={session.id} className="mb-4 border-b pb-4">
                      <h4 className="font-semibold">{session.subject || 'Subject'}</h4>
                      <p>
                        {session.date || 'Date'} | {session.duration || 'Duration'}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No upcoming sessions</p>
                )}
              </div>
            </div>

            {/* Session History */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 bg-indigo-700 rounded-t-lg">
                <h3 className="text-white font-medium text-lg">Session History</h3>
              </div>
              <div className="p-6">
                {sessionHistory.length > 0 ? (
                  sessionHistory.map((session, i) => (
                    <div key={i} className="border-b py-2">
                      <p className="font-medium">{session.subject}</p>
                      <p className="text-sm text-gray-600">
                        {session.date} | {session.duration}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No session history available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;
