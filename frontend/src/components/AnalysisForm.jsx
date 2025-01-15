import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AnalysisForm = () => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!url) {
      setError('Please enter a valid URL.');
      return;
    }

    navigate('/report', { state: { url } });
  };

  return (
    <div className="flex justify-center items-center p-6">
      <form onSubmit={handleSubmit} className="w-96 bg-gray-300 p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="url">
            Website URL:
          </label>
          <input
            type="text"
            id="url"
            placeholder="Enter website URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className={`w-full border p-2 rounded ${error ? 'border-red-500' : ''}`}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        <button className="bg-rose-700 text-white py-2 px-4 rounded w-full">Scan</button>
      </form>
    </div>
  );
};

export default AnalysisForm;
