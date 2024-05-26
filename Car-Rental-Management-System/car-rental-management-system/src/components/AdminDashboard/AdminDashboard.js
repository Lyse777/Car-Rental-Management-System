import React, { useEffect, useState } from 'react';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faBell } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';
import Cars from './Cars';
import Customers from './Customers';
import Employees from './Employees';
import Insurance from './Insurance';
import Locations from './Locations';
import Maintenance from './Maintenance';
import Payments from './Payments';
import Rentals from './Rentals';
import Documentation from './Documentation';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState('');
  const [hasNotification, setHasNotification] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    // Perform logout logic here (e.g., clear auth tokens, session data, etc.)
    navigate('/users', { replace: true });

    // Clear the history state and allow only /users
    window.history.pushState(null, null, window.location.href);
    window.addEventListener('popstate', handlePopState);
  };

  const handlePopState = () => {
    if (window.location.pathname !== '/users') {
      navigate('/users', { replace: true });
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname !== '/users') {
        navigate('/users', { replace: true });
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Set notification when component mounts
    const loginTime = new Date().toLocaleTimeString();
    setNotification(`You have logged in at ${loginTime}`);
    setHasNotification(true);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  const handleBellClick = () => {
    setShowModal(true);
    setHasNotification(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-header-icons">
          <div className="notification-wrapper" onClick={handleBellClick}>
            <FontAwesomeIcon icon={faBell} className="icon" />
            {hasNotification && <span className="notification-badge">1</span>}
          </div>
          <FontAwesomeIcon icon={faSignOutAlt} className="icon" onClick={handleLogout} />
        </div>
      </header>
      <div className="admin-main">
        <nav className="admin-nav">
          <ul>
            <li><NavLink to="cars" className={({ isActive }) => isActive ? 'active-link' : ''}>Manage Cars</NavLink></li>
            <li><NavLink to="customers" className={({ isActive }) => isActive ? 'active-link' : ''}>Customers</NavLink></li>
            <li><NavLink to="employees" className={({ isActive }) => isActive ? 'active-link' : ''}>Manage Employees</NavLink></li>
            <li><NavLink to="insurance" className={({ isActive }) => isActive ? 'active-link' : ''}>Manage Insurance</NavLink></li>
            <li><NavLink to="locations" className={({ isActive }) => isActive ? 'active-link' : ''}>Manage Locations</NavLink></li>
            <li><NavLink to="maintenance" className={({ isActive }) => isActive ? 'active-link' : ''}>Manage Maintenance</NavLink></li>
            <li><NavLink to="payments" className={({ isActive }) => isActive ? 'active-link' : ''}>Payments</NavLink></li>
            <li><NavLink to="rentals" className={({ isActive }) => isActive ? 'active-link' : ''}>Rentals</NavLink></li>
            <li style={{ color: 'skyblue' }}><NavLink to="documentation" className={({ isActive }) => isActive ? 'active-link' : ''} style={({ isActive }) => ({ color: isActive ? 'skyblue' : 'inherit' })}>Documentation</NavLink></li>
          </ul>
          <br />
          <p className="year-text">© {new Date().getFullYear()} Car Rental Management System</p>
        </nav>
        <main className="admin-content">
          <Routes>
            <Route path="cars" element={<Cars />} />
            <Route path="customers" element={<Customers />} />
            <Route path="employees" element={<Employees />} />
            <Route path="insurance" element={<Insurance />} />
            <Route path="locations" element={<Locations />} />
            <Route path="maintenance" element={<Maintenance />} />
            <Route path="payments" element={<Payments />} />
            <Route path="rentals" element={<Rentals />} />
            <Route path="documentation" element={<Documentation />} />
          </Routes>
        </main>
      </div>

      {/* Notification Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>{notification}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
