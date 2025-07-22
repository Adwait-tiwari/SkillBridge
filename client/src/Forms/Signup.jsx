import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const SignupPage = () => {
  const[form,setForm] = useState({
    fname : '',
    lname : '',
    email : '',
    password : '',
    confirmPassword : ''
  })
  const[error,setError] = useState('');

  const handleChange = (e) =>{
    setForm({...form,[e.target.name] : e.target.value});
  }


  const handleSubmit = async(e) =>{
    e.preventDefault();

    if(form.password !== form.confirmPassword){
      alert("Password does not Match");
    }

    try{
      const userCred = await createUserWithEmailAndPassword(auth,form.email,form.password);
      const user = userCred.user;

      await setDoc(doc(db,'users',user.uid),{
        uid : user.uid,
        name : form.fname + form.lname,
        email : form.email,
        createdAt : new Date()
      })

      alert("Signup Successfully!");
      setError('');
      setForm({
        fname : '',
        lname : '',
        email : '',
        password: '',
        confirmPassword : ''
      })
    }catch(err){
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100">
            <svg 
              className="h-6 w-6 text-indigo-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" 
              />
            </svg>
          </div>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-gray-600">Join SkillBridge today</p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                First name
              </label>
              <input
                id="first-name"
                name="fname"
                type="text"
                autoComplete="given-name"
                value={form.fname}
                onChange={handleChange}
                placeholder="John"
                required
                className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>
            <div>
              <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                Last name
              </label>
              <input
                id="last-name"
                name="lname"
                type="text"
                autoComplete="family-name"
                value={form.lname}
                onChange={handleChange}
                placeholder="Doe"
                required
                className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="new-password"
              required
              className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
            <p className="mt-1 text-xs text-gray-500">
              Must be at least 8 characters
            </p>
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="new-password"
              required
              className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="font-medium text-gray-700">
                I agree to the{' '}
                <a href="#" className="text-indigo-600 hover:text-indigo-500">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-indigo-600 hover:text-indigo-500">
                  Privacy Policy
                </a>
              </label>
            </div>
          </div>
           {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;