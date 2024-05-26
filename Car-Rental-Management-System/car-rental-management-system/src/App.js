import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import CarCard from './components/CarCard';
import AboutCard from './components/AboutCard';
import ContactCard from './components/ContactCard';
import CarDetailsCard from './components/CarDetailsCard';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import LoginPage from './components/User/LoginPage';
import SignupPage from './components/User/SignupPage'; // Import SignupPage component
import UserCard from './components/UserCard';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/cars" element={<CarCard />} />
                    <Route path="/about" element={<AboutCard />} />
                    <Route path="/contact" element={<ContactCard />} />
                    <Route path="/CarDetails/:carId" element={<CarDetailsCard />} />
                    <Route path="/admin/*" element={<AdminDashboard />} />
                    <Route path="/users/*" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/usermanual" element={<UserCard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
