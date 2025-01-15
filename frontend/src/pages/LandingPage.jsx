import React, { useState } from 'react';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import PricingPlans from './PricingPlans';
import AnalysisForm from '../components/AnalysisForm';
import ReportDisplay from '../components/ReportDisplay';
import FeaturePage from './feature';

const LandingPage = () => {
  const [reportData, setReportData] = useState(null); // State to hold report data

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-950 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Boost Your Website’s Health in Real-Time
          </h1>
          <p className="text-lg mb-8">
            Get actionable insights to optimize your site's performance, accessibility, and SEO all in one place.
          </p>
          <div className="flex justify-center mb-8">
          {!reportData ? (
              <AnalysisForm setReportData={setReportData} />
              ) : (
        <ReportDisplay reportData={reportData} />
      )}
          </div>
        </div>
      </section>

      <HowItWorks />

      <Features />

      <FeaturePage/>

      <Testimonials />

      {/* Call to Action Section */}
      <section className="py-16 bg-blue-950 text-white text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6">Ready to Improve Your Website?</h2>
          <p className="mb-8">Join thousands of satisfied users who trust us to boost their online presence.</p>
          <button className="bg-yellow-500 text-gray-900 px-6 py-4 rounded-lg font-semibold hover:bg-yellow-600">
            Start Your Free Trial
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
