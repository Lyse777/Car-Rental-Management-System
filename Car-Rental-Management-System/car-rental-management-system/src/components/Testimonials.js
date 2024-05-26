import React from 'react';

const Testimonials = () => {
    return (
        <>
            <style>{`
                .testimonials-section {
                    text-align: center;
                    padding: 50px 20px;
                    background-color: #EFF3F6; /* Soft gray background */
                }
                .testimonial-container {
                    max-width: 800px;
                    margin: auto;
                }
                .testimonial {
                    background-color: #fff;
                    border-radius: 8px; /* Rounded corners */
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* Subtle shadow */
                    padding: 20px;
                    margin-bottom: 30px;
                    position: relative;
                    overflow: hidden;
                    transition: transform 0.3s ease; /* Smooth hover effect */
                }
                .testimonial:hover {
                    transform: translateY(-5px); /* Lift on hover */
                    box-shadow: 0 4px 8px rgba(0,0,0,0.2); /* Enhanced shadow on hover */
                }
                .testimonial p {
                    margin-bottom: 15px; /* Spacing between lines */
                    font-size: 1.2rem; /* Increased font size for readability */
                    color: #555; /* Softer text color */
                }
                .testimonial::before {
                    content: '\\201C'; /* Left double quotation mark */
                    font-size: 2.5rem;
                    color: black; /* Blue color for quote icon */
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    opacity: 0.5;
                    z-index: -1;
                    transition: opacity 0.3s ease; /* Smooth opacity transition */
                }
                .testimonial:hover::before {
                    opacity: 0.8; /* Darken quote icon on hover */
                }
                @media (max-width: 768px) {
                    .testimonials-section {
                        padding: 40px 10px; /* Adjusted padding for smaller screens */
                    }
                    .testimonial {
                        padding: 15px; /* Adjusted padding for smaller screens */
                    }
                    .testimonial p {
                        font-size: 1rem; /* Smaller font size for readability on mobile */
                    }
                }
            `}</style>
            <div className="testimonials-section">
                <div className="testimonial-container">
                <h2>Customer Testimonials</h2>
                    <div className="testimonial">
                        <p>"The rental process was quick and easy, and the car was in excellent condition. Highly recommended!"</p>
                        <p>- Shema Roger</p>
                    </div>
                    <div className="testimonial">
                        <p>"Excellent customer service and great prices. I will definitely use Car Rental again!"</p>
                        <p>- Uwayo Neeve Celia</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Testimonials;
