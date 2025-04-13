
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  const { name, icon, url, description } = category;
  
  return (
    <Link to={url} className="category-card">
      <div className="card-icon">{icon}</div>
      <h3 className="card-title">{name}</h3>
      <p className="card-description">{description}</p>
      
      <style jsx>{`
        .category-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 2rem 1rem;
          background-color: var(--background);
          border-radius: var(--radius);
          border: 1px solid var(--border-color);
          transition: all 0.3s ease;
        }
        
        .category-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
          border-color: var(--primary);
        }
        
        .card-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: var(--primary);
        }
        
        .card-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--text-dark);
        }
        
        .card-description {
          font-size: 0.9rem;
          color: var(--text-light);
          line-height: 1.4;
        }
      `}</style>
    </Link>
  );
};

export default CategoryCard;
