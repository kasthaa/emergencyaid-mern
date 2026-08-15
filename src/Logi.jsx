import "./logi.css"
import { useState } from "react";
import { supabase } from "./supabaseClient";

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

    setLoading(true);

    try {
      if (isSignup) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
            },
          },
        });

        if (error) throw error;

        if (data.user) {
          alert(
            "Account created successfully! Please check your email if verification is required."
          );

          onLoginSuccess(data.user);
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        onLoginSuccess(data.user);
      }
    } catch (error) {
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

          <button className="login-submit-btn" type="submit" disabled={loading}>
            {loading
              ? "Please wait..."
              : isSignup
              ? "Create Account"
              : "Login"}
          </button>
        </form>

        <div className="login-switch">
          {isSignup ? "Already have an account?" : "Don't have an account?"}

          <button
            type="button"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? " Login" : " Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;