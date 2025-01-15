import React from 'react';
import { useNavigate } from 'react-router-dom';

const PricingPlans = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('email'); // Check if the user is authenticated

  const handleRedirect = (route) => {
    if (isAuthenticated) {
      navigate(route); // Navigate to the dashboard or appropriate route
    } else {
      navigate('/signup'); // Redirect to signup if not authenticated
    }
  };

  return (
    <section className="py-16 bg-white text-center">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12">Pricing Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Free Plan</h3>
            <p className="text-xl mb-4">Basic website analysis</p>
            <p className="text-2xl font-bold mb-4">$0/month</p>
            <button
              onClick={() => handleRedirect('/my-account')}
              className="bg-violet-500 text-white px-4 py-2 rounded-lg hover:bg-violet-700"
            >
              {isAuthenticated ? 'Go to Dashboard' : 'Sign Up'}
            </button>
          </div>

          {/* Pro Plan */}
          <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Pro Plan</h3>
            <p className="text-xl mb-4">Advanced features and real-time alerts</p>
            <p className="text-2xl font-bold mb-4">$19/month</p>
            <button
              onClick={() => handleRedirect('/my-account')}
              className="bg-violet-500 text-white px-4 py-2 rounded-lg hover:bg-violet-700"
            >
              {isAuthenticated ? 'Go to Dashboard' : 'Sign Up'}
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Enterprise Plan</h3>
            <p className="text-xl mb-4">Custom solutions for large businesses</p>
            <p className="text-2xl font-bold mb-4">Contact Us</p>
            <button
              onClick={() => navigate('/contact')}
              className="bg-violet-500 text-white px-4 py-2 rounded-lg hover:bg-violet-700"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
