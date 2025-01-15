import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ReportDisplay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { url } = location.state || { url: '' };

  const [scores, setScores] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!url) {
      setError('No URL provided.');
      setLoading(false);
      return;
    }
    fetchAnalysis(url);
  }, [url]);

  const fetchAnalysis = async (websiteUrl) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8000/analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ websiteUrl }),
      });

      if (!response.ok) {
        const errorMsg = await response.text();
        throw new Error(`Server Error: ${response.status} - ${errorMsg}`);
      }

      const data = await response.json();
      console.log('Lighthouse Analysis Data:', data);
      setScores(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch analysis.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Website Analysis Report</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : scores ? (
          <>
            <p><strong>URL:</strong> {url}</p>
            <p><strong>Performance:</strong> {scores.performance}%</p>
            <p><strong>SEO:</strong> {scores.seo}%</p>
            <p><strong>Accessibility:</strong> {scores.accessibility}%</p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
            >
              Go Back
            </button>
          </>
        ) : (
          <p>No data available.</p>
        )}
      </div>
    </div>
  );
};

export default ReportDisplay;
