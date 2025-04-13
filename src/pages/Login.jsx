
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate('/');
    } catch (error) {
      let errorMessage = 'Failed to login. Please try again.';
      
      if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password.';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password.';
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
          <h1 className="auth-title">Sign In to WorkOasis</h1>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form className="auth-form" onSubmit={handleSubmit}>
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
            />
          </div>
          
          <div className="forgot-password">
            <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary btn-full"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
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
            Don't have an account? <Link to="/register" className="auth-link">Join Now</Link>
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
          max-width: 450px;
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
        
        .forgot-password {
          text-align: right;
          margin-bottom: 1.5rem;
        }
        
        .forgot-link {
          color: var(--primary);
          font-size: 0.9rem;
        }
        
        .btn-full {
          width: 100%;
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
      `}</style>
    </div>
  );
};

export default Login;
