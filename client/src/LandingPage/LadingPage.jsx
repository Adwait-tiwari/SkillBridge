import React from 'react';
import { ArrowRight, Users, BookOpen, BarChart2, Globe } from 'lucide-react';

const SkillBridgeLanding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <BookOpen className="text-indigo-600 h-8 w-8" />
          <span className="text-2xl font-bold text-indigo-700">SkillBridge</span>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#features" className="text-gray-700 hover:text-indigo-600">Features</a>
          <a href="#courses" className="text-gray-700 hover:text-indigo-600">Courses</a>
          <a href="#testimonials" className="text-gray-700 hover:text-indigo-600">Testimonials</a>
          <a href="#pricing" className="text-gray-700 hover:text-indigo-600">Pricing</a>
        </div>
        <div className="flex space-x-4">
          <button className="px-4 py-2 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50">Login</button>
          <button className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Bridge the <span className="text-indigo-600">Skill Gap</span> with Expert-Led Courses
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          Master in-demand skills with our industry-relevant courses and accelerate your career growth.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="px-8 py-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center">
            Explore Courses <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          <button className="px-8 py-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
            How It Works
          </button>
        </div>
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-indigo-100 rounded-3xl -z-10 transform rotate-1"></div>
          <div className="bg-white p-1 rounded-3xl shadow-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80" 
              alt="Students learning" 
              className="w-full h-auto rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <Users className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900">10,000+</h3>
              <p className="text-gray-600">Students Enrolled</p>
            </div>
            <div className="p-6">
              <BookOpen className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900">150+</h3>
              <p className="text-gray-600">Courses Available</p>
            </div>
            <div className="p-6">
              <BarChart2 className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900">95%</h3>
              <p className="text-gray-600">Satisfaction Rate</p>
            </div>
            <div className="p-6">
              <Globe className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900">50+</h3>
              <p className="text-gray-600">Countries Reached</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose SkillBridge?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide the best learning experience to help you achieve your goals.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Industry Experts",
                description: "Learn from professionals with real-world experience in top companies.",
                icon: <Users className="h-8 w-8 text-indigo-600" />
              },
              {
                title: "Hands-on Projects",
                description: "Apply what you learn through practical, portfolio-worthy projects.",
                icon: <BookOpen className="h-8 w-8 text-indigo-600" />
              },
              {
                title: "Flexible Learning",
                description: "Study at your own pace with lifetime access to course materials.",
                icon: <Globe className="h-8 w-8 text-indigo-600" />
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-indigo-50 rounded-lg mr-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Career?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of learners who have accelerated their careers with SkillBridge.
          </p>
          <button className="px-8 py-4 bg-white text-indigo-600 font-medium rounded-lg hover:bg-gray-100 transition-colors">
            Get Started Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="text-indigo-400 h-8 w-8" />
                <span className="text-2xl font-bold">SkillBridge</span>
              </div>
              <p className="text-gray-400">
                Bridging the gap between learning and career success.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Tutorials</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} SkillBridge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SkillBridgeLanding;