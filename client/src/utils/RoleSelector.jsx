import React from 'react';
import { doc,updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../context/AuthContext'

const RoleSelector = () => {
  const {user} = useAuth();
  const navigate = useNavigate();

  const selectRole = async(role) =>{
   const userRef = doc(db,"users",user.uid);
   await updateDoc(userRef, {role});

    if(role == "teacher"){
        navigate('/teacher');
    }else {
        navigate('/student');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-6">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 mb-4">
          <svg 
            className="h-8 w-8 text-indigo-600" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
            />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to SkillBridge</h1>
        <p className="text-xl text-gray-600">Select your dashboard</p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Student Dashboard Card */}
        <div 
          className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer"
          onClick={() => navigate('/student-dashboard')}
        >
          <div className="p-8">
            <div className="flex items-center justify-center h-20 w-20 rounded-full bg-blue-100 mb-6 mx-auto">
              <svg 
                className="h-10 w-10 text-blue-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">Student Dashboard</h2>
            <p className="text-gray-600 text-center mb-6">
              Access your courses, track progress, and view assignments.
            </p>
            <div className="flex justify-center">
              <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors" onClick={()=>selectRole("Student")}>
                Enter as Student
              </button>
            </div>
          </div>
        </div>

        {/* Teacher Dashboard Card */}
        <div 
          className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer"
          onClick={() => navigate('/teacher-dashboard')}
        >
          <div className="p-8">
            <div className="flex items-center justify-center h-20 w-20 rounded-full bg-indigo-100 mb-6 mx-auto">
              <svg 
                className="h-10 w-10 text-indigo-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">Teacher Dashboard</h2>
            <p className="text-gray-600 text-center mb-6">
              Manage courses, create assignments, and track student progress.
            </p>
            <div className="flex justify-center">
              <button className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors" onClick={()=>selectRole("teacher")}>
                Enter as Teacher
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16 text-center">
        <p className="text-gray-600">
          Not sure which to choose? <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium">Contact support</a>
        </p>
      </div>
    </div>
  );
};

export default RoleSelector;