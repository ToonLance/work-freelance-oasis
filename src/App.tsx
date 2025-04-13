
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ServiceDetail from './pages/ServiceDetail';
import ServicesList from './pages/ServicesList';
import CreateService from './pages/CreateService';
import UserProfile from './pages/UserProfile';
import Dashboard from './pages/Dashboard';
import MyServices from './pages/MyServices';
import Orders from './pages/Orders';
import NotFound from './pages/NotFound';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/services" element={<ServicesList />} />
        <Route path="/service/:id" element={<ServiceDetail user={user} />} />
        <Route path="/create-service" element={<CreateService user={user} />} />
        <Route path="/profile/:id" element={<UserProfile />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/my-services" element={<MyServices user={user} />} />
        <Route path="/orders" element={<Orders user={user} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

