import React, { useEffect, useState, useCallback } from 'react';
import { Navbar, Nav, Container, Modal, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faBell } from '@fortawesome/free-solid-svg-icons';

const Navigation = () => {
  const navigate = useNavigate();
  const carImage = `${process.env.PUBLIC_URL}/assets/images/cari.png`;
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

  const handlePopState = useCallback(() => {
    if (window.location.pathname !== '/users') {
      navigate('/users', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.addEventListener('popstate', handlePopState);

    // Set notification when component mounts
    const loginTime = new Date().toLocaleTimeString();
    setNotification(`You have logged in at ${loginTime}`);
    setHasNotification(true);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [handlePopState]);

  const handleBellClick = () => {
    setShowModal(true);
    setHasNotification(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="shadow-lg">
        <Container className="justify-content-between">
          <Navbar.Brand href="/" style={{ marginRight: '30px' }}> {/* Increased right margin */}
            <img
              src={carImage}
              alt="Car Logo"
              style={{ marginRight: '10px', marginBottom: '3px', width: '90px', height: '90px' }}
            />
            Car Rental 
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" style={{ marginLeft: '150px' }}> {/* Added left margin to the Nav container */}
              <Nav.Link as={NavLink} to="/" exact>Home</Nav.Link>
              <Nav.Link as={NavLink} to="/cars">Cars</Nav.Link>
              <Nav.Link as={NavLink} to="/about">About Us</Nav.Link>
              <Nav.Link as={NavLink} to="/contact">Contact Us</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link>
                <div className="notification-wrapper" onClick={handleBellClick}>
                  <FontAwesomeIcon icon={faBell} size="lg" className="nav-icon" />
                  {hasNotification && <span className="notification-badge">1</span>}
                </div>
              </Nav.Link>
              <Nav.Link as={NavLink} to="/users" onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} size="lg" className="nav-icon" />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

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
    </>
  );
};

export default Navigation;
