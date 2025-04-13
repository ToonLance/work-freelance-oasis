
import { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import Navbar from '../components/Navbar';

const Dashboard = ({ user }) => {
  const [stats, setStats] = useState({
    activeOrders: 0,
    completedOrders: 0,
    earnings: 0,
    activeServices: 0
  });
  
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Mock data
  const mockOrders = [
    {
      id: 'o1',
      service: {
        id: 's1',
        title: "Logo Design",
        image: "https://images.unsplash.com/photo-1600081728723-c8aa2ee3344f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      },
      buyer: {
        id: 'u1',
        name: "John Doe",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      status: "in_progress",
      price: 50,
      dueDate: "2025-04-20",
      createdAt: "2025-04-15"
    },
    {
      id: 'o2',
      service: {
        id: 's2',
        title: "Website Development",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      },
      buyer: {
        id: 'u2',
        name: "Alice Smith",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      status: "review",
      price: 120,
      dueDate: "2025-04-25",
      createdAt: "2025-04-10"
    },
    {
      id: 'o3',
      service: {
        id: 's3',
        title: "Content Writing",
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      },
      buyer: {
        id: 'u3',
        name: "Robert Johnson",
        avatar: "https://randomuser.me/api/portraits/men/67.jpg"
      },
      status: "completed",
      price: 35,
      dueDate: "2025-04-12",
      createdAt: "2025-04-05",
      completedAt: "2025-04-12"
    }
  ];
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;
      
      try {
        // In a real app, fetch from Firestore
        // const userRef = doc(db, "users", user.uid);
        
        // const activeOrdersQuery = query(
        //   collection(db, "orders"),
        //   where("sellerId", "==", user.uid),
        //   where("status", "in", ["in_progress", "review"])
        // );
        
        // const completedOrdersQuery = query(
        //   collection(db, "orders"),
        //   where("sellerId", "==", user.uid),
        //   where("status", "==", "completed")
        // );
        
        // const servicesQuery = query(
        //   collection(db, "services"),
        //   where("sellerId", "==", user.uid),
        //   where("active", "==", true)
        // );
        
        // const [activeOrdersSnapshot, completedOrdersSnapshot, servicesSnapshot] = await Promise.all([
        //   getDocs(activeOrdersQuery),
        //   getDocs(completedOrdersQuery),
        //   getDocs(servicesQuery)
        // ]);
        
        // let totalEarnings = 0;
        // completedOrdersSnapshot.forEach(doc => {
        //   totalEarnings += doc.data().price;
        // });
        
        // const recentOrdersQuery = query(
        //   collection(db, "orders"),
        //   where("sellerId", "==", user.uid),
        //   orderBy("createdAt", "desc"),
        //   limit(5)
        // );
        
        // const recentOrdersSnapshot = await getDocs(recentOrdersQuery);
        // const recentOrdersData = [];
        // recentOrdersSnapshot.forEach(doc => {
        //   recentOrdersData.push({
        //     id: doc.id,
        //     ...doc.data()
        //   });
        // });
        
        // setStats({
        //   activeOrders: activeOrdersSnapshot.size,
        //   completedOrders: completedOrdersSnapshot.size,
        //   earnings: totalEarnings,
        //   activeServices: servicesSnapshot.size
        // });
        
        // setRecentOrders(recentOrdersData);
        
        // For demo, use mock data
        setStats({
          activeOrders: 2,
          completedOrders: 5,
          earnings: 450,
          activeServices: 3
        });
        
        setRecentOrders(mockOrders);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [user]);
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="dashboard-page">
      <Navbar user={user} />
      
      <div className="container py-5">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Dashboard</h1>
          <Link to="/create-service" className="btn btn-primary">
            Create New Service
          </Link>
        </div>
        
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon active-orders-icon">
              <span>📋</span>
            </div>
            <div className="stat-content">
              <h2 className="stat-value">{stats.activeOrders}</h2>
              <p className="stat-label">Active Orders</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon completed-orders-icon">
              <span>✓</span>
            </div>
            <div className="stat-content">
              <h2 className="stat-value">{stats.completedOrders}</h2>
              <p className="stat-label">Completed Orders</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon earnings-icon">
              <span>💰</span>
            </div>
            <div className="stat-content">
              <h2 className="stat-value">${stats.earnings}</h2>
              <p className="stat-label">Total Earnings</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon services-icon">
              <span>🛍️</span>
            </div>
            <div className="stat-content">
              <h2 className="stat-value">{stats.activeServices}</h2>
              <p className="stat-label">Active Services</p>
            </div>
          </div>
        </div>
        
        <div className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">Recent Orders</h2>
            <Link to="/orders" className="btn btn-outline btn-sm">
              View All
            </Link>
          </div>
          
          {loading ? (
            <div className="loading-spinner">Loading...</div>
          ) : recentOrders.length > 0 ? (
            <div className="orders-table-container">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Buyer</th>
                    <th>Due Date</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order.id}>
                      <td className="service-cell">
                        <div className="service-info">
                          <div className="service-image">
                            <img src={order.service.image} alt={order.service.title} />
                          </div>
                          <span className="service-title">{order.service.title}</span>
                        </div>
                      </td>
                      <td className="buyer-cell">
                        <div className="buyer-info">
                          <div className="buyer-avatar">
                            <img src={order.buyer.avatar} alt={order.buyer.name} />
                          </div>
                          <span className="buyer-name">{order.buyer.name}</span>
                        </div>
                      </td>
                      <td className="due-date-cell">
                        {new Date(order.dueDate).toLocaleDateString()}
                      </td>
                      <td className="price-cell">${order.price}</td>
                      <td className="status-cell">
                        <span className={`status-badge status-${order.status}`}>
                          {order.status === 'in_progress' ? 'In Progress' : 
                           order.status === 'review' ? 'In Review' : 
                           order.status === 'completed' ? 'Completed' : order.status}
                        </span>
                      </td>
                      <td className="actions-cell">
                        <Link to={`/order/${order.id}`} className="btn btn-outline btn-xs">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <p>No orders yet.</p>
            </div>
          )}
        </div>
      </div>
      
      <style jsx>{`
        .dashboard-page {
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
        
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        
        .dashboard-title {
          font-size: 2rem;
          font-weight: 700;
          margin: 0;
          color: var(--text-dark);
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }
        
        .stat-card {
          background-color: white;
          border-radius: var(--radius);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          padding: 1.5rem;
          display: flex;
          align-items: center;
        }
        
        .stat-icon {
          width: 60px;
          height: 60px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 1.25rem;
          font-size: 1.75rem;
        }
        
        .active-orders-icon {
          background-color: rgba(37, 99, 235, 0.1);
          color: #2563eb;
        }
        
        .completed-orders-icon {
          background-color: rgba(34, 197, 94, 0.1);
          color: #22c55e;
        }
        
        .earnings-icon {
          background-color: rgba(234, 179, 8, 0.1);
          color: #eab308;
        }
        
        .services-icon {
          background-color: rgba(217, 70, 239, 0.1);
          color: #d946ef;
        }
        
        .stat-content {
          flex: 1;
        }
        
        .stat-value {
          font-size: 1.75rem;
          font-weight: 700;
          margin: 0 0 0.25rem;
          color: var(--text-dark);
        }
        
        .stat-label {
          font-size: 0.95rem;
          color: var(--text-light);
          margin: 0;
        }
        
        .dashboard-section {
          background-color: white;
          border-radius: var(--radius);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          padding: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        
        .section-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0;
          color: var(--text-dark);
        }
        
        .btn-sm {
          padding: 0.4rem 0.75rem;
          font-size: 0.85rem;
        }
        
        .btn-xs {
          padding: 0.25rem 0.5rem;
          font-size: 0.75rem;
        }
        
        .orders-table-container {
          overflow-x: auto;
        }
        
        .orders-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .orders-table th,
        .orders-table td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid var(--border-color);
        }
        
        .orders-table th {
          font-weight: 600;
          color: var(--text-dark);
          background-color: var(--background-light);
        }
        
        .service-cell,
        .buyer-cell {
          min-width: 200px;
        }
        
        .service-info,
        .buyer-info {
          display: flex;
          align-items: center;
        }
        
        .service-image {
          width: 50px;
          height: 40px;
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
        
        .buyer-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 0.75rem;
        }
        
        .buyer-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .buyer-name {
          font-weight: 500;
        }
        
        .status-badge {
          display: inline-block;
          padding: 0.4em 0.65em;
          font-size: 0.75em;
          font-weight: 700;
          border-radius: 50px;
        }
        
        .status-in_progress {
          background-color: rgba(37, 99, 235, 0.1);
          color: #2563eb;
        }
        
        .status-review {
          background-color: rgba(234, 179, 8, 0.1);
          color: #eab308;
        }
        
        .status-completed {
          background-color: rgba(34, 197, 94, 0.1);
          color: #22c55e;
        }
        
        .status-cancelled {
          background-color: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }
        
        .empty-state {
          text-align: center;
          padding: 3rem 0;
          color: var(--text-light);
        }
        
        .loading-spinner {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 200px;
        }
        
        @media (max-width: 992px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 576px) {
          .dashboard-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .section-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .orders-table th,
          .orders-table td {
            padding: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
