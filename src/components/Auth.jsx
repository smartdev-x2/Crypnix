import React, { useState } from 'react';
import './Auth.css'; // Import the specific styles for Auth
import { PhoneInput } from 'react-international-phone'; // Import the phone input component
import 'react-international-phone/style.css'; // Import the phone input styles

// SVG for the coin (example - you can use a more detailed one)
const CoinIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" stroke="#FFD700" strokeWidth="2" />
    <path d="M12 6v12M8 9l4 3 4-3" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const Auth = () => {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(''); // State for phone number
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' }); // For toast messages

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setMessage({ type: '', text: '' }); // Clear message on tab switch
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    // Basic validation for registration
    if (activeTab === 'register') {
      if (password !== confirmPassword) {
        setMessage({ type: 'error', text: 'Passwords do not match!' });
        setLoading(false);
        return;
      }
      if (password.length < 6) {
        setMessage({ type: 'error', text: 'Password must be at least 6 characters.' });
        setLoading(false);
        return;
      }
    }

    // Prepare data based on active tab
    const action = activeTab; // 'login' or 'register'
    const data = {
      action,
      email, // Use email for both login and register
    };

    if (activeTab === 'register') {
      data.name = name;
      data.phone = phone; // Include phone number
      data.password = password; // Use password for register
      if (referralCode) data.referral = referralCode; // Include referral code if provided
    } else {
      data.password = password; // Use password for login
    }

    try {
      // Call your PHP backend
      const response = await fetch('https://qfspayx-backend.42web.io/index.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result); // Log the response for debugging

      if (result.success) {
        setMessage({ type: 'success', text: result.message || (activeTab === 'login' ? 'Login successful!' : 'Registration successful!') });
        // Optionally redirect or clear form here after success
        if (activeTab === 'register') {
          // Clear form after successful registration
          setName('');
          setEmail('');
          setPhone('');
          setPassword('');
          setConfirmPassword('');
          setReferralCode('');
        }
        // Example: Simulate redirect after success
        // window.location.href = '/dashboard'; // Or use React Router
      } else {
        setMessage({ type: 'error', text: result.message || 'An error occurred.' });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Animated Background with Falling Coins */}
      <div className="animated-background">
        {[...Array(15)].map((_, i) => (
          <CoinIcon key={i} className="falling-coin" />
        ))}
      </div>

      {/* Auth Container with Glass Effect */}
      <div className="auth-container">
        <div className="auth-header">
          <h1>CrypNix</h1> {/* Replace with your logo if available */}
        </div>

        {/* Tabs */}
        <div className="auth-tabs">
          <button
            className={`tab-button ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => handleTabSwitch('login')}
          >
            Login
          </button>
          <button
            className={`tab-button ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => handleTabSwitch('register')}
          >
            Register
          </button>
        </div>

        {/* Auth Form */}
        <form className="auth-form" onSubmit={handleSubmit}>
          {activeTab === 'register' && (
            <>
              <div className="input-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="phone">Phone</label>
                <PhoneInput
                  id="phone"
                  value={phone}
                  onChange={setPhone}
                  defaultCountry="us" // You can set a default country or make it dynamic
                  placeholder="Enter phone number"
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="referral">Referral Code (Optional)</label>
                <input
                  type="text"
                  id="referral"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  placeholder="Enter referral code"
                />
              </div>
            </>
          )}

          {activeTab === 'login' && (
            <>
              <div className="input-group">
                <label htmlFor="login-email">Email</label>
                <input
                  type="email"
                  id="login-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </>
          )}

          <div className="input-group">
            <label htmlFor="password">{activeTab === 'login' ? 'Password' : 'Password'}</label>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'} // Toggle input type
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={activeTab === 'login' ? 'Enter your password' : 'Create a password'}
                required
              />
              <button
                type="button"
                className="toggle-password-button"
                onClick={() => setShowPassword(!showPassword)} // Toggle state
              >
                {showPassword ? 'Hide' : 'Show'} {/* Simple text toggle */}
              </button>
            </div>
          </div>

          {activeTab === 'register' && (
            <div className="input-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <div className="password-input-container">
                <input
                  type={showConfirmPassword ? 'text' : 'password'} // Toggle input type
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  className="toggle-password-button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle state
                >
                  {showConfirmPassword ? 'Hide' : 'Show'} {/* Simple text toggle */}
                </button>
              </div>
            </div>
          )}

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Processing...' : activeTab === 'login' ? 'Login' : 'Register'}
          </button>
        </form>

        {/* Toast Message Display */}
        {message.text && (
          <div className={`toast ${message.type}`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;