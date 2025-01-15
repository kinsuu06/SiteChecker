import React from 'react';

const Features = () => {
  return (
    <section className="py-16 bg-white text-center">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-200 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold mb-4 text-black">Accessibility Focus</h3>
            <p className="text-gray-800">Our tool doesn't just check performance—it ensures that your website is accessible to all users, across all devices.</p>
          </div>
          <div className="p-6 bg-gray-200 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold mb-4 text-black">Data-Driven SEO Optimization</h3>
            <p className="text-gray-800">Gain insights on how to improve your search engine rankings using real-time data and recommendations tailored to your site.</p>
          </div>
          <div className="p-6 bg-gray-200 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold mb-4 text-black">Competitor Benchmarking</h3>
            <p className="text-gray-800">Track and compare your website's performance against competitors to stay ahead in the digital landscape.</p>
          </div>
          <div className="p-6 bg-gray-200 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold mb-4 text-black">Comprehensive Analysis</h3>
            <p className="text-gray-800">Our tool covers all essential aspects: SEO, performance, security, and accessibility.</p>
          </div>
          <div className="p-6 bg-gray-200 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold mb-4 text-black">User-Friendly Interface</h3>
            <p className="text-gray-800">Designed for ease of use, allowing you to get insights without technical expertise.</p>
          </div>
          <div className="p-6 bg-gray-200 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold mb-4 text-black">Real-Time Alerts</h3>
            <p className="text-gray-800">Stay informed with instant notifications for critical issues impacting your site.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
