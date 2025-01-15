import React from 'react';
import GraphComponent from '../GraphComponent';

const FeaturePage = () => {
  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-semibold text-gray-800 mb-4">Website Scores Overview</h1>
        <p className="text-lg text-gray-600">Visualize your website's SEO, Accessibility, and Performance scores</p>
      </div>

      {/* Scores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* SEO Score Card */}
        <div className="p-6 bg-white rounded-lg shadow-lg text-center">
          <GraphComponent title="SEO Score" score={85} />
          <p className="text-xl font-bold mt-4">85%</p>
        </div>

        {/* Accessibility Score Card */}
        <div className="p-6 bg-white rounded-lg shadow-lg text-center">
          <GraphComponent title="Accessibility Score" score={75} />
          <p className="text-xl font-bold mt-4">75%</p>
        </div>

        {/* Performance Score Card */}
        <div className="p-6 bg-white rounded-lg shadow-lg text-center">
          <GraphComponent title="Performance Score" score={90} />
          <p className="text-xl font-bold mt-4">90%</p>
        </div>
      </div>

      {/* Image and Paragraph Section */}
      <div className="p-6 bg-blue-950 rounded-lg shadow-lg flex items-center justify-between">
        {/* Left Side: Image */}
        <div className="w-1/2">
          <img
            src="https://media.istockphoto.com/id/1360521208/photo/businessman-using-a-computer-for-analysis-seo-search-engine-optimization-marketing-ranking.webp?a=1&b=1&s=612x612&w=0&k=20&c=icUfwJYefPLxioStRtEdLOKClOQQK4Ztm6zHvcC6uoI=" // Replace with your image URL
            alt="Website Monitoring"
            className="w-full rounded-lg"
          />
        </div>

        {/* Right Side: Paragraph */}
        <div className="w-1/2 pl-8">
          <h3 className="text-2xl font-semibold mb-4 text-white">Stay Informed About Your Website</h3>
          <p className="text-lg text-gray-300">
            We send you an email whenever your website goes down, so you can take immediate action. Our service ensures that your website is always monitored and kept in optimal condition. With real-time alerts, reliable support, and 24/7 monitoring, we are committed to helping you maintain a seamless user experience.
            <br />
            Our advanced system proactively detects issues before they impact your users, ensuring minimal downtime. You can focus on growing your business while we take care of your website's performance. Rest assured that with us, your website's uptime and reliability are always a top priority. We are dedicated to providing exceptional service and ensuring that your website remains fast, secure, and accessible to all visitors.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeaturePage;
