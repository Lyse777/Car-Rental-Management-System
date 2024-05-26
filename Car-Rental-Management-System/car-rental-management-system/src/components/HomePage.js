// src/components/HomePage.js
import React from 'react';
import Hero from './Hero';
import Features from './Features';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import Navbar from './Navbar';
import Slider from './Slider';
//import CarCard from './CarCard';
import Footer from './Footer';
const HomePage = () => {
    return (
        <div>
            <Navbar />
            <Slider />
            <Hero />
            <Features />
            <HowItWorks />
            <Testimonials />
            <Footer />
        </div>
    );
};

export default HomePage;
