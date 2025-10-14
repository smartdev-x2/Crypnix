import React, { useState } from 'react';
import './Auth.css'; // Import the specific styles for Auth
// Assuming your logo image is in src/assets/logo.png
import logo from '../assets/logo.png'; // Adjust path if necessary

const Auth = () => {
  const [activeTab, setActiveTab] = useState('register'); // Default to register now
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(''); // State for phone number (simple input)
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility
  const [agreeTerms, setAgreeTerms] = useState(false); // State for terms agreement
  const [passwordStrength, setPasswordStrength] = useState(''); // State for password strength
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' }); // For toast messages

  // Function to calculate password strength (simple example)
  const calculatePasswordStrength = (pwd) => {
    if (pwd.length === 0) return '';
    if (pwd.length < 8) return 'Too Short';
    let strength = 0;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[a-z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;
    if (strength < 2) return 'Weak';
    if (strength < 3) return 'Medium';
    return 'Strong';
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(calculatePasswordStrength(newPassword));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

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
      if (!agreeTerms) {
        setMessage({ type: 'error', text: 'You must agree to the Terms of Service and Privacy Policy.' });
        setLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        setMessage({ type: 'error', text: 'Passwords do not match!' });
        setLoading(false);
        return;
      }
      if (password.length < 8) { // Updated min length requirement
        setMessage({ type: 'error', text: 'Password must be at least 8 characters.' });
        setLoading(false);
        return;
      }
      // Add more validation if needed (e.g., password complexity)
    }

    // Prepare data based on active tab
    const action = activeTab; // 'login' or 'register'
    const data = {
      action,
      email, // Use email for both login and register
    };

    if (activeTab === 'register') {
      data.name = name;
      data.phone = phone; // Include simple phone number
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
          setAgreeTerms(false); // Clear terms agreement
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
      {/* Animated Background - Now using GitHub dark style */}
      <div className="animated-background">
        {/* Optional: Add subtle particles or lines here if desired */}
      </div>

      {/* Auth Container */}
      <div className="auth-container">
        {/* Header with Logo */}
        <div className="auth-header">
          <div className="logo-container">
            {loading ? ( // Show spinner while loading
              <div className="logo-spinner"></div>
            ) : (
              <img src={logo} alt="CrypNix Logo" className="logo-image" />
            )}
          </div>
          <h1 className="app-title">CRYPNIX</h1>
          <h2 className="subtitle">
            {activeTab === 'login' ? 'Sign In to Your Account' : 'Create Your Trading Account'}
          </h2>
        </div>

        {/* Security Trust Elements */}
        <div className="security-trust">
          <p><span className="icon">🔒</span> Your data is secured with bank-level encryption</p>
          <p><span className="icon">🔑</span> 2-Factor Authentication required for all accounts</p>
          <p><span className="icon">🛡️</span> SSL Secured Connection</p>
        </div>

        {/* Tabs - Only show if needed, maybe hide for single view later */}
        <div className="auth-tabs">
          <button
            className={`tab-button ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => handleTabSwitch('login')}
          >
            Sign In
          </button>
          <button
            className={`tab-button ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => handleTabSwitch('register')}
          >
            Sign Up
          </button>
        </div>

        {/* Auth Form */}
        <form className="auth-form" onSubmit={handleSubmit}>
          {activeTab === 'register' && (
            <>
              <div className="input-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </>
          )}
          <div className="input-group">
            <label htmlFor="email">{activeTab === 'login' ? 'Email Address *' : 'Email Address *'}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={activeTab === 'login' ? "Enter your email" : "Enter your email address"}
              required
            />
          </div>
          {activeTab === 'register' && (
            <>
              <div className="input-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel" // Use tel for phone
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 123-4567"
                  required
                />
              </div>
            </>
          )}

          <div className="input-group">
            <label htmlFor="password">{activeTab === 'login' ? 'Password *' : 'Password *'}</label>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'} // Toggle input type
                id="password"
                value={password}
                onChange={handlePasswordChange} // Use updated handler
                placeholder={activeTab === 'login' ? 'Enter your password' : 'Create a password'}
                required
              />
              <div className="password-strength-indicator">
                <span className={`strength ${passwordStrength.toLowerCase()}`}>{passwordStrength}</span>
              </div>
              <button
                type="button"
                className="toggle-password-button"
                onClick={() => setShowPassword(!showPassword)} // Toggle state
              >
                {showPassword ? '👁️' : '👁️‍🗨️'} {/* Eye icons */}
              </button>
            </div>
            <p className="password-requirements">• Must be 8+ characters with numbers & symbols</p>
          </div>

          {activeTab === 'register' && (
            <>
              <div className="input-group">
                <label htmlFor="confirm-password">Confirm Password *</label>
                <div className="password-input-container">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'} // Toggle input type
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange} // Use updated handler
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password-button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle state
                  >
                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'} {/* Eye icons */}
                  </button>
                </div>
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

          {activeTab === 'register' && (
            <div className="terms-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  required
                />
                <span className="checkmark"></span>
                <span>I agree to <a href="#" target="_blank">Terms of Service</a> & <a href="#" target="_blank">Privacy Policy</a></span>
              </label>
              <p className="risk-warning">⚠️ Trading involves risk - only invest what you can afford to lose</p>
            </div>
          )}

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? (
              <span className="loading-text">Processing...</span>
            ) : activeTab === 'login' ? (
              'Sign In'
            ) : (
              'Create Secure Account 🔐' // Updated button text
            )}
          </button>
        </form>

        {/* Trust Pilot Link */}
        <div className="trustpilot-link">
          <a href="" target="_blank" rel="noopener noreferrer">Leave a Review on Trustpilot</a>
        </div>

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