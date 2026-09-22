 import "./Login.css";
import { useState } from "react";

function Login({ onLoginSuccess }) {
  const [isSignup, setIsSignup] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    if (isSignup && !name) {
      alert("Please enter your full name.");
      return;
    }

    setLoading(true);

    try {
      // ===============================
      // SIGN UP
      // ===============================

      if (isSignup) {
        const response = await fetch(
          "http://localhost:5000/api/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              password,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Registration failed");
        }

        // Save authentication data
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("user", JSON.stringify(data.user));

        alert("Account created successfully!");

        onLoginSuccess(data.user);
      }

      // ===============================
      // LOGIN
      // ===============================

      else {
        const response = await fetch(
          "http://localhost:5000/api/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Login failed");
        }

        // Save authentication data
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("user", JSON.stringify(data.user));

        alert("Login successful!");

        onLoginSuccess(data.user);
      }
    } catch (error) {
      console.error("Authentication error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">🚨</div>

        <h1>EmergencyAid</h1>

        <p className="login-subtitle">
          {isSignup
            ? "Create your account to request emergency help."
            : "Login to request emergency help."}
        </p>

        <form onSubmit={handleAuth}>
          {/* NAME - SIGNUP ONLY */}
          {isSignup && (
            <div className="input-group">
              <label>Full Name</label>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          {/* EMAIL */}
          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          {/* SUBMIT */}
          <button
            className="login-submit-btn"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : isSignup
              ? "Create Account"
              : "Login"}
          </button>
        </form>

        {/* SWITCH LOGIN / SIGNUP */}
        <div className="login-switch">
          {isSignup
            ? "Already have an account?"
            : "Don't have an account?"}

          <button
            type="button"
            onClick={() => {
              setIsSignup(!isSignup);
              setEmail("");
              setPassword("");
              setName("");
            }}
          >
            {isSignup ? " Login" : " Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;