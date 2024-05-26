import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Hero = () => {
  return (
    <>
      <style>{`
        .hero {
          background-color: #f8f9fa; /* Light gray background */
          border-radius: 0.3rem; /* Adds rounded corners */
          margin-bottom: 20px; /* Space below the hero section */
          padding: 2rem 1rem; /* Padding inside the hero section */
        }
        @media (max-width: 768px) {
          .hero {
            padding: 1rem 0.5rem; /* Reduced padding on smaller screens */
          }
          .hero h1 {
            font-size: 1.5rem; /* Smaller font size for mobile devices */
          }
          .hero p {
            font-size: 1rem; /* Smaller paragraph font size for readability on mobile */
          }
        }
      `}</style>
      <div className="hero">
        <Container>
          <Row>
            <Col>
              <h1 className="display-4">Find Your Perfect Car Rental</h1>
              <p className="lead">Choose from a wide variety of cars at affordable prices.</p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Hero;
