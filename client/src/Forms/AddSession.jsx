import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AddSession = () => {
  const navigate = useNavigate()
  const {user} = useAuth()
  const [teacher,setTeacher] = useState('')
  const [session, setSession] = useState({
    topic: '',
    time: '',
    duration: '',
    date: '',
  });

  useEffect(()=>{
    const fetchTeacherName = async() =>{
      if(user?.uid){
        try{
          const teacherRef = doc(db,'teachers',user.uid)
          const teacherSnap = await getDoc(teacherRef);
          if(teacherSnap.exists()){
            const data = teacherSnap.data()
            setTeacher(data.name || ' ')
          }
        }catch(error){
          console.log(error);
        }
      }
    }
    fetchTeacherName()
  },[user])

  const handleChange = (e) => {
    setSession({ ...session, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const sessionWithMeta = {
        ...session,
        uid: user.uid,
        createdAt: new Date(),
        name: teacher,
        completed: false
      };
      await addDoc(collection(db,"sessions"),sessionWithMeta);
      alert('Session Added Successfully!');
      setSession({ topic: '', time: '', duration: '', date: '' });
      navigate('/teacher');
    }catch(err){
       console.error('Error adding session:', err);
        alert('Failed to add session. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Session</h2>

        {/* Topic Field */}
        <div className="mb-4">
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
            Topic
          </label>
          <input
            type="text"
            id="topic"
            name="topic"
            value={session.topic}
            onChange={handleChange}
            placeholder="Enter session topic"
            required
            className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Date Field */}
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={session.date}
            onChange={handleChange}
            required
            className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Time Field */}
        <div className="mb-4">
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">
            Time
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={session.time}
            onChange={handleChange}
            required
            className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Duration Field */}
        <div className="mb-4">
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
            Duration (minutes)
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            min="1"
            value={session.duration}
            onChange={handleChange}
            placeholder="e.g. 60"
            required
            className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md shadow-md transition"
        >
          Add Session
        </button>
      </form>
    </div>
  );
};

export default AddSession;
