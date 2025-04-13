
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'client' // client or freelancer
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }
    
    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters');
    }
    
    setLoading(true);
    
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      
      const user = userCredential.user;
      
      // Update user profile
      await updateProfile(user, {
        displayName: formData.fullName,
      });
      
      // Add user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        fullName: formData.fullName,
        email: formData.email,
        userType: formData.userType,
        createdAt: new Date(),
        ratings: 0,
        ratingCount: 0,
        bio: "",
        skills: []
      });
      
      navigate('/');
    } catch (error) {
      let errorMessage = 'Failed to create account. Please try again.';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email is already in use.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <Link to="/" className="logo">
            <span className="text-2xl font-bold">Work<span className="text-primary">Oasis</span></span>
          </Link>
          <h1 className="auth-title">Join WorkOasis</h1>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input 
              type="text" 
              id="fullName"
              name="fullName"
              className="input"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email"
              name="email"
              className="input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password"
              name="password"
              className="input"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword"
              name="confirmPassword"
              className="input"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>
          
          <div className="form-group">
            <label>I want to:</label>
            <div className="user-type-options">
              <label className={`user-type-option ${formData.userType === 'client' ? 'selected' : ''}`}>
                <input 
                  type="radio"
                  name="userType"
                  value="client"
                  checked={formData.userType === 'client'}
                  onChange={handleChange}
                />
                <div className="option-content">
                  <span className="option-icon">🛒</span>
                  <span className="option-label">Hire Freelancers</span>
                </div>
              </label>
              
              <label className={`user-type-option ${formData.userType === 'freelancer' ? 'selected' : ''}`}>
                <input 
                  type="radio"
                  name="userType"
                  value="freelancer"
                  checked={formData.userType === 'freelancer'}
                  onChange={handleChange}
                />
                <div className="option-content">
                  <span className="option-icon">💼</span>
                  <span className="option-label">Work as Freelancer</span>
                </div>
              </label>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary btn-full"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
          
          <p className="terms-text">
            By joining, you agree to our <Link to="/terms" className="auth-link">Terms of Service</Link> and <Link to="/privacy" className="auth-link">Privacy Policy</Link>
          </p>
        </form>
        
        <div className="auth-separator">
          <span>OR</span>
        </div>
        
        <button className="social-button google-button">
          <span className="social-icon">G</span>
          <span>Continue with Google</span>
        </button>
        
        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login" className="auth-link">Sign In</Link>
          </p>
        </div>
      </div>
      
      <style jsx>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background-color: var(--background-light);
        }
        
        .auth-container {
          width: 100%;
          max-width: 500px;
          padding: 2.5rem;
          border-radius: var(--radius);
          background-color: white;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
        }
        
        .auth-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .logo {
          display: inline-block;
          margin-bottom: 1.5rem;
        }
        
        .text-primary {
          color: var(--primary);
        }
        
        .auth-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-dark);
        }
        
        .error-message {
          background-color: rgba(251, 83, 83, 0.1);
          color: var(--error);
          padding: 0.75rem;
          border-radius: var(--radius);
          margin-bottom: 1.5rem;
          text-align: center;
        }
        
        .auth-form {
          margin-bottom: 1.5rem;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: var(--text-dark);
        }
        
        .user-type-options {
          display: flex;
          gap: 1rem;
        }
        
        .user-type-option {
          flex: 1;
          position: relative;
          display: block;
          padding: 1.25rem;
          border: 1px solid var(--border-color);
          border-radius: var(--radius);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .user-type-option.selected {
          border-color: var(--primary);
          box-shadow: 0 0 0 2px var(--primary-light);
        }
        
        .user-type-option input {
          position: absolute;
          opacity: 0;
          width: 0;
          height: 0;
        }
        
        .option-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }
        
        .option-icon {
          font-size: 2rem;
        }
        
        .option-label {
          font-weight: 500;
          text-align: center;
        }
        
        .btn-full {
          width: 100%;
        }
        
        .terms-text {
          font-size: 0.85rem;
          color: var(--text-light);
          margin-top: 1rem;
          text-align: center;
        }
        
        .auth-separator {
          display: flex;
          align-items: center;
          margin: 1.5rem 0;
          color: var(--text-light);
        }
        
        .auth-separator::before,
        .auth-separator::after {
          content: '';
          flex: 1;
          height: 1px;
          background-color: var(--border-color);
        }
        
        .auth-separator span {
          padding: 0 1rem;
          font-size: 0.9rem;
        }
        
        .social-button {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem;
          border-radius: var(--radius);
          border: 1px solid var(--border-color);
          background-color: white;
          font-weight: 500;
          transition: background-color 0.3s ease;
        }
        
        .social-button:hover {
          background-color: var(--background-light);
        }
        
        .social-icon {
          margin-right: 0.75rem;
          font-weight: bold;
        }
        
        .auth-footer {
          margin-top: 2rem;
          text-align: center;
          color: var(--text-light);
        }
        
        .auth-link {
          color: var(--primary);
          font-weight: 500;
        }
        
        @media (max-width: 576px) {
          .auth-container {
            padding: 2rem 1.5rem;
          }
          
          .user-type-options {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default Register;
