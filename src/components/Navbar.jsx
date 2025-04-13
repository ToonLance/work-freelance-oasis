
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';

const Navbar = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const navbarClasses = `navbar ${isScrolled ? 'navbar-scrolled' : ''}`;
  
  return (
    <nav className={navbarClasses}>
      <div className="container flex justify-between items-center py-3">
        <div className="navbar-brand">
          <Link to="/" className="logo">
            <span className="text-2xl font-bold">Work<span className="text-primary">Oasis</span></span>
          </Link>
        </div>
        
        <div className="navbar-search hide-on-mobile">
          <div className="search-container">
            <input 
              type="text" 
              className="input" 
              placeholder="Search for services..."
            />
            <button className="search-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="navbar-menu hide-on-mobile">
          <div className="flex items-center gap-4">
            <Link to="/services" className="navbar-link">Explore</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="navbar-link">Dashboard</Link>
                <div className="user-menu">
                  <div className="user-avatar">
                    <img src={user.photoURL || '/default-avatar.png'} alt="User" />
                  </div>
                  <div className="user-dropdown">
                    <Link to="/profile" className="dropdown-item">Profile</Link>
                    <Link to="/my-services" className="dropdown-item">My Services</Link>
                    <Link to="/orders" className="dropdown-item">Orders</Link>
                    <hr />
                    <button onClick={handleLogout} className="dropdown-item">Logout</button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline">Sign In</Link>
                <Link to="/register" className="btn btn-primary">Join</Link>
              </>
            )}
          </div>
        </div>

        <button className="mobile-menu-toggle show-on-mobile" onClick={toggleMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
          </svg>
        </button>

        {isMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-header">
              <div className="logo">WorkOasis</div>
              <button onClick={toggleMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </button>
            </div>
            <div className="mobile-search">
              <input type="text" className="input" placeholder="Search for services..." />
            </div>
            <div className="mobile-menu-items">
              <Link to="/services" className="mobile-menu-item" onClick={toggleMenu}>Explore</Link>
              {user ? (
                <>
                  <Link to="/dashboard" className="mobile-menu-item" onClick={toggleMenu}>Dashboard</Link>
                  <Link to="/profile" className="mobile-menu-item" onClick={toggleMenu}>Profile</Link>
                  <Link to="/my-services" className="mobile-menu-item" onClick={toggleMenu}>My Services</Link>
                  <Link to="/orders" className="mobile-menu-item" onClick={toggleMenu}>Orders</Link>
                  <button onClick={handleLogout} className="mobile-menu-item">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="mobile-menu-item" onClick={toggleMenu}>Sign In</Link>
                  <Link to="/register" className="mobile-menu-item" onClick={toggleMenu}>Join</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      
      <style jsx>{`
        .navbar {
          position: sticky;
          top: 0;
          width: 100%;
          z-index: 1000;
          background-color: white;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }
        
        .navbar-scrolled {
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .logo {
          color: var(--text-dark);
        }
        
        .text-primary {
          color: var(--primary);
        }
        
        .navbar-search {
          flex: 1;
          max-width: 500px;
          margin: 0 1.5rem;
        }
        
        .search-container {
          position: relative;
          display: flex;
          align-items: center;
        }
        
        .search-button {
          position: absolute;
          right: 10px;
          color: var(--text-light);
          padding: 5px;
          transition: color 0.3s ease;
        }
        
        .search-button:hover {
          color: var(--primary);
        }
        
        .navbar-link {
          color: var(--text-dark);
          font-weight: 500;
          transition: color 0.3s ease;
        }
        
        .navbar-link:hover {
          color: var(--primary);
        }
        
        .user-menu {
          position: relative;
        }
        
        .user-avatar {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          overflow: hidden;
          cursor: pointer;
        }
        
        .user-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .user-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          width: 180px;
          background-color: white;
          border-radius: var(--radius);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          padding: 0.5rem 0;
          margin-top: 0.5rem;
          display: none;
        }
        
        .user-menu:hover .user-dropdown {
          display: block;
        }
        
        .dropdown-item {
          display: block;
          padding: 0.5rem 1rem;
          color: var(--text-dark);
          transition: background-color 0.3s ease;
          text-align: left;
          width: 100%;
        }
        
        .dropdown-item:hover {
          background-color: var(--background-light);
          color: var(--primary);
        }
        
        .mobile-menu-toggle {
          display: none;
        }
        
        .mobile-menu {
          display: none;
        }
        
        @media (max-width: 768px) {
          .hide-on-mobile {
            display: none;
          }
          
          .show-on-mobile {
            display: block;
          }
          
          .mobile-menu-toggle {
            display: block;
          }
          
          .mobile-menu {
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: white;
            z-index: 2000;
            padding: 1rem;
          }
          
          .mobile-menu-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 1rem;
            border-bottom: 1px solid var(--border-color);
          }
          
          .mobile-search {
            padding: 1rem 0;
          }
          
          .mobile-menu-items {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding-top: 1rem;
          }
          
          .mobile-menu-item {
            font-size: 1.1rem;
            padding: 0.5rem 0;
            border-bottom: 1px solid var(--border-color);
            width: 100%;
            text-align: left;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
