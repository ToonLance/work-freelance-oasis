
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <Navbar />
      
      <div className="not-found-content">
        <div className="not-found-illustration">
          <span className="not-found-code">404</span>
        </div>
        <h1 className="not-found-title">Oops! Page not found</h1>
        <p className="not-found-message">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
      
      <style jsx>{`
        .not-found-page {
          min-height: 100vh;
          background-color: var(--background-light);
        }
        
        .not-found-content {
          max-width: 600px;
          margin: 0 auto;
          padding: 5rem 1rem;
          text-align: center;
        }
        
        .not-found-illustration {
          margin-bottom: 2rem;
        }
        
        .not-found-code {
          font-size: 8rem;
          font-weight: 700;
          color: var(--primary);
          line-height: 1;
          display: block;
        }
        
        .not-found-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--text-dark);
        }
        
        .not-found-message {
          font-size: 1.1rem;
          color: var(--text-light);
          margin-bottom: 2rem;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
};

export default NotFound;
