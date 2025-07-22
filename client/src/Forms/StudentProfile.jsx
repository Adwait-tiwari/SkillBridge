import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';

const StudentProfileForm = ({ onComplete }) => {
  const {user} = useAuth();
  const [profile, setProfile] = useState({
    name: '',
    bio: '',
    skills: []
  });

  const [skillInput, setSkillInput] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddSkill = () => {
    const skill = skillInput.trim();
    if (skill && !profile.skills.includes(skill)) {
      setProfile((prev) => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
      setSkillInput('');
    }
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profile.name.trim() || !profile.bio.trim()) {
      alert('⚠️ Please fill in all fields.');
      return;
    }

    try {
      const studentRef = doc(db, 'students',user.uid);
      await setDoc(studentRef,{
        name : profile.name,
        bio : profile.bio,
        skills : profile.skills
      },{merge : true});
      alert('✅ Profile saved successfully!');
      if (onComplete) onComplete();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-gradient-to-br from-white via-blue-50 to-blue-100 p-8 rounded-2xl shadow-xl border">
      <h2 className="text-2xl font-semibold text-blue-800 mb-6 text-center">✍️ Student Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Short Bio</label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            placeholder="Tell us something about you..."
            className="w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            rows={4}
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Skills</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleSkillKeyDown}
              placeholder="Type skill and press Enter"
              className="flex-grow px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="bg-green-600 text-white px-4 py-2 rounded-xl shadow hover:bg-green-700"
            >
              Add
            </button>
          </div>

          {/* Skill Chips */}
          <div className="flex flex-wrap mt-3 gap-2">
            {profile.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="text-red-500 font-bold"
                >
                  ❌
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-xl shadow-md transition duration-300"
          >
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentProfileForm;
