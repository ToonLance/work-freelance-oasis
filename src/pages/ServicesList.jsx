
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase/config';
import Navbar from '../components/Navbar';
import ServiceCard from '../components/ServiceCard';

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    deliveryTime: '',
    sortBy: 'recommended'
  });
  
  const location = useLocation();
  
  // Mock data for demo
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
    },
    {
      id: '9',
      title: "I will create a corporate identity for your business",
      price: 200,
      rating: 4.9,
      ratingCount: 87,
      category: "Graphics & Design",
      coverImage: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      seller: {
        id: 'u9',
        name: "William Jackson",
        avatar: "https://randomuser.me/api/portraits/men/36.jpg",
        level: "Top Rated Seller"
      }
    },
    {
      id: '10',
      title: "I will translate your content to Spanish",
      price: 30,
      rating: 4.8,
      ratingCount: 352,
      category: "Writing & Translation",
      coverImage: "https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      seller: {
        id: 'u10',
        name: "Isabella Garcia",
        avatar: "https://randomuser.me/api/portraits/women/57.jpg",
        level: "Level 2 Seller"
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
        id: 'u11',
        name: "Ethan Miller",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg",
        level: "Level 2 Seller"
      }
    },
    {
      id: '12',
      title: "I will create professional 3D animations",
      price: 175,
      rating: 4.9,
      ratingCount: 143,
      category: "Video & Animation",
      coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      seller: {
        id: 'u12',
        name: "Charlotte Davis",
        avatar: "https://randomuser.me/api/portraits/women/33.jpg",
        level: "Top Rated Seller"
      }
    }
  ];
  
  const categories = [
    "All Categories",
    "Graphics & Design",
    "Digital Marketing",
    "Writing & Translation",
    "Video & Animation",
    "Programming & Tech",
    "Business"
  ];
  
  const deliveryTimes = [
    "Any",
    "Express 24H",
    "Up to 3 days",
    "Up to 7 days"
  ];
  
  const sortOptions = [
    { value: "recommended", label: "Recommended" },
    { value: "rating", label: "Best Rating" },
    { value: "price_low", label: "Price: Low to High" },
    { value: "price_high", label: "Price: High to Low" }
  ];
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get('category');
    
    if (categoryParam) {
      setFilters(prev => ({
        ...prev,
        category: categoryParam.replace(/-/g, ' ')
      }));
    }
    
    fetchServices();
  }, [location.search]);
  
  const fetchServices = async () => {
    try {
      // In a real app, fetch from Firestore
      // const servicesRef = collection(db, "services");
      // let q = query(servicesRef);
      
      // if (filters.category && filters.category !== 'All Categories') {
      //   q = query(q, where("category", "==", filters.category));
      // }
      
      // if (filters.minPrice) {
      //   q = query(q, where("price", ">=", Number(filters.minPrice)));
      // }
      
      // if (filters.maxPrice) {
      //   q = query(q, where("price", "<=", Number(filters.maxPrice)));
      // }
      
      // if (filters.deliveryTime === 'Express 24H') {
      //   q = query(q, where("deliveryTime", "<=", 1));
      // } else if (filters.deliveryTime === 'Up to 3 days') {
      //   q = query(q, where("deliveryTime", "<=", 3));
      // } else if (filters.deliveryTime === 'Up to 7 days') {
      //   q = query(q, where("deliveryTime", "<=", 7));
      // }
      
      // if (filters.sortBy === 'rating') {
      //   q = query(q, orderBy("rating", "desc"));
      // } else if (filters.sortBy === 'price_low') {
      //   q = query(q, orderBy("price", "asc"));
      // } else if (filters.sortBy === 'price_high') {
      //   q = query(q, orderBy("price", "desc"));
      // } else {
      //   q = query(q, orderBy("featured", "desc"));
      // }
      
      // const querySnapshot = await getDocs(q);
      // const fetchedServices = [];
      // querySnapshot.forEach((doc) => {
      //   fetchedServices.push({
      //     id: doc.id,
      //     ...doc.data()
      //   });
      // });
      
      // setServices(fetchedServices);
      
      // For demo, filter mock data
      let filteredServices = [...mockServices];
      
      if (filters.category && filters.category !== 'All Categories') {
        filteredServices = filteredServices.filter(service => 
          service.category.toLowerCase() === filters.category.toLowerCase()
        );
      }
      
      if (filters.minPrice) {
        filteredServices = filteredServices.filter(service => 
          service.price >= Number(filters.minPrice)
        );
      }
      
      if (filters.maxPrice) {
        filteredServices = filteredServices.filter(service => 
          service.price <= Number(filters.maxPrice)
        );
      }
      
      if (filters.sortBy === 'rating') {
        filteredServices.sort((a, b) => b.rating - a.rating);
      } else if (filters.sortBy === 'price_low') {
        filteredServices.sort((a, b) => a.price - b.price);
      } else if (filters.sortBy === 'price_high') {
        filteredServices.sort((a, b) => b.price - a.price);
      }
      
      setServices(filteredServices);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching services:", error);
      setLoading(false);
    }
  };
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const applyFilters = () => {
    fetchServices();
  };
  
  const resetFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      deliveryTime: '',
      sortBy: 'recommended'
    });
    
    fetchServices();
  };
  
  return (
    <div className="services-page">
      <Navbar />
      
      <div className="services-container">
        <aside className="filters-sidebar">
          <div className="filters-header">
            <h2 className="filters-title">Filters</h2>
            <button className="reset-btn" onClick={resetFilters}>Reset All</button>
          </div>
          
          <div className="filter-group">
            <h3 className="filter-group-title">Category</h3>
            <div className="filter-options">
              {categories.map((category, index) => (
                <label key={index} className="filter-option">
                  <input 
                    type="radio" 
                    name="category" 
                    value={category}
                    checked={filters.category === category}
                    onChange={handleFilterChange}
                  />
                  <span className="option-label">{category}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="filter-group">
            <h3 className="filter-group-title">Budget</h3>
            <div className="price-inputs">
              <div className="price-input-group">
                <span className="currency-symbol">$</span>
                <input 
                  type="number" 
                  name="minPrice"
                  className="price-input"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                />
              </div>
              <span className="price-separator">to</span>
              <div className="price-input-group">
                <span className="currency-symbol">$</span>
                <input 
                  type="number" 
                  name="maxPrice"
                  className="price-input"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
          </div>
          
          <div className="filter-group">
            <h3 className="filter-group-title">Delivery Time</h3>
            <div className="filter-options">
              {deliveryTimes.map((deliveryTime, index) => (
                <label key={index} className="filter-option">
                  <input 
                    type="radio" 
                    name="deliveryTime" 
                    value={deliveryTime}
                    checked={filters.deliveryTime === deliveryTime}
                    onChange={handleFilterChange}
                  />
                  <span className="option-label">{deliveryTime}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="apply-filters">
            <button className="btn btn-primary" onClick={applyFilters}>
              Apply Filters
            </button>
          </div>
        </aside>
        
        <main className="services-content">
          <div className="services-header">
            <h1 className="services-title">
              {filters.category ? filters.category : 'All Services'}
            </h1>
            
            <div className="services-sorting">
              <label htmlFor="sortBy">Sort by:</label>
              <select 
                id="sortBy"
                name="sortBy"
                value={filters.sortBy}
                onChange={handleFilterChange}
                className="sort-select"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {loading ? (
            <div className="loading-spinner">Loading...</div>
          ) : services.length > 0 ? (
            <div className="services-grid">
              {services.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>No services found matching your criteria.</p>
              <button className="btn btn-outline" onClick={resetFilters}>
                Clear Filters
              </button>
            </div>
          )}
        </main>
      </div>
      
      <style jsx>{`
        .services-page {
          background-color: var(--background-light);
          min-height: 100vh;
        }
        
        .services-container {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }
        
        .filters-sidebar {
          background-color: white;
          border-radius: var(--radius);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          padding: 1.5rem;
          height: fit-content;
          position: sticky;
          top: 100px;
        }
        
        .filters-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        
        .filters-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0;
        }
        
        .reset-btn {
          color: var(--primary);
          font-size: 0.9rem;
          font-weight: 500;
          background: none;
          border: none;
        }
        
        .filter-group {
          margin-bottom: 2rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1.5rem;
        }
        
        .filter-group:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }
        
        .filter-group-title {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        
        .filter-options {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        .filter-option {
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        
        .filter-option input {
          margin-right: 0.75rem;
        }
        
        .option-label {
          font-size: 0.95rem;
          color: var(--text-dark);
        }
        
        .price-inputs {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .price-input-group {
          position: relative;
          flex: 1;
        }
        
        .currency-symbol {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-light);
        }
        
        .price-input {
          width: 100%;
          padding: 0.75rem 0.75rem 0.75rem 1.75rem;
          border: 1px solid var(--border-color);
          border-radius: var(--radius);
          font-size: 0.9rem;
        }
        
        .price-separator {
          color: var(--text-light);
        }
        
        .apply-filters {
          margin-top: 2rem;
        }
        
        .services-content {
          flex: 1;
        }
        
        .services-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        
        .services-title {
          font-size: 1.75rem;
          font-weight: 700;
          margin: 0;
        }
        
        .services-sorting {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .sort-select {
          padding: 0.5rem 1rem;
          border: 1px solid var(--border-color);
          border-radius: var(--radius);
          font-size: 0.9rem;
          background-color: white;
        }
        
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        
        .no-results {
          text-align: center;
          padding: 3rem 0;
        }
        
        .loading-spinner {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 300px;
        }
        
        @media (max-width: 992px) {
          .services-container {
            grid-template-columns: 1fr;
          }
          
          .filters-sidebar {
            position: static;
            margin-bottom: 2rem;
          }
        }
        
        @media (max-width: 576px) {
          .services-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .services-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default ServicesList;
