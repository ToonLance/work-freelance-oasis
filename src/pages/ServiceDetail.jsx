
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import Navbar from '../components/Navbar';

const ServiceDetail = ({ user }) => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState('basic');
  
  // Mock service data
  const mockService = {
    id: '1',
    title: "I will design a modern logo for your business",
    description: "I'll create a unique, modern, and memorable logo for your brand. My designs are creative, professional, and tailored to your specific needs. I focus on clean, minimalist designs that effectively communicate your brand's values and identity.",
    price: {
      basic: 50,
      standard: 80,
      premium: 120
    },
    deliveryTime: {
      basic: 2,
      standard: 3,
      premium: 4
    },
    revisions: {
      basic: 1,
      standard: 3,
      premium: "Unlimited"
    },
    rating: 4.9,
    ratingCount: 321,
    category: "Graphics & Design",
    subCategory: "Logo Design",
    tags: ["logo", "design", "branding", "minimalist", "modern"],
    images: [
      "https://images.unsplash.com/photo-1600081728723-c8aa2ee3344f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1589561253898-768105ca91a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    ],
    seller: {
      id: 'u1',
      name: "Jane Cooper",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
      level: "Top Rated Seller",
      rating: 4.9,
      ratingCount: 456,
      description: "Professional graphic designer with over 8 years of experience. Specializing in logo design, branding, and digital illustrations.",
      responseTime: "1 hour",
      languages: ["English", "Spanish"],
      location: "United States",
      memberSince: "Jan 2020",
      lastDelivery: "1 day ago"
    },
    packages: {
      basic: {
        name: "Basic Package",
        description: "For small businesses just starting out",
        features: [
          "1 Concept Design",
          "Logo File (JPG, PNG)",
          "High Resolution",
          "1 Revision",
          "2 Days Delivery"
        ]
      },
      standard: {
        name: "Standard Package",
        description: "For established businesses looking to rebrand",
        features: [
          "2 Concept Designs",
          "All Logo Files (JPG, PNG, SVG, PDF)",
          "High Resolution",
          "Source File",
          "3 Revisions",
          "3 Days Delivery"
        ]
      },
      premium: {
        name: "Premium Package",
        description: "Complete branding package for serious businesses",
        features: [
          "3 Concept Designs",
          "All Logo Files (JPG, PNG, SVG, PDF)",
          "High Resolution",
          "Source File",
          "Unlimited Revisions",
          "4 Days Delivery",
          "Business Card Design",
          "Social Media Kit"
        ]
      }
    },
    faqs: [
      {
        question: "Do I get the source files?",
        answer: "Yes, with standard and premium packages you get the source file (AI, PSD) which allows you to make edits yourself if needed."
      },
      {
        question: "How many revisions do I get?",
        answer: "It depends on the package. Basic includes 1 revision, Standard includes 3 revisions, and Premium includes unlimited revisions."
      },
      {
        question: "What if I'm not satisfied with the design?",
        answer: "Satisfaction is guaranteed! If you're not happy with the initial designs, I'll work with you until you're satisfied within the revision limit of your package."
      },
      {
        question: "What information do you need to get started?",
        answer: "I'll need your business name, what your business does, any specific colors or styles you prefer, and any existing branding materials if you have them."
      }
    ],
    reviews: [
      {
        id: 'r1',
        user: {
          name: "Thomas Johnson",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          country: "United Kingdom"
        },
        rating: 5,
        date: "October 15, 2024",
        comment: "Exceptional work! Jane delivered a logo that perfectly captures our brand's essence. Communication was smooth and she was very receptive to feedback."
      },
      {
        id: 'r2',
        user: {
          name: "Sarah Miller",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg",
          country: "Canada"
        },
        rating: 5,
        date: "October 10, 2024",
        comment: "Very impressed with the quality of work. Jane is professional, timely, and has an amazing eye for design."
      },
      {
        id: 'r3',
        user: {
          name: "Michael Rodriguez",
          avatar: "https://randomuser.me/api/portraits/men/67.jpg",
          country: "Australia"
        },
        rating: 4,
        date: "October 5, 2024",
        comment: "Good experience overall. The initial design needed some adjustments but Jane was responsive and made all the changes I requested."
      }
    ]
  };
  
  useEffect(() => {
    const fetchService = async () => {
      try {
        // In a real app, fetch from Firestore
        // const docRef = doc(db, "services", id);
        // const docSnap = await getDoc(docRef);
        // if (docSnap.exists()) {
        //   setService({ id: docSnap.id, ...docSnap.data() });
        // }
        
        // For demo, use mock data
        setService(mockService);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching service:", error);
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);
  
  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }
  
  if (!service) {
    return <div className="not-found">Service not found</div>;
  }
  
  return (
    <div className="service-detail-page">
      <Navbar user={user} />
      
      <div className="container py-5">
        <div className="breadcrumb">
          <Link to="/">Home</Link> / 
          <Link to={`/services?category=${service.category.toLowerCase().replace(/\s+/g, '-')}`}> 
            {service.category}
          </Link> / 
          <span>{service.title}</span>
        </div>
        
        <div className="service-overview">
          <div className="service-gallery">
            <div className="main-image">
              <img src={service.images[0]} alt={service.title} />
            </div>
            <div className="image-thumbnails">
              {service.images.map((image, index) => (
                <div key={index} className="thumbnail">
                  <img src={image} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
          
          <div className="service-info">
            <h1 className="service-title">{service.title}</h1>
            
            <div className="seller-overview">
              <div className="seller-avatar">
                <img src={service.seller.avatar} alt={service.seller.name} />
              </div>
              <div className="seller-info">
                <h3 className="seller-name">{service.seller.name}</h3>
                <div className="seller-level">{service.seller.level}</div>
              </div>
              <div className="seller-rating">
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={star <= Math.floor(service.rating) ? "star filled" : "star"}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="rating-text">{service.rating}</span>
                <span className="rating-count">({service.ratingCount})</span>
              </div>
            </div>
            
            <div className="package-selector">
              <div className="package-tabs">
                <button 
                  className={`package-tab ${selectedPackage === 'basic' ? 'active' : ''}`}
                  onClick={() => setSelectedPackage('basic')}
                >
                  Basic
                </button>
                <button 
                  className={`package-tab ${selectedPackage === 'standard' ? 'active' : ''}`}
                  onClick={() => setSelectedPackage('standard')}
                >
                  Standard
                </button>
                <button 
                  className={`package-tab ${selectedPackage === 'premium' ? 'active' : ''}`}
                  onClick={() => setSelectedPackage('premium')}
                >
                  Premium
                </button>
              </div>
              
              <div className="package-details">
                <div className="package-header">
                  <h3 className="package-name">{service.packages[selectedPackage].name}</h3>
                  <p className="package-price">${service.price[selectedPackage]}</p>
                </div>
                <p className="package-description">{service.packages[selectedPackage].description}</p>
                
                <div className="package-delivery">
                  <span className="delivery-icon">⏱️</span>
                  <span className="delivery-text">
                    {service.deliveryTime[selectedPackage]} {service.deliveryTime[selectedPackage] === 1 ? 'day' : 'days'} delivery
                  </span>
                </div>
                
                <div className="package-features">
                  {service.packages[selectedPackage].features.map((feature, index) => (
                    <div key={index} className="feature">
                      <span className="feature-icon">✓</span>
                      <span className="feature-text">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button className="btn btn-primary btn-full">
                  Continue (${service.price[selectedPackage]})
                </button>
                
                <div className="contact-seller">
                  <button className="btn btn-outline btn-full">Contact Seller</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="service-details">
          <div className="details-main">
            <section className="details-section">
              <h2 className="section-title">About This Service</h2>
              <p className="service-description">{service.description}</p>
            </section>
            
            <section className="details-section">
              <h2 className="section-title">About The Seller</h2>
              <div className="seller-profile">
                <div className="seller-header">
                  <div className="seller-avatar-lg">
                    <img src={service.seller.avatar} alt={service.seller.name} />
                  </div>
                  <div className="seller-header-info">
                    <h3 className="seller-name">{service.seller.name}</h3>
                    <p className="seller-tagline">{service.seller.description.split('.')[0]}</p>
                    <div className="seller-rating">
                      <div className="stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className={star <= Math.floor(service.seller.rating) ? "star filled" : "star"}>
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="rating-text">{service.seller.rating}</span>
                      <span className="rating-count">({service.seller.ratingCount})</span>
                    </div>
                    <Link to={`/profile/${service.seller.id}`} className="btn btn-outline btn-sm">
                      View Profile
                    </Link>
                  </div>
                </div>
                
                <div className="seller-stats">
                  <div className="stat">
                    <div className="stat-label">From</div>
                    <div className="stat-value">{service.seller.location}</div>
                  </div>
                  <div className="stat">
                    <div className="stat-label">Member since</div>
                    <div className="stat-value">{service.seller.memberSince}</div>
                  </div>
                  <div className="stat">
                    <div className="stat-label">Response time</div>
                    <div className="stat-value">{service.seller.responseTime}</div>
                  </div>
                  <div className="stat">
                    <div className="stat-label">Last delivery</div>
                    <div className="stat-value">{service.seller.lastDelivery}</div>
                  </div>
                  <div className="stat">
                    <div className="stat-label">Languages</div>
                    <div className="stat-value">{service.seller.languages.join(', ')}</div>
                  </div>
                </div>
                
                <p className="seller-bio">{service.seller.description}</p>
              </div>
            </section>
            
            <section className="details-section">
              <h2 className="section-title">FAQ</h2>
              <div className="faq-container">
                {service.faqs.map((faq, index) => (
                  <div key={index} className="faq-item">
                    <h3 className="faq-question">{faq.question}</h3>
                    <p className="faq-answer">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
            
            <section className="details-section">
              <div className="reviews-header">
                <h2 className="section-title">Reviews</h2>
                <div className="reviews-summary">
                  <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={star <= Math.floor(service.rating) ? "star filled" : "star"}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="rating-text">{service.rating}</span>
                  <span className="rating-count">({service.ratingCount} reviews)</span>
                </div>
              </div>
              
              <div className="reviews-container">
                {service.reviews.map((review) => (
                  <div key={review.id} className="review-item">
                    <div className="review-header">
                      <div className="reviewer-avatar">
                        <img src={review.user.avatar} alt={review.user.name} />
                      </div>
                      <div className="reviewer-info">
                        <h4 className="reviewer-name">{review.user.name}</h4>
                        <div className="reviewer-country">{review.user.country}</div>
                      </div>
                    </div>
                    
                    <div className="review-rating">
                      <div className="stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className={star <= review.rating ? "star filled" : "star"}>
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="review-date">{review.date}</span>
                    </div>
                    
                    <p className="review-comment">{review.comment}</p>
                  </div>
                ))}
                
                <div className="reviews-more">
                  <button className="btn btn-outline">See More Reviews</button>
                </div>
              </div>
            </section>
          </div>
          
          <div className="details-sidebar">
            <div className="sticky-package">
              <div className="package-tabs">
                <button 
                  className={`package-tab ${selectedPackage === 'basic' ? 'active' : ''}`}
                  onClick={() => setSelectedPackage('basic')}
                >
                  Basic
                </button>
                <button 
                  className={`package-tab ${selectedPackage === 'standard' ? 'active' : ''}`}
                  onClick={() => setSelectedPackage('standard')}
                >
                  Standard
                </button>
                <button 
                  className={`package-tab ${selectedPackage === 'premium' ? 'active' : ''}`}
                  onClick={() => setSelectedPackage('premium')}
                >
                  Premium
                </button>
              </div>
              
              <div className="sticky-package-details">
                <div className="package-header">
                  <h3 className="package-name">{service.packages[selectedPackage].name}</h3>
                  <p className="package-price">${service.price[selectedPackage]}</p>
                </div>
                <p className="package-description">{service.packages[selectedPackage].description}</p>
                
                <div className="package-delivery">
                  <span className="delivery-icon">⏱️</span>
                  <span className="delivery-text">
                    {service.deliveryTime[selectedPackage]} {service.deliveryTime[selectedPackage] === 1 ? 'day' : 'days'} delivery
                  </span>
                </div>
                
                <div className="package-features">
                  {service.packages[selectedPackage].features.map((feature, index) => (
                    <div key={index} className="feature">
                      <span className="feature-icon">✓</span>
                      <span className="feature-text">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button className="btn btn-primary btn-full">
                  Continue (${service.price[selectedPackage]})
                </button>
                
                <div className="contact-seller">
                  <button className="btn btn-outline btn-full">Contact Seller</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .service-detail-page {
          background-color: var(--background-light);
          min-height: 100vh;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        .breadcrumb {
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
          color: var(--text-light);
        }
        
        .breadcrumb a {
          color: var(--text-light);
          text-decoration: none;
          margin: 0 0.5rem;
        }
        
        .breadcrumb a:first-child {
          margin-left: 0;
        }
        
        .breadcrumb a:hover {
          color: var(--primary);
        }
        
        .service-overview {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 3rem;
        }
        
        .service-gallery {
          display: flex;
          flex-direction: column;
        }
        
        .main-image {
          width: 100%;
          height: 400px;
          border-radius: var(--radius);
          overflow: hidden;
          margin-bottom: 1rem;
        }
        
        .main-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .image-thumbnails {
          display: flex;
          gap: 0.5rem;
          overflow-x: auto;
        }
        
        .thumbnail {
          width: 100px;
          height: 80px;
          flex-shrink: 0;
          border-radius: var(--radius);
          overflow: hidden;
          cursor: pointer;
        }
        
        .thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .service-info {
          background-color: white;
          border-radius: var(--radius);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          padding: 2rem;
        }
        
        .service-title {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--text-dark);
        }
        
        .seller-overview {
          display: flex;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--border-color);
        }
        
        .seller-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 0.75rem;
        }
        
        .seller-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .seller-info {
          margin-right: 1.5rem;
        }
        
        .seller-name {
          font-size: 1rem;
          font-weight: 600;
          margin: 0;
        }
        
        .seller-level {
          font-size: 0.85rem;
          color: var(--text-light);
        }
        
        .seller-rating {
          display: flex;
          align-items: center;
          margin-left: auto;
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
        
        .package-selector {
          margin-bottom: 1.5rem;
        }
        
        .package-tabs {
          display: flex;
          margin-bottom: 1.5rem;
        }
        
        .package-tab {
          flex: 1;
          padding: 0.75rem;
          font-weight: 500;
          text-align: center;
          border-bottom: 2px solid var(--border-color);
          background: none;
          transition: all 0.3s ease;
        }
        
        .package-tab.active {
          border-bottom-color: var(--primary);
          color: var(--primary);
        }
        
        .package-details {
          margin-bottom: 1.5rem;
        }
        
        .package-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }
        
        .package-name {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0;
        }
        
        .package-price {
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0;
        }
        
        .package-description {
          color: var(--text-light);
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
        }
        
        .package-delivery {
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        
        .delivery-icon {
          margin-right: 0.5rem;
        }
        
        .delivery-text {
          font-weight: 500;
        }
        
        .package-features {
          margin-bottom: 1.5rem;
        }
        
        .feature {
          display: flex;
          margin-bottom: 0.75rem;
        }
        
        .feature-icon {
          color: var(--success);
          margin-right: 0.5rem;
        }
        
        .btn-full {
          width: 100%;
        }
        
        .contact-seller {
          margin-top: 1rem;
        }
        
        .btn-sm {
          padding: 0.4rem 0.75rem;
          font-size: 0.85rem;
        }
        
        /* Service Details */
        .service-details {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
        }
        
        .details-main {
          background-color: white;
          border-radius: var(--radius);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          padding: 2rem;
        }
        
        .details-section {
          margin-bottom: 3rem;
        }
        
        .details-section:last-child {
          margin-bottom: 0;
        }
        
        .section-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: var(--text-dark);
        }
        
        .service-description {
          line-height: 1.7;
          color: var(--text-dark);
        }
        
        .seller-profile {
          margin-bottom: 1.5rem;
        }
        
        .seller-header {
          display: flex;
          margin-bottom: 1.5rem;
        }
        
        .seller-avatar-lg {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 1.5rem;
        }
        
        .seller-avatar-lg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .seller-header-info {
          flex: 1;
        }
        
        .seller-tagline {
          color: var(--text-light);
          margin: 0.5rem 0 1rem;
        }
        
        .seller-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-color);
        }
        
        .stat {
          min-width: 120px;
        }
        
        .stat-label {
          font-size: 0.9rem;
          color: var(--text-light);
          margin-bottom: 0.25rem;
        }
        
        .stat-value {
          font-weight: 500;
        }
        
        .seller-bio {
          line-height: 1.7;
          color: var(--text-dark);
        }
        
        .faq-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .faq-question {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--text-dark);
        }
        
        .faq-answer {
          color: var(--text-light);
          line-height: 1.7;
        }
        
        .reviews-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        
        .reviews-summary {
          display: flex;
          align-items: center;
        }
        
        .reviews-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .review-item {
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-color);
        }
        
        .review-header {
          display: flex;
          align-items: center;
          margin-bottom: 0.75rem;
        }
        
        .reviewer-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 1rem;
        }
        
        .reviewer-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .reviewer-name {
          font-weight: 600;
          margin: 0 0 0.25rem 0;
        }
        
        .reviewer-country {
          font-size: 0.9rem;
          color: var(--text-light);
        }
        
        .review-rating {
          display: flex;
          align-items: center;
          margin-bottom: 0.75rem;
        }
        
        .review-date {
          margin-left: 0.75rem;
          font-size: 0.9rem;
          color: var(--text-light);
        }
        
        .review-comment {
          line-height: 1.7;
          color: var(--text-dark);
        }
        
        .reviews-more {
          display: flex;
          justify-content: center;
          margin-top: 1.5rem;
        }
        
        .sticky-package {
          position: sticky;
          top: 100px;
          background-color: white;
          border-radius: var(--radius);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          padding: 1.5rem;
        }
        
        .sticky-package-details {
          margin-top: 1.5rem;
        }
        
        @media (max-width: 992px) {
          .service-overview {
            grid-template-columns: 1fr;
          }
          
          .service-details {
            grid-template-columns: 1fr;
          }
          
          .details-sidebar {
            display: none;
          }
        }
        
        @media (max-width: 576px) {
          .main-image {
            height: 250px;
          }
          
          .seller-overview,
          .seller-header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .seller-info,
          .seller-avatar-lg {
            margin-bottom: 1rem;
          }
          
          .seller-rating {
            margin-left: 0;
          }
          
          .reviews-header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .reviews-summary {
            margin-top: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ServiceDetail;
