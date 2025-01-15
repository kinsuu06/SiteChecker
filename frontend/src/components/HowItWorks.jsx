import React from 'react';

const HowItWorks = () => {
  return (
    <section className="py-16 bg-gray-50 text-center">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12">How Our Tool Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <img 
              src="https://webmeridian.net/wp-content/uploads/2023/11/Banner_1520x540px_-How-to-Perform-a-Website-SEO-Audit_-N-Steps-Guide-to-Boost-Rankings-1520x540.jpg" 
              alt="Step 1" 
              className="w-full h-48 object-cover rounded-md mb-6"
            />
            <h3 className="text-2xl font-semibold mb-4">Start with Your URL</h3>
            <p>Submit your website URL and let our system initiate a comprehensive analysis within seconds.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8gbMGtZmPdeLtWL-jZdQLG8pwXRnTy1Rf7w&s" 
              alt="Step 2" 
              className="w-full h-48 object-cover rounded-md mb-6"
            />
            <h3 className="text-2xl font-semibold mb-4">Detailed Site Audit</h3>
            <p>Our tool scans your website’s structure, SEO, performance, and security protocols to generate a thorough report.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSSCXhFGHTu5ewwuD8HJon8MosxYu_HR_3Zw&s" 
              alt="Step 3" 
              className="w-full h-48 object-cover rounded-md mb-6"
            />
            <h3 className="text-2xl font-semibold mb-4">Instant Solutions</h3>
            <p>We offer step-by-step guidance to fix issues and boost your website's performance, ensuring an optimal experience.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
