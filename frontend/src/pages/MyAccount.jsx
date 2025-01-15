import React, { useState, useEffect } from "react";

const MyAccount = () => {
  const [websites, setWebsites] = useState([]);
  const [loadingWebsites, setLoadingWebsites] = useState(true);
  const [inputUrl, setInputUrl] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [deletingWebsite, setDeletingWebsite] = useState("");

  // Initialize and fetch websites
  const init = async () => {
    const Token = localStorage.getItem("token");
    if (!Token) {
      window.location.href = "/login"; // Redirect to login if no token
      return;
    }
    fetchAllWebsites(Token);
  };

  const fetchAllWebsites = async (Token) => {
    // console.log("Fetching websites with token:", Token);
    setLoadingWebsites(true);

    try {
      const res = await fetch("http://localhost:8000/website/", {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });

      setLoadingWebsites(false);

      if (!res.ok) {
        // console.error("Fetch failed with status:", res.status);
        setErrorMsg(`Error fetching websites: ${res.statusText}`);
        return;
      }

      const data = await res.json();
      // console.log("Fetch Websites Response:", data); // Debug log

      if (data.status) { // Updated to check `status` instead of `success`
        setWebsites(data.data || []); // Update the websites state
      } else {
        setErrorMsg(data.message || "An unknown error occurred.");
      }
    } catch (error) {
      // console.error("Error in fetchAllWebsites:", error.message);
      setErrorMsg("Failed to fetch websites. Please try again later.");
      setLoadingWebsites(false);
    }
  };

  const addWebsite = async () => {
    if (!inputUrl.trim() || submitButtonDisabled) return;
    setErrorMsg("");

    const Token = localStorage.getItem("token");
    if (!Token) {
      setErrorMsg("Authentication error. Please log in.");
      return;
    }

    setSubmitButtonDisabled(true);
    const res = await fetch("http://localhost:8000/website", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: inputUrl }),
    }).catch((err) => console.error("Error adding website:", err));
    setSubmitButtonDisabled(false);

    if (!res) {
      setErrorMsg("Error adding website");
      return;
    }

    const data = await res.json();
    if (!data.status) { // Updated to check `status`
      setErrorMsg(data.message || "Failed to add website.");
      return;
    }

    setInputUrl("");
    fetchAllWebsites(Token);
  };

  const deleteWebsite = async (id) => {
    if (deletingWebsite) return;

    const Token = localStorage.getItem("token");
    if (!Token) {
      setErrorMsg("Authentication error. Please log in.");
      return;
    }

    setDeletingWebsite(id);

    const res = await fetch(`http://localhost:8000/website/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${Token}` },
    }).catch((err) => console.error("Error deleting website:", err));
    setDeletingWebsite("");

    if (res) {
      fetchAllWebsites(Token);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">
            Add Website for Monitoring
          </h1>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Enter Website URL
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="https://example.com"
              value={inputUrl}
              onChange={(event) => setInputUrl(event.target.value)}
            />
          </div>
          {errorMsg && (
            <p className="text-red-500 text-sm mb-4">{errorMsg}</p>
          )}
          <button
            onClick={addWebsite}
            disabled={submitButtonDisabled}
            className={`w-full p-3 text-white font-semibold rounded-lg ${
              submitButtonDisabled
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {submitButtonDisabled ? "Adding..." : "Add Website"}
          </button>
        </div>

        {/* Websites List Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Your Websites
          </h2>
          {loadingWebsites ? (
            <p className="text-gray-500">Loading websites...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {websites.length ? (
                websites.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50"
                  >
                    <div>
                      <p
                        className={`text-sm font-bold mb-1 ${
                          item.isActive
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {item.isActive ? "ACTIVE" : "DOWN"}
                      </p>
                      <p className="text-gray-800 break-words">{item.url}</p>
                    </div>
                    <button
                      onClick={() => deleteWebsite(item._id)}
                      className="text-sm text-red-500 font-semibold hover:underline"
                    >
                      {deletingWebsite === item._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No websites added yet!</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
