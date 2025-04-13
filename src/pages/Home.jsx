
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, limit, orderBy, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import Navbar from '../components/Navbar';
import ServiceCard from '../components/ServiceCard';
import CategoryCard from '../components/CategoryCard';

const Home = ({ user }) => {
  const [featuredServices, setFeaturedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Mock categories
  const categories = [
    {
      name: "Graphics & Design",
      icon: "🎨",
      url: "/services?category=graphics-design",
      description: "Logos, banners and more"
    },
    {
      name: "Digital Marketing",
      icon: "📈",
      url: "/services?category=digital-marketing",
      description: "Reach more customers"
    },
    {
      name: "Writing & Translation",
      icon: "✍️",
      url: "/services?category=writing-translation",
      description: "Content that speaks"
    },
    {
      name: "Video & Animation",
      icon: "🎬",
      url: "/services?category=video-animation",
      description: "Bring ideas to life"
    },
    {
      name: "Programming & Tech",
      icon: "💻",
      url: "/services?category=programming-tech",
      description: "Code and technical solutions"
    },
    {
      name: "Business",
      icon: "📊",
      url: "/services?category=business",
      description: "Market your business"
    }
  ];

  // Mock services (for demo purposes)
  const mockServices = [
    {
      id: '1',
      title: "I will design a modern logo for your business",
      price: 50,
      rating: 4.9,
      ratingCount: 321,
      category: "Graphics & Design",
      coverImage: "https://images.unsplash.com/photo-1600081728723-c8aa2ee3344f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      seller: {
        id: 'u1',
        name: "Jane Cooper",
        avatar: "https://randomuser.me/api/portraits/women/12.jpg",
        level: "Top Rated Seller"
      }
    },
    {
      id: '2',
      title: "I will develop a responsive website using React",
      price: 120,
      rating: 4.8,
      ratingCount: 156,
      category: "Programming & Tech",
      coverImage: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      seller: {
        id: 'u2',
        name: "Alex Morgan",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        level: "Level 2 Seller"
      }
    },
    {
      id: '3',
      title: "I will write SEO-optimized blog content",
      price: 35,
      rating: 4.7,
      ratingCount: 432,
      category: "Writing & Translation",
      coverImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      seller: {
        id: 'u3',
        name: "Sophia Lee",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        level: "Level 1 Seller"
      }
    },
    {
      id: '4',
      title: "I will create a stunning promotional video",
      price: 85,
      rating: 4.9,
      ratingCount: 198,
      category: "Video & Animation",
      coverImage: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      seller: {
        id: 'u4',
        name: "Michael Brown",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        level: "Top Rated Seller"
      }
    },
    {
      id: '5',
      title: "I will manage your social media accounts",
      price: 60,
      rating: 4.6,
      ratingCount: 267,
      category: "Digital Marketing",
      coverImage: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      seller: {
        id: 'u5',
        name: "Emma Wilson",
        avatar: "https://randomuser.me/api/portraits/women/63.jpg",
        level: "Level 2 Seller"
      }
    },
    {
      id: '6',
      title: "I will create a business plan for your startup",
      price: 150,
      rating: 4.8,
      ratingCount: 121,
      category: "Business",
      coverImage: "https://images.unsplash.com/photo-1589561253898-768105ca91a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      seller: {
        id: 'u6',
        name: "Daniel Taylor",
        avatar: "https://randomuser.me/api/portraits/men/86.jpg",
        level: "Level 2 Seller"
      }
    },
    {
      id: '7',
      title: "I will create professional illustrations",
      price: 75,
      rating: 4.9,
      ratingCount: 189,
      category: "Graphics & Design",
      coverImage: "https://images.unsplash.com/photo-1618004912476-29818d81ae2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      seller: {
        id: 'u7',
        name: "Olivia Martinez",
        avatar: "https://randomuser.me/api/portraits/women/29.jpg",
        level: "Top Rated Seller"
      }
    },
    {
      id: '8',
      title: "I will optimize your website for SEO",
      price: 95,
      rating: 4.7,
      ratingCount: 243,
      category: "Digital Marketing",
      coverImage: "https://images.unsplash.com/photo-1571172964276-91faaa704e1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      seller: {
        id: 'u8',
        name: "Noah Wilson",
        avatar: "https://randomuser.me/api/portraits/men/18.jpg",
        level: "Level 1 Seller"
      }
    }
  ];
  
  useEffect(() => {
    const fetchFeaturedServices = async () => {
      try {
        // In a real app, fetch from Firestore
        // const q = query(
        //   collection(db, "services"),
        //   where("featured", "==", true),
        //   orderBy("rating", "desc"),
        //   limit(8)
        // );
        // const querySnapshot = await getDocs(q);
        // const services = querySnapshot.docs.map(doc => ({
        //   id: doc.id,
        //   ...doc.data()
        // }));
        // setFeaturedServices(services);
        
        // For demo, use mock data
        setFeaturedServices(mockServices);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching featured services:", error);
        setLoading(false);
      }
    };

    fetchFeaturedServices();
  }, []);
  
  return (
    <div className="home-page">
      <Navbar user={user} />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Find the perfect freelance services for your business</h1>
            <p className="hero-subtitle">Work with talented freelancers at the most affordable prices</p>
            <div className="hero-search">
              <input type="text" className="input" placeholder="Search for services" />
              <button className="btn btn-primary">Search</button>
            </div>
            <div className="popular-searches">
              <span>Popular:</span>
              <Link to="/services?category=logo-design" className="popular-link">Logo Design</Link>
              <Link to="/services?category=website-development" className="popular-link">Website Development</Link>
              <Link to="/services?category=content-writing" className="popular-link">Content Writing</Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Explore by category</h2>
          <div className="categories-grid">
            {categories.map((category, index) => (
              <CategoryCard key={index} category={category} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Services Section */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Services</h2>
            <Link to="/services" className="btn btn-outline">View All</Link>
          </div>
          
          {loading ? (
            <div className="loading-spinner">Loading...</div>
          ) : (
            <div className="services-grid">
              {featuredServices.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How WorkOasis Works</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-icon">1</div>
              <h3 className="step-title">Find the perfect service</h3>
              <p className="step-description">Browse through thousands of services by our talented freelancers.</p>
            </div>
            <div className="step">
              <div className="step-icon">2</div>
              <h3 className="step-title">Hire the right freelancer</h3>
              <p className="step-description">Check ratings, reviews, and portfolio before hiring.</p>
            </div>
            <div className="step">
              <div className="step-icon">3</div>
              <h3 className="step-title">Pay securely</h3>
              <p className="step-description">Payment is released when you approve the delivery.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Join as Freelancer CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Become a seller on WorkOasis</h2>
            <p className="cta-text">Join thousands of freelancers making money selling their services.</p>
            <Link to="/register" className="btn btn-primary">Join Now</Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3 className="footer-title">WorkOasis</h3>
              <p className="footer-description">Find the perfect freelance services for your business</p>
            </div>
            
            <div className="footer-section">
              <h3 className="footer-title">Categories</h3>
              <ul className="footer-links">
                {categories.map((category, index) => (
                  <li key={index}>
                    <Link to={category.url} className="footer-link">{category.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="footer-section">
              <h3 className="footer-title">About</h3>
              <ul className="footer-links">
                <li><Link to="/about" className="footer-link">About Us</Link></li>
                <li><Link to="/careers" className="footer-link">Careers</Link></li>
                <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
                <li><Link to="/privacy" className="footer-link">Privacy Policy</Link></li>
                <li><Link to="/terms" className="footer-link">Terms of Service</Link></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h3 className="footer-title">Connect</h3>
              <div className="social-links">
                <a href="#" className="social-link">
                  <span className="social-icon">📘</span>
                </a>
                <a href="#" className="social-link">
                  <span className="social-icon">🐦</span>
                </a>
                <a href="#" className="social-link">
                  <span className="social-icon">📸</span>
                </a>
                <a href="#" className="social-link">
                  <span className="social-icon">💼</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p className="copyright">© 2025 WorkOasis. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      <style jsx>{`
        .home-page {
          min-height: 100vh;
        }
        
        /* Hero Section */
        .hero-section {
          padding: 5rem 0;
          background: linear-gradient(to right, #f0f4f8, #e7f0f9);
          text-align: center;
        }
        
        .hero-content {
          max-width: 700px;
          margin: 0 auto;
        }
        
        .hero-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--text-dark);
        }
        
        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--text-light);
          margin-bottom: 2rem;
        }
        
        .hero-search {
          display: flex;
          max-width: 600px;
          margin: 0 auto 1.5rem;
        }
        
        .hero-search .input {
          flex: 1;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
        
        .hero-search .btn {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
        
        .popular-searches {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        
        .popular-searches span {
          color: var(--text-light);
        }
        
        .popular-link {
          color: var(--text-dark);
          text-decoration: underline;
          font-weight: 500;
        }
        
        /* Categories Section */
        .categories-section {
          padding: 5rem 0;
          background-color: var(--background);
        }
        
        .section-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 2rem;
          text-align: center;
        }
        
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
        }
        
        /* Featured Services Section */
        .featured-section {
          padding: 5rem 0;
          background-color: var(--background-light);
        }
        
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        
        /* How It Works Section */
        .how-it-works {
          padding: 5rem 0;
          background-color: var(--background);
        }
        
        .steps-container {
          display: flex;
          justify-content: space-between;
          gap: 2rem;
          margin-top: 3rem;
        }
        
        .step {
          flex: 1;
          text-align: center;
          padding: 2rem;
          border-radius: var(--radius);
          background-color: var(--background-light);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }
        
        .step-icon {
          width: 60px;
          height: 60px;
          background-color: var(--primary);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 auto 1.5rem;
        }
        
        .step-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--text-dark);
        }
        
        .step-description {
          color: var(--text-light);
          line-height: 1.5;
        }
        
        /* CTA Section */
        .cta-section {
          padding: 5rem 0;
          background: linear-gradient(to right, var(--primary-dark), var(--primary));
          color: white;
          text-align: center;
        }
        
        .cta-content {
          max-width: 700px;
          margin: 0 auto;
        }
        
        .cta-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }
        
        .cta-text {
          font-size: 1.125rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }
        
        /* Footer */
        .footer {
          padding: 4rem 0 2rem;
          background-color: var(--text-dark);
          color: white;
        }
        
        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 3rem;
          margin-bottom: 3rem;
        }
        
        .footer-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }
        
        .footer-description {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.5;
        }
        
        .footer-links {
          list-style: none;
        }
        
        .footer-links li {
          margin-bottom: 0.75rem;
        }
        
        .footer-link {
          color: rgba(255, 255, 255, 0.7);
          transition: color 0.3s ease;
        }
        
        .footer-link:hover {
          color: white;
        }
        
        .social-links {
          display: flex;
          gap: 1rem;
        }
        
        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.1);
          transition: background-color 0.3s ease;
        }
        
        .social-link:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }
        
        .social-icon {
          font-size: 1.25rem;
        }
        
        .footer-bottom {
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
        }
        
        .copyright {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
        }
        
        .loading-spinner {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 200px;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2rem;
          }
          
          .hero-search {
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .hero-search .input,
          .hero-search .btn {
            border-radius: var(--radius);
          }
          
          .steps-container {
            flex-direction: column;
          }
          
          .footer-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
