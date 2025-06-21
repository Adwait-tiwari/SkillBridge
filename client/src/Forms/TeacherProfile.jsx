import { doc, setDoc } from "firebase/firestore";
import { useState, useRef } from "react";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

const TeacherProfile = ({ onComplete }) => {
  const {user} = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    bio: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);
   const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);

    try{
      const teacher = doc(db,"teachers",user.uid);
      await setDoc(teacher,{
        uid : user.uid,
        email : user.email,
        name : formData.name,
        profession : formData.profession,
        bio : formData.bio,
        photoURL : profileImage || user.photoURL || "",
        createdAt : new Date()
      });
      console.log("Teacher Profile Saved !");
      if (onComplete) onComplete();
    }catch(err){
       console.error("Error saving teacher profile:", err);
      alert("Failed to save profile. Try again.");
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-auto">
      <div className="min-h-screen flex flex-col justify-center items-center py-10 px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Complete Your Teacher Profile</h2>

        <form onSubmit={handleSubmit} className="w-full max-w-xl bg-gray-100 p-8 rounded-xl shadow-xl space-y-6">
          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden border-4 border-gray-300">
              <img
                src={profileImage || "/placeholder-user.png"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Upload Photo
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
          </div>

          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Profession Field */}
          <div>
            <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
            <input
              type="text"
              id="profession"
              name="profession"
              value={formData.profession}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Bio Field */}
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeacherProfile;
