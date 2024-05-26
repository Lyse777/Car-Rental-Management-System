// src/components/Features.js
import React from 'react';

const Features = () => {
    return (
        <div className="features-section" style={{ textAlign: 'center', padding: '50px 20px' }}>
            <h2 style={{ fontSize: '2.0rem', fontWeight: 'bold' }}>Why Choose Us?</h2>
            <div className="feature-list" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                <div style={{ flex: '1', minWidth: '250px', margin: '10px', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
                    <h3>Wide Range of Cars</h3>
                    <p>From compact cars to luxury SUVs, select the perfect car that suits your needs.</p>
                </div>
                <div style={{ flex: '1', minWidth: '250px', margin: '10px', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
                    <h3>Affordable Prices</h3>
                    <p>Competitive pricing with no hidden fees. Get more for your money.</p>
                </div>
                <div style={{ flex: '1', minWidth: '250px', margin: '10px', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
                    <h3>24/7 Customer Support</h3>
                    <p>Our dedicated team is here to help you at any time of the day or night.</p>
                </div>
            </div>
        </div>
    );
};

export default Features;
