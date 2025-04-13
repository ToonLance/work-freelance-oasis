
import { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import Navbar from '../components/Navbar';

const Orders = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active');
  
  // Mock orders data
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
    },
    {
      id: 'o4',
      service: {
        id: 's4',
        title: "Promotional Video",
        image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      },
      buyer: {
        id: 'u4',
        name: "Emma Wilson",
        avatar: "https://randomuser.me/api/portraits/women/63.jpg"
      },
      status: "completed",
      price: 85,
      dueDate: "2025-04-08",
      createdAt: "2025-04-01",
      completedAt: "2025-04-07"
    },
    {
      id: 'o5',
      service: {
        id: 's5',
        title: "Social Media Management",
        image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      },
      buyer: {
        id: 'u5',
        name: "Michael Brown",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg"
      },
      status: "cancelled",
      price: 60,
      dueDate: "2025-04-15",
      createdAt: "2025-04-03",
      cancelledAt: "2025-04-05"
    }
  ];
  
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      
      try {
        // In a real app, fetch from Firestore
        // const ordersRef = collection(db, "orders");
        // const q = query(ordersRef, where("sellerId", "==", user.uid));
        // const querySnapshot = await getDocs(q);
        
        // const ordersData = [];
        // querySnapshot.forEach((doc) => {
        //   ordersData.push({
        //     id: doc.id,
        //     ...doc.data()
        //   });
        // });
        
        // setOrders(ordersData);
        
        // For demo, use mock data
        setOrders(mockOrders);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [user]);
  
  const filteredOrders = orders.filter(order => {
    if (activeTab === 'active') {
      return ['in_progress', 'review'].includes(order.status);
    } else if (activeTab === 'completed') {
      return order.status === 'completed';
    } else if (activeTab === 'cancelled') {
      return order.status === 'cancelled';
    }
    return false;
  });
  
  const getOrdersCount = (status) => {
    if (status === 'active') {
      return orders.filter(order => ['in_progress', 'review'].includes(order.status)).length;
    } else {
      return orders.filter(order => order.status === status).length;
    }
  };
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="orders-page">
      <Navbar user={user} />
      
      <div className="container py-5">
        <div className="page-header">
          <h1 className="page-title">My Orders</h1>
        </div>
        
        <div className="orders-tabs">
          <button 
            className={`tab-button ${activeTab === 'active' ? 'active' : ''}`}
            onClick={() => setActiveTab('active')}
          >
            Active
            <span className="tab-count">{getOrdersCount('active')}</span>
          </button>
          <button 
            className={`tab-button ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            Completed
            <span className="tab-count">{getOrdersCount('completed')}</span>
          </button>
          <button 
            className={`tab-button ${activeTab === 'cancelled' ? 'active' : ''}`}
            onClick={() => setActiveTab('cancelled')}
          >
            Cancelled
            <span className="tab-count">{getOrdersCount('cancelled')}</span>
          </button>
        </div>
        
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : filteredOrders.length > 0 ? (
          <div className="orders-grid">
            {filteredOrders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-id">Order #{order.id}</div>
                  <div className={`order-status status-${order.status}`}>
                    {order.status === 'in_progress' ? 'In Progress' : 
                     order.status === 'review' ? 'In Review' : 
                     order.status === 'completed' ? 'Completed' : 'Cancelled'}
                  </div>
                </div>
                
                <div className="order-service">
                  <div className="service-image">
                    <img src={order.service.image} alt={order.service.title} />
                  </div>
                  <div className="service-info">
                    <Link to={`/service/${order.service.id}`} className="service-title">
                      {order.service.title}
                    </Link>
                    <div className="service-price">${order.price}</div>
                  </div>
                </div>
                
                <div className="order-details">
                  <div className="detail-item">
                    <div className="detail-label">Buyer</div>
                    <div className="detail-value">
                      <div className="buyer-info">
                        <div className="buyer-avatar">
                          <img src={order.buyer.avatar} alt={order.buyer.name} />
                        </div>
                        <span className="buyer-name">{order.buyer.name}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="detail-item">
                    <div className="detail-label">Created</div>
                    <div className="detail-value">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="detail-item">
                    <div className="detail-label">Due Date</div>
                    <div className="detail-value">
                      {order.status !== 'cancelled' ? new Date(order.dueDate).toLocaleDateString() : '-'}
                    </div>
                  </div>
                  
                  {order.status === 'completed' && (
                    <div className="detail-item">
                      <div className="detail-label">Completed</div>
                      <div className="detail-value">
                        {new Date(order.completedAt).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                  
                  {order.status === 'cancelled' && (
                    <div className="detail-item">
                      <div className="detail-label">Cancelled</div>
                      <div className="detail-value">
                        {new Date(order.cancelledAt).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="order-actions">
                  <Link to={`/order/${order.id}`} className="btn btn-primary btn-full">
                    View Order
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-content">
              <h2 className="empty-state-title">No {activeTab} orders</h2>
              <p className="empty-state-message">
                {activeTab === 'active' ? (
                  "You don't have any active orders at the moment."
                ) : activeTab === 'completed' ? (
                  "You haven't completed any orders yet."
                ) : (
                  "No cancelled orders to display."
                )}
              </p>
            </div>
          </div>
        )}
      </div>
      
      <style jsx>{`
        .orders-page {
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
          margin-bottom: 2rem;
        }
        
        .page-title {
          font-size: 2rem;
          font-weight: 700;
          margin: 0;
          color: var(--text-dark);
        }
        
        .orders-tabs {
          display: flex;
          background-color: white;
          border-radius: var(--radius);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          margin-bottom: 2rem;
          overflow: hidden;
        }
        
        .tab-button {
          flex: 1;
          padding: 1rem;
          font-weight: 500;
          text-align: center;
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }
        
        .tab-button.active {
          border-bottom-color: var(--primary);
          color: var(--primary);
        }
        
        .tab-count {
          display: inline-block;
          margin-left: 0.5rem;
          background-color: var(--background-light);
          color: var(--text-dark);
          font-size: 0.85em;
          padding: 0.15em 0.5em;
          border-radius: 50px;
        }
        
        .tab-button.active .tab-count {
          background-color: var(--primary-light);
          color: white;
        }
        
        .orders-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1.5rem;
        }
        
        .order-card {
          background-color: white;
          border-radius: var(--radius);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          padding: 1.5rem;
        }
        
        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--border-color);
        }
        
        .order-id {
          font-weight: 600;
          color: var(--text-dark);
        }
        
        .order-status {
          display: inline-block;
          padding: 0.4em 0.65em;
          font-size: 0.8em;
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
        
        .order-service {
          display: flex;
          align-items: center;
          margin-bottom: 1.25rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--border-color);
        }
        
        .service-image {
          width: 80px;
          height: 60px;
          border-radius: var(--radius);
          overflow: hidden;
          margin-right: 1rem;
        }
        
        .service-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .service-info {
          flex: 1;
        }
        
        .service-title {
          display: block;
          font-size: 1.05rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--text-dark);
          text-decoration: none;
        }
        
        .service-title:hover {
          color: var(--primary);
        }
        
        .service-price {
          font-weight: 600;
          color: var(--secondary);
        }
        
        .order-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }
        
        .detail-label {
          font-size: 0.85rem;
          color: var(--text-light);
          margin-bottom: 0.25rem;
        }
        
        .detail-value {
          font-weight: 500;
        }
        
        .buyer-info {
          display: flex;
          align-items: center;
        }
        
        .buyer-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 0.5rem;
        }
        
        .buyer-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .btn-full {
          width: 100%;
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
          margin-bottom: 0;
        }
        
        .loading-spinner {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 300px;
        }
        
        @media (max-width: 576px) {
          .orders-grid {
            grid-template-columns: 1fr;
          }
          
          .order-details {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Orders;
