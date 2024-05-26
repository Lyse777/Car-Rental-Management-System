import React from 'react';

const HowItWorks = () => {
    return (
        <>
            <style>{`
                .how-it-works-section {
                    background-color: #f9f9f9; /* Softer shade of white */
                    padding: 60px 20px; /* Updated padding */
                    box-shadow: 0 4px 8px rgba(0,0,0,0.05); /* Softer and wider shadow */
                }
                .how-it-works-section h2 {
                    text-align: center;
                    font-size: 2.2rem; /* Slightly larger to command attention */
                    font-weight: bold;
                    color: #333; /* Darker shade for readability */
                    margin-bottom: 40px; /* Space below the title */
                }
                .how-it-works-section ol {
                    max-width: 800px;
                    margin: auto;
                    padding: 0 20px; /* Padding for alignment */
                    list-style: none; /* No default list styling */
                    counter-reset: item; /* Initialize counter for list items */
                    font-size: 1.3rem; /* Increased readability */
                    color: #555; /* Softer color for text */
                }
                .how-it-works-section ol li {
                    margin-bottom: 15px; /* Spacing between items */
                    position: relative;
                    padding-left: 30px; /* Space for custom numbers */
                }
                .how-it-works-section ol li::before {
                    content: counter(item) '.'; /* Display the counter */
                    counter-increment: item; /* Increment counter */
                    position: absolute;
                    left: 0; /* Position number to the left */
                    color: gray; /* Theme color for numbers */
                    font-weight: bold; /* Bold for emphasis */
                }
                .how-it-works-section ol li:hover {
                    text-decoration: underline; /* Underline on hover for interactivity */
                    cursor: pointer; /* Pointer cursor on hover */
                }
            `}</style>
            <div className="how-it-works-section">
                <h2>How It Works</h2>
                <ol>
                    <li>Choose your car online from our extensive range.</li>
                    <li>Book the car at your convenience with just a few clicks.</li>
                    <li>Pick up the car from our designated location or call for delivery.</li>
                    <li>Enjoy your ride; return it on your terms.</li>
                </ol>
            </div>
        </>
    );
};

export default HowItWorks;
