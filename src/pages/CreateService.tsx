
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db } from '../firebase/config';
import Navbar from '../components/Navbar';

interface CreateServiceProps {
  user: any;
}

const CreateService: React.FC<CreateServiceProps> = ({ user }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'design',
    deliveryTime: '1',
    image: null as File | null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!user) {
    // Redirect if user is not logged in
    navigate('/login');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    
    if (name === 'image' && files && files.length > 0) {
      setFormData(prev => ({
        ...prev,
        image: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.image) {
      setError('Please select an image for your service');
      setLoading(false);
      return;
    }

    try {
      // Upload image to storage
      const storage = getStorage();
      const storageRef = ref(storage, `services/${formData.image.name}-${Date.now()}`);
      const uploadTask = uploadBytesResumable(storageRef, formData.image);
      
      uploadTask.on('state_changed',
        (snapshot) => {
          // Handle progress (optional)
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          // Handle error
          setError('Error uploading image: ' + error.message);
          setLoading(false);
        },
        async () => {
          // Handle success
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          
          // Add service to firestore
          const serviceData = {
            title: formData.title,
            description: formData.description,
            price: parseFloat(formData.price),
            category: formData.category,
            deliveryTime: parseInt(formData.deliveryTime),
            image: downloadURL,
            sellerId: user.uid,
            sellerName: user.displayName || 'Anonymous',
            sellerPhoto: user.photoURL || '',
            createdAt: serverTimestamp(),
          };
          
          const docRef = await addDoc(collection(db, "services"), serviceData);
          navigate('/service/' + docRef.id);
        }
      );
    } catch (error: any) {
      setError('Error creating service: ' + error.message);
      setLoading(false);
    }
  };

  return (
    <div className="create-service-page">
      <Navbar user={user} />
      
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">Create a New Service</h1>
        
        {error && <div className="error-message mb-4">{error}</div>}
        
        <form onSubmit={handleSubmit} className="service-form">
          <div className="form-group">
            <label htmlFor="title">Service Title</label>
            <input 
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="input"
              placeholder="I will..."
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="textarea"
              rows={6}
              placeholder="Describe your service in detail..."
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="select"
              required
            >
              <option value="design">Graphics & Design</option>
              <option value="programming">Programming & Tech</option>
              <option value="digital-marketing">Digital Marketing</option>
              <option value="writing">Writing & Translation</option>
              <option value="video">Video & Animation</option>
              <option value="music">Music & Audio</option>
              <option value="business">Business</option>
              <option value="lifestyle">Lifestyle</option>
            </select>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Price ($)</label>
              <input 
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="5"
                step="1"
                className="input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="deliveryTime">Delivery Time (days)</label>
              <select
                id="deliveryTime"
                name="deliveryTime"
                value={formData.deliveryTime}
                onChange={handleChange}
                className="select"
                required
              >
                <option value="1">1 day</option>
                <option value="2">2 days</option>
                <option value="3">3 days</option>
                <option value="5">5 days</option>
                <option value="7">7 days</option>
                <option value="14">14 days</option>
                <option value="30">30 days</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="image">Service Image</label>
            <input 
              type="file"
              id="image"
              name="image"
              onChange={handleChange}
              accept="image/*"
              className="file-input"
            />
            <p className="text-sm text-gray-500 mt-1">Upload a high-quality image to represent your service</p>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Service'}
          </button>
        </form>
      </div>
      
      <style jsx>{`
        .create-service-page {
          min-height: 100vh;
          background-color: var(--background-light);
        }
        
        .error-message {
          background-color: rgba(251, 83, 83, 0.1);
          color: var(--error);
          padding: 0.75rem;
          border-radius: var(--radius);
        }
        
        .service-form {
          background-color: white;
          padding: 2rem;
          border-radius: var(--radius);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: var(--text-dark);
        }
        
        .input, .select, .textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid var(--border-color);
          border-radius: var(--radius);
          background-color: white;
          transition: border-color 0.3s ease;
        }
        
        .input:focus, .select:focus, .textarea:focus {
          border-color: var(--primary);
          outline: none;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        
        .file-input {
          padding: 0.75rem 0;
        }
        
        .btn-primary {
          margin-top: 1rem;
        }
        
        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default CreateService;
