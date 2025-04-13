
import { Link } from 'react-router-dom';
import { useState } from 'react';

const ServiceCard = ({ service }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const { id, title, price, rating, ratingCount, seller, coverImage, category } = service;
  
  return (
    <div 
      className="service-card card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/service/${id}`} className="service-card-link">
        <div className="service-image">
          <img src={coverImage} alt={title} />
          {isHovered && (
            <div className="quick-view">
              <button className="btn btn-primary">Quick View</button>
            </div>
          )}
        </div>
        
        <div className="service-content">
          <div className="service-seller">
            <div className="seller-avatar">
              <img src={seller.avatar} alt={seller.name} />
            </div>
            <div className="seller-info">
              <p className="seller-name">{seller.name}</p>
              <p className="seller-level">{seller.level}</p>
            </div>
          </div>
          
          <h3 className="service-title">{title}</h3>
          
          <div className="service-rating">
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className={star <= Math.floor(rating) ? "star filled" : "star"}>
                  ★
                </span>
              ))}
            </div>
            <span className="rating-text">{rating}</span>
            <span className="rating-count">({ratingCount})</span>
          </div>
          
          <div className="service-footer">
            <span className="service-price">
              <span className="price-starting">Starting at</span>
              <span className="price-amount">${price}</span>
            </span>
          </div>
        </div>
      </Link>
      
      <style jsx>{`
        .service-card {
          overflow: hidden;
          border: 1px solid var(--border-color);
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .service-card-link {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        
        .service-image {
          position: relative;
          height: 200px;
          overflow: hidden;
        }
        
        .service-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        
        .service-card:hover .service-image img {
          transform: scale(1.05);
        }
        
        .quick-view {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1rem;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
        }
        
        .service-content {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        
        .service-seller {
          display: flex;
          align-items: center;
          margin-bottom: 0.75rem;
        }
        
        .seller-avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 0.5rem;
        }
        
        .seller-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .seller-name {
          font-size: 0.9rem;
          font-weight: 500;
          margin: 0;
        }
        
        .seller-level {
          font-size: 0.8rem;
          color: var(--text-light);
          margin: 0;
        }
        
        .service-title {
          font-size: 1rem;
          font-weight: 500;
          margin: 0 0 0.75rem 0;
          line-height: 1.4;
          flex-grow: 1;
        }
        
        .service-rating {
          display: flex;
          align-items: center;
          margin-bottom: 0.75rem;
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
        
        .service-footer {
          border-top: 1px solid var(--border-color);
          padding-top: 0.75rem;
          margin-top: auto;
        }
        
        .service-price {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        
        .price-starting {
          font-size: 0.8rem;
          color: var(--text-light);
        }
        
        .price-amount {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-dark);
        }
      `}</style>
    </div>
  );
};

export default ServiceCard;
