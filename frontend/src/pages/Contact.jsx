import React from 'react';

const ContactPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Get in Touch</h1>
        
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">We'd Love to Hear from You</h2>
          
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input 
              type="text" 
              placeholder="Full Name" 
              className="p-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input 
              type="email" 
              placeholder="Email Address" 
              className="p-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input 
              type="text" 
              placeholder="Subject" 
              className="col-span-2 p-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <textarea 
              placeholder="Your Message" 
              rows="5" 
              className="col-span-2 p-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            ></textarea>
            <button 
              type="submit" 
              className="col-span-2 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300">
              Send Message
            </button>
          </form>
        </div>

        {/* Founder Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Meet the Founder</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Our founder, <span className="font-bold">Krati Agrawal</span>, has over 15 years of experience in web development and digital marketing. He created this platform with the vision of helping businesses maximize their online potential with easy-to-use tools and actionable insights.
          </p>
          <div className="inline-block">
            <img 
              src="https://img.freepik.com/free-photo/smiley-businesswoman-posing-outdoors-with-arms-crossed-copy-space_23-2148767055.jpg" 
              alt="Founder Alex Thompson" 
              className="rounded-full w-48 h-48 object-cover shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-800">Krati Agrawal</h3>
            <p className="text-gray-600 text-lg">Founder & CEO</p>
            <p className="text-gray-500 italic">"Empowering businesses with data-driven insights"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
