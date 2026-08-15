 import { useState } from "react";
 import { supabase } from "./supabaseClient";
 import Login from "./Logi.jsx";
import "./App.css";

const emergencyTypes = [
  { icon: "🚗", title: "Accident", text: "Get immediate help for road accidents." },
  { icon: "🩸", title: "Blood Emergency", text: "Find nearby blood donors and blood banks." },
  { icon: "🏥", title: "Medical Emergency", text: "Find hospitals and emergency services." },
  { icon: "🕊️", title: "Funeral Help", text: "Get transportation and funeral assistance." },
  { icon: "🍲", title: "Bhandara", text: "Request or offer food distribution support." },
  { icon: "⚡", title: "Electricity Leakage", text: "Report dangerous electrical leakage." },
  { icon: "🔥", title: "Gas Leakage", text: "Get help for LPG or gas leakage." },
  { icon: "🌊", title: "Flood / Water", text: "Request help during flooding or water emergencies." },
  { icon: "🏠", title: "Other Emergency", text: "Report any other urgent situation." },
];

function App() {
   const [user, setUser] = useState(null);
  const [location, setLocation] = useState(null);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedEmergency, setSelectedEmergency] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    description: "",
  });

  const [requestSent, setRequestSent] = useState(false);

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
  };

  if (!user) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // Find location and open Google Maps
  const getLocation = (emergencyTitle) => {
    if (!navigator.geolocation) {
      alert("Location is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const userLocation = {
          latitude,
          longitude,
        };

        setLocation(userLocation);

        // Decide what to search on Google Maps
        let searchTerm = "emergency services";

        if (emergencyTitle === "Accident") {
          searchTerm = "hospitals";
        } else if (emergencyTitle === "Blood Emergency") {
          searchTerm = "blood banks";
        } else if (emergencyTitle === "Medical Emergency") {
          searchTerm = "hospitals";
        } else if (emergencyTitle === "Funeral Help") {
          searchTerm = "funeral services";
        } else if (emergencyTitle === "Bhandara") {
          searchTerm = "catering services";
        } else if (emergencyTitle === "Electricity Leakage") {
          searchTerm = "electricians";
        } else if (emergencyTitle === "Gas Leakage") {
          searchTerm = "gas agencies";
        } else if (emergencyTitle === "Flood / Water") {
          searchTerm = "emergency services";
        } else if (emergencyTitle === "Other Emergency") {
          searchTerm = "emergency services";
        }

        const googleMapsUrl =
          "https://www.google.com/maps/search/" +
          encodeURIComponent(searchTerm) +
          "/@" +
          latitude +
          "," +
          longitude +
          ",15z";

        window.open(googleMapsUrl, "_blank");

        // Open emergency request form
        setSelectedEmergency(emergencyTitle);
        setShowRequestForm(true);
        setRequestSent(false);
      },
      () => {
        alert("Please allow location access to find nearby help.");
      }
    );
  };

  // Hero button
  const handleFindHelp = () => {
    getLocation("Other Emergency");
  };

  // Form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Submit emergency request
  const handleSubmitRequest = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.description) {
      alert("Please fill in all the required fields.");
      return;
    }

    if (!location) {
      alert("Please allow location access first.");
      return;
    }

    const emergencyRequest = {
      emergencyType: selectedEmergency,
      name: formData.name,
      phone: formData.phone,
      description: formData.description,
      latitude: location.latitude,
      longitude: location.longitude,
    };

    console.log("Emergency Help Request:", emergencyRequest);

    setRequestSent(true);

    // Clear form
    setFormData({
      name: "",
      phone: "",
      description: "",
    });
  };

  return (
    <div className="app">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          🚨 <span>EmergencyAid</span>
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#emergencies">Emergencies</a>
          <a href="#about">About</a>

          <button className="login-btn">
            Login
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero" id="home">
        <div className="hero-content">

          <p className="hero-tag">
            🚨 Emergency Assistance Platform
          </p>

          <h1>
            Help When You
            <span> Need It Most</span>
          </h1>

          <p className="hero-text">
            Quickly find nearby help and emergency services
            during critical situations.
          </p>

          <button
            className="secondary-btn"
            onClick={handleFindHelp}
          >
            📍 Find Help Near Me
          </button>

        </div>
      </section>

      {/* Emergency Types */}
      <section
        className="emergency-section"
        id="emergencies"
      >
        <div className="section-heading">

          <p>WHAT DO YOU NEED?</p>

          <h2>
            Choose an Emergency Type
          </h2>

          <span>
            Select the type of emergency and get the right assistance.
          </span>

        </div>

        <div className="emergency-grid">

          {emergencyTypes.map((emergency) => (
            <div
              className="emergency-card"
              key={emergency.title}
            >

              <div className="emergency-icon">
                {emergency.icon}
              </div>

              <h3>
                {emergency.title}
              </h3>

              <p>
                {emergency.text}
              </p>

              <button
                onClick={() =>
                  getLocation(emergency.title)
                }
              >
                📍 Find Nearby Help →
              </button>

            </div>
          ))}

        </div>
      </section>

      {/* Emergency Request Form */}
      {showRequestForm && (
        <section className="request-section">

          <div className="request-container">

            <div className="section-heading">

              <p>
                🆘 REQUEST HELP
              </p>

              <h2>
                Send an Emergency Help Request
              </h2>

              <span>
                Provide a few details so nearby helpers can understand your situation.
              </span>

            </div>

            {requestSent ? (
              <div className="success-message">

                <div className="success-icon">
                  ✅
                </div>

                <h2>
                  Help Request Sent
                </h2>

                <p>
                  Your emergency request has been recorded.
                  Nearby helpers can use your location and details to assist you.
                </p>

                <button
                  onClick={() => {
                    setRequestSent(false);
                    setShowRequestForm(false);
                  }}
                >
                  Done
                </button>

              </div>
            ) : (
              <form
                className="request-form"
                onSubmit={handleSubmitRequest}
              >

                {/* Emergency Type */}
                <div className="form-group">

                  <label>
                    Emergency Type
                  </label>

                  <input
                    type="text"
                    value={selectedEmergency}
                    readOnly
                  />

                </div>

                {/* Name */}
                <div className="form-group">

                  <label>
                    Your Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    required
                  />

                </div>

                {/* Phone */}
                <div className="form-group">

                  <label>
                    Phone Number *
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    required
                  />

                </div>

                {/* Description */}
                <div className="form-group">

                  <label>
                    What happened? *
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Briefly describe your emergency..."
                    rows="5"
                    required
                  />

                </div>

                {/* Location */}
                <div className="location-box">

                  <span>
                    📍
                  </span>

                  <div>
                    <strong>
                      Current Location
                    </strong>

                    {location ? (
                      <p>
                        Location captured successfully
                      </p>
                    ) : (
                      <p>
                        Location not available
                      </p>
                    )}
                  </div>

                </div>

                {/* Buttons */}
                <div className="form-actions">

                  <button
                    type="submit"
                    className="submit-request-btn"
                  >
                    🆘 Send Help Request
                  </button>

                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() =>
                      setShowRequestForm(false)
                    }
                  >
                    Cancel
                  </button>

                </div>

              </form>
            )}

          </div>

        </section>
      )}

      {/* How it works */}
      <section className="how-section">

        <div className="section-heading">

          <p>
            HOW IT WORKS
          </p>

          <h2>
            Get Help in 3 Simple Steps
          </h2>

        </div>

        <div className="steps">

          <div className="step">

            <div>
              1
            </div>

            <h3>
              Select Emergency
            </h3>

            <p>
              Choose what type of emergency you are facing.
            </p>

          </div>

          <div className="step">

            <div>
              2
            </div>

            <h3>
              Send Help Request
            </h3>

            <p>
              Provide your emergency details and location.
            </p>

          </div>

          <div className="step">

            <div>
              3
            </div>

            <h3>
              Get Connected
            </h3>

            <p>
              Connect with nearby volunteers or emergency services.
            </p>

          </div>

        </div>

      </section>

      {/* Footer */}
      <footer id="about">

        <div>
          🚨 <strong>EmergencyAid</strong>
        </div>

        <p>
          Connecting people with emergency help when it matters most.
        </p>

        <small>
          © 2026 EmergencyAid. All rights reserved.
        </small>

      </footer>

    </div>
  );
}

export default App;