
import { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { collection, query, where, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import Navbar from '../components/Navbar';

const MyServices = ({ user }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Mock services data
  const mockServices = [
    {
      id: '1',
      title: "I will design a modern logo for your business",
      price: 50,
      orders: 24,
      impressions: 1250,
      clicks: 345,
      active: true,
      coverImage: "https://images.unsplash.com/photo-1600081728723-c8aa2ee3344f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      createdAt: "2025-03-15"
    },
    {
      id: '7',
      title: "I will create professional illustrations",
      price: 75,
      orders: 18,
      impressions: 980,
      clicks: 276,
      active: true,
      coverImage: "https://images.unsplash.com/photo-1618004912476-29818d81ae2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      createdAt: "2025-02-20"
    },
    {
      id: '11',
      title: "I will create a mobile app UI design",
      price: 120,
      orders: 12,
      impressions: 745,
      clicks: 198,
      active: false,
      coverImage: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      createdAt: "2025-01-10"
    }
  ];
  
  useEffect(() => {
    const fetchServices = async () => {
      if (!user) return;
      
      try {
        // In a real app, fetch from Firestore
        // const servicesRef = collection(db, "services");
        // const q = query(servicesRef, where("sellerId", "==", user.uid));
        // const querySnapshot = await getDocs(q);
        
        // const servicesData = [];
        // querySnapshot.forEach((doc) => {
        //   servicesData.push({
        //     id: doc.id,
        //     ...doc.data()
        //   });
        // });
        
        // setServices(servicesData);
        
        // For demo, use mock data
        setServices(mockServices);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching services:", error);
        setLoading(false);
      }
    };
    
    fetchServices();
  }, [user]);
  
  const handleToggleServiceStatus = async (serviceId, currentStatus) => {
    try {
      // In a real app, update in Firestore
      // const serviceRef = doc(db, "services", serviceId);
      // await updateDoc(serviceRef, {
      //   active: !currentStatus
      // });
      
      // For demo, update state
      setServices(services.map(service => 
        service.id === serviceId 
          ? { ...service, active: !service.active } 
          : service
      ));
    } catch (error) {
      console.error("Error updating service status:", error);
    }
  };
  
  const handleDeleteService = async (serviceId) => {
    if (!confirm("Are you sure you want to delete this service?")) {
      return;
    }
    
    try {
      // In a real app, delete from Firestore
      // const serviceRef = doc(db, "services", serviceId);
      // await deleteDoc(serviceRef);
      
      // For demo, update state
      setServices(services.filter(service => service.id !== serviceId));
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="my-services-page">
      <Navbar user={user} />
      
      <div className="container py-5">
        <div className="page-header">
          <h1 className="page-title">My Services</h1>
          <Link to="/create-service" className="btn btn-primary">
            Create New Service
          </Link>
        </div>
        
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : services.length > 0 ? (
          <div className="services-table-container">
            <table className="services-table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Price</th>
                  <th>Orders</th>
                  <th>Impressions</th>
                  <th>Clicks</th>
                  <th>Created</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map(service => (
                  <tr key={service.id}>
                    <td className="service-cell">
                      <div className="service-info">
                        <div className="service-image">
                          <img src={service.coverImage} alt={service.title} />
                        </div>
                        <span className="service-title">{service.title}</span>
                      </div>
                    </td>
                    <td className="price-cell">${service.price}</td>
                    <td>{service.orders}</td>
                    <td>{service.impressions}</td>
                    <td>{service.clicks}</td>
                    <td>{new Date(service.createdAt).toLocaleDateString()}</td>
                    <td>
                      <span className={`status-badge ${service.active ? 'status-active' : 'status-inactive'}`}>
                        {service.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <div className="actions-group">
                        <Link to={`/service/${service.id}`} className="action-btn view-btn">
                          <span className="action-icon">👁️</span>
                        </Link>
                        <Link to={`/edit-service/${service.id}`} className="action-btn edit-btn">
                          <span className="action-icon">✏️</span>
                        </Link>
                        <button 
                          className={`action-btn ${service.active ? 'pause-btn' : 'activate-btn'}`}
                          onClick={() => handleToggleServiceStatus(service.id, service.active)}
                        >
                          <span className="action-icon">{service.active ? '⏸️' : '▶️'}</span>
                        </button>
                        <button 
                          className="action-btn delete-btn"
                          onClick={() => handleDeleteService(service.id)}
                        >
                          <span className="action-icon">🗑️</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-content">
              <h2 className="empty-state-title">No services yet</h2>
              <p className="empty-state-message">
                Start offering your services to clients from around the world!
              </p>
              <Link to="/create-service" className="btn btn-primary">
                Create Your First Service
              </Link>
            </div>
          </div>
        )}
      </div>
      
      <style jsx>{`
        .my-services-page {
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
        
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        
        .page-title {
          font-size: 2rem;
          font-weight: 700;
          margin: 0;
          color: var(--text-dark);
        }
        
        .services-table-container {
          background-color: white;
          border-radius: var(--radius);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          overflow: hidden;
        }
        
        .services-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .services-table th,
        .services-table td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid var(--border-color);
        }
        
        .services-table th {
          font-weight: 600;
          color: var(--text-dark);
          background-color: var(--background-light);
        }
        
        .service-cell {
          min-width: 250px;
        }
        
        .service-info {
          display: flex;
          align-items: center;
        }
        
        .service-image {
          width: 60px;
          height: 45px;
          border-radius: var(--radius);
          overflow: hidden;
          margin-right: 0.75rem;
        }
        
        .service-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .service-title {
          font-weight: 500;
        }
        
        .price-cell {
          font-weight: 600;
        }
        
        .status-badge {
          display: inline-block;
          padding: 0.4em 0.65em;
          font-size: 0.75em;
          font-weight: 700;
          border-radius: 50px;
        }
        
        .status-active {
          background-color: rgba(34, 197, 94, 0.1);
          color: #22c55e;
        }
        
        .status-inactive {
          background-color: rgba(234, 179, 8, 0.1);
          color: #eab308;
        }
        
        .actions-cell {
          min-width: 160px;
        }
        
        .actions-group {
          display: flex;
          gap: 0.5rem;
        }
        
        .action-btn {
          width: 32px;
          height: 32px;
          border-radius: var(--radius);
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--background-light);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .view-btn:hover {
          background-color: rgba(37, 99, 235, 0.1);
          color: #2563eb;
        }
        
        .edit-btn:hover {
          background-color: rgba(234, 179, 8, 0.1);
          color: #eab308;
        }
        
        .pause-btn:hover,
        .activate-btn:hover {
          background-color: rgba(217, 70, 239, 0.1);
          color: #d946ef;
        }
        
        .delete-btn:hover {
          background-color: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }
        
        .empty-state {
          background-color: white;
          border-radius: var(--radius);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          padding: 3rem;
        }
        
        .empty-state-content {
          max-width: 500px;
          margin: 0 auto;
          text-align: center;
        }
        
        .empty-state-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 0 1rem;
          color: var(--text-dark);
        }
        
        .empty-state-message {
          color: var(--text-light);
          margin-bottom: 2rem;
        }
        
        .loading-spinner {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 300px;
        }
        
        @media (max-width: 992px) {
          .services-table-container {
            overflow-x: auto;
          }
        }
        
        @media (max-width: 576px) {
          .page-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default MyServices;
