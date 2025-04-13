
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc, collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../firebase/config';
import Navbar from '../components/Navbar';
import ServiceCard from '../components/ServiceCard';

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Mock user data
  const mockUser = {
    id: 'u1',
    fullName: "Jane Cooper",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    level: "Top Rated Seller",
    rating: 4.9,
    ratingCount: 456,
    bio: "Professional graphic designer with over 8 years of experience. Specializing in logo design, branding, and digital illustrations. I'm passionate about creating clean, modern designs that help businesses stand out in the market.",
    skills: ["Logo Design", "Branding", "UI/UX Design", "Illustration", "Print Design"],
    languages: ["English (Fluent)", "Spanish (Basic)"],
    education: [
      {
        title: "Bachelor of Fine Arts in Graphic Design",
        institution: "Rhode Island School of Design",
        year: "2015-2019"
      }
    ],
    experience: [
      {
        title: "Senior Graphic Designer",
        company: "Creative Solutions Agency",
        duration: "2019-Present"
      },
      {
        title: "Junior Designer",
        company: "DesignHub Studio",
        duration: "2017-2019"
      }
    ],
    location: "United States",
    memberSince: "Jan 2020",
    lastDelivery: "1 day ago",
    responseTime: "1 hour",
    stats: {
      completedProjects: 324,
      ongoingProjects: 12,
      cancelRate: "2%"
    }
  };
  
  // Mock services data
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
      id: '7',
      title: "I will create professional illustrations",
      price: 75,
      rating: 4.9,
      ratingCount: 189,
      category: "Graphics & Design",
      coverImage: "https://images.unsplash.com/photo-1618004912476-29818d81ae2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      seller: {
        id: 'u1',
        name: "Jane Cooper",
        avatar: "https://randomuser.me/api/portraits/women/12.jpg",
        level: "Top Rated Seller"
      }
    },
    {
      id: '11',
      title: "I will create a mobile app UI design",
      price: 120,
      rating: 4.7,
      ratingCount: 176,
      category: "Graphics & Design",
      coverImage: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      seller: {
        id: 'u1',
        name: "Jane Cooper",
        avatar: "https://randomuser.me/api/portraits/women/12.jpg",
        level: "Top Rated Seller"
      }
    }
  ];
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // In a real app, fetch from Firestore
        // const userDocRef = doc(db, "users", id);
        // const userSnapshot = await getDoc(userDocRef);
        // if (!userSnapshot.exists()) {
        //   throw new Error("User not found");
        // }
        
        // const userData = {
        //   id: userSnapshot.id,
        //   ...userSnapshot.data()
        // };
        
        // const servicesQuery = query(
        //   collection(db, "services"),
        //   where("sellerId", "==", id),
        //   where("active", "==", true),
        //   limit(6)
        // );
        
        // const servicesSnapshot = await getDocs(servicesQuery);
        // const servicesData = [];
        // servicesSnapshot.forEach(doc => {
        //   servicesData.push({
        //     id: doc.id,
        //     ...doc.data()
        //   });
        // });
        
        // setUser(userData);
        // setServices(servicesData);
        
        // For demo, use mock data
        setUser(mockUser);
        
        // Filter mock services to match the user id
        const userServices = mockServices.filter(service => service.seller.id === id);
        setServices(userServices);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [id]);
  
  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }
  
  if (!user) {
    return <div className="not-found">User not found</div>;
  }
  
  return (
    <div className="profile-page">
      <Navbar />
      
      <div className="container py-5">
        <div className="profile-header">
          <div className="profile-avatar">
            <img src={user.avatar} alt={user.fullName} />
          </div>
          
          <div className="profile-info">
            <h1 className="profile-name">{user.fullName}</h1>
            <p className="profile-title">{user.level}</p>
            
            <div className="profile-meta">
              <div className="profile-rating">
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={star <= Math.floor(user.rating) ? "star filled" : "star"}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="rating-text">{user.rating}</span>
                <span className="rating-count">({user.ratingCount})</span>
              </div>
              
              <div className="profile-location">
                <span className="location-icon">📍</span>
                <span>{user.location}</span>
              </div>
              
              <div className="profile-member-since">
                <span className="member-icon">🗓️</span>
                <span>Member since {user.memberSince}</span>
              </div>
            </div>
          </div>
          
          <div className="profile-actions">
            <button className="btn btn-outline">Contact Me</button>
          </div>
        </div>
        
        <div className="profile-content">
          <div className="profile-main">
            <section className="profile-section">
              <h2 className="section-title">About Me</h2>
              <p className="bio">{user.bio}</p>
            </section>
            
            <section className="profile-section">
              <h2 className="section-title">My Services</h2>
              <div className="services-grid">
                {services.map(service => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
              
              {services.length === 0 && (
                <div className="no-services">
                  <p>No services available at the moment.</p>
                </div>
              )}
            </section>
            
            <section className="profile-section">
              <h2 className="section-title">Education</h2>
              <div className="education-list">
                {user.education && user.education.map((item, index) => (
                  <div key={index} className="education-item">
                    <h3 className="item-title">{item.title}</h3>
                    <p className="item-details">{item.institution}, {item.year}</p>
                  </div>
                ))}
              </div>
            </section>
            
            <section className="profile-section">
              <h2 className="section-title">Experience</h2>
              <div className="experience-list">
                {user.experience && user.experience.map((item, index) => (
                  <div key={index} className="experience-item">
                    <h3 className="item-title">{item.title}</h3>
                    <p className="item-details">{item.company}, {item.duration}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
          
          <div className="profile-sidebar">
            <div className="sidebar-section stats-section">
              <h3 className="sidebar-title">Seller Stats</h3>
              <div className="stats-list">
                <div className="stat-item">
                  <div className="stat-label">Completed Projects</div>
                  <div className="stat-value">{user.stats.completedProjects}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Ongoing Projects</div>
                  <div className="stat-value">{user.stats.ongoingProjects}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Cancel Rate</div>
                  <div className="stat-value">{user.stats.cancelRate}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Response Time</div>
                  <div className="stat-value">{user.responseTime}</div>
                </div>
              </div>
            </div>
            
            <div className="sidebar-section">
              <h3 className="sidebar-title">Skills</h3>
              <div className="skills-list">
                {user.skills && user.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
            
            <div className="sidebar-section">
              <h3 className="sidebar-title">Languages</h3>
              <div className="languages-list">
                {user.languages && user.languages.map((language, index) => (
                  <div key={index} className="language-item">{language}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .profile-page {
          background-color: var(--background-light);
          min-height: 100vh;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        .py-5 {
          padding-top: 2.5rem;
          padding-bottom: 2.5rem;
        }
        
        .profile-header {
          display: flex;
          align-items: center;
          gap: 2rem;
          background-color: white;
          border-radius: var(--radius);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          padding: 2rem;
          margin-bottom: 2rem;
        }
        
        .profile-avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid var(--primary);
        }
        
        .profile-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .profile-info {
          flex: 1;
        }
        
        .profile-name {
          font-size: 1.75rem;
          font-weight: 700;
          margin: 0 0 0.25rem;
          color: var(--text-dark);
        }
        
        .profile-title {
          color: var(--primary);
          font-size: 1.1rem;
          margin: 0 0 1rem;
        }
        
        .profile-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        
        .profile-rating {
          display: flex;
          align-items: center;
        }
        
        .stars {
          display: flex;
          margin-right: 0.5rem;
        }
        
        .star {
          color: var(--text-lighter);
          font-size: 1rem;
        }
        
        .star.filled {
          color: #ffbf00;
        }
        
        .rating-text {
          font-weight: 700;
          font-size: 0.9rem;
          margin-right: 0.25rem;
        }
        
        .rating-count {
          color: var(--text-light);
          font-size: 0.9rem;
        }
        
        .profile-location,
        .profile-member-since {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-light);
        }
        
        .profile-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
        }
        
        .profile-section {
          background-color: white;
          border-radius: var(--radius);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          padding: 2rem;
          margin-bottom: 2rem;
        }
        
        .section-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0 0 1.5rem;
          color: var(--text-dark);
        }
        
        .bio {
          line-height: 1.7;
          color: var(--text-dark);
        }
        
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
        }
        
        .no-services {
          color: var(--text-light);
          text-align: center;
          padding: 2rem 0;
        }
        
        .education-list,
        .experience-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .item-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0 0 0.5rem;
          color: var(--text-dark);
        }
        
        .item-details {
          color: var(--text-light);
          margin: 0;
        }
        
        .profile-sidebar {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        
        .sidebar-section {
          background-color: white;
          border-radius: var(--radius);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          padding: 1.5rem;
        }
        
        .sidebar-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin: 0 0 1.25rem;
          color: var(--text-dark);
        }
        
        .stats-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }
        
        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .stat-label {
          font-size: 0.9rem;
          color: var(--text-light);
        }
        
        .stat-value {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-dark);
        }
        
        .skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        
        .skill-tag {
          display: inline-block;
          padding: 0.4em 0.65em;
          font-size: 0.85em;
          font-weight: 500;
          background-color: var(--background-light);
          border-radius: 50px;
          color: var(--text-dark);
        }
        
        .languages-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        .language-item {
          color: var(--text-dark);
        }
        
        @media (max-width: 992px) {
          .profile-header {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }
          
          .profile-meta {
            justify-content: center;
          }
          
          .profile-content {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 576px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
          
          .stats-list {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default UserProfile;
