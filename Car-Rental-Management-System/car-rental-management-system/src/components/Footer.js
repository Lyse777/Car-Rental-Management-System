import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faInfoCircle, faLink, faContactBook } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    return (
        <footer className="footer bg-dark text-white py-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h5><FontAwesomeIcon icon={faInfoCircle} /> About Us</h5>
                        <p>We are committed to providing exceptional car rental at affordable prices.</p>
                    </div>
                    <div className="col-md-3">
                        <h5><FontAwesomeIcon icon={faLink} /> Quick Links</h5>
                        <ul className="list-unstyled quick-links">
                            <li><a href="/">Home</a></li>
                            <li><a href="cars">Cars</a></li>
                            <li><a href="about">About Us</a></li>
                            <li><a href="contact">Contact Us</a></li>
                            <li><a href="usermanual" style={{color:'skyblue'}}>User Manual</a></li>

                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h5><FontAwesomeIcon icon={faContactBook} /> Contact Us</h5>
                        <p>carrental889@gmail.com</p>
                        <p>+250 782 567 504</p>
                        <p>KK 567 , Kigali, Rwanda</p>
                    </div>
                </div>
                <hr className="my-4" />
                <div className="text-center">
                    <ul className="list-inline mb-0">
                        <li className="list-inline-item"><a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebookF} size="2x" className="social-icon" /></a></li>
                        <li className="list-inline-item"><a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} size="2x" className="social-icon" /></a></li>
                        <li className="list-inline-item"><a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} size="2x" className="social-icon" /></a></li>
                        <li className="list-inline-item"><a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faYoutube} size="2x" className="social-icon" /></a></li>
                    </ul>
                    <p className="mb-0 mt-2">© {new Date().getFullYear()} Car Rental Management System</p>
                </div>
            </div>
            <style>
                {`
                    .quick-links {
                        margin: 0;
                        padding: 0;
                    }
                    .quick-links li {
                        list-style: none;
                        margin-bottom: 10px;
                    }
                    .quick-links a {
                        color: #fff;
                        text-decoration: none;
                        font-size: 16px;
                    }
                    .quick-links a:hover {
                        color: gray;
                    }
                    .social-icon {
                        color: white;
                        transition: color 0.3s;
                    }
                    .social-icon:hover {
                        color: #2980b9; /* Change to any color you prefer for the hover effect */
                    }
                `}
            </style>
        </footer>
    );
};

export default Footer;
