import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { MDBContainer, MDBInput } from 'mdb-react-ui-kit';
import { FaEnvelope, FaLock } from 'react-icons/fa'; 
import { Navbar, Container } from 'react-bootstrap';
import SignupPage from './SignupPage'; // Import SignupPage component

const backgroundImage = `${process.env.PUBLIC_URL}/assets/images/well.jpg`;
const carImage = `${process.env.PUBLIC_URL}/assets/images/cari.png`;

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

   
    const handleLogin = async () => {
        try {
            if (!email || !password) {
                setError('Please enter both email and password.');
                return;
            }

            const response = await axios.post('http://localhost:8080/auth/signin', { email, password });
            console.log('Login successful:', response.data);
           
            // Check the role from the response and navigate accordingly
            const role = response.data.role;
            if (role === 'ROLE_ADMIN') {
                navigate('/admin');
            } else if (role === 'ROLE_CUSTOMER') {
                navigate('/');
            } else {
                setError('Invalid role.');
            }
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            setError('Invalid email or password.');
        }
    };
    return (
        <div className="login-container d-flex flex-column align-items-center min-vh-100" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="w-100 p-3 justify-content-center">
                <Container className="d-flex justify-content-center">
                    <Navbar.Brand href="#" className="d-flex align-items-center">
                        <img
                            src={carImage}
                            alt="Car Logo"
                            style={{ marginRight: '10px', width: '50px', height: '50px' }}
                        />
                        Car Rental
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <br />    <br />    <br />    <br />    <br />   
            <div className="login-box p-5 rounded shadow-lg mt-5">
                <MDBContainer className="p-3">
                    <h3 className="mb-4 text-center">Login</h3>
                    {error && <p className="text-danger text-center">{error}</p>}
                    <div className="mb-3 position-relative">
                        <FaEnvelope className="position-absolute top-50 start-0 translate-middle-y ms-3" />
                        <MDBInput wrapperClass='ms-5' placeholder='Email Address' id='email' value={email} type='email' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3 position-relative">
                        <FaLock className="position-absolute top-50 start-0 translate-middle-y ms-3" />
                        <MDBInput wrapperClass='ms-5' placeholder='Password' id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className="btn mb-4" onClick={handleLogin}>Sign in</button>
                    <div className="text-center">
                        <p>Not a member? <NavLink to="/signup">Register</NavLink></p>
                    </div>
                </MDBContainer>

               
            </div>
            <br />         <br />      <br />     <br />     <br />     <br />
            <p className="mb-0 mt-2" style= {{ color: 'white' }}>© {new Date().getFullYear()} Car Rental Management System</p>
            
            <Routes>
                <Route path="/signup" element={<SignupPage />} />
            </Routes>
            <style>
                {`

body{
    background-color: #343a40;
}
                    .login-container {
                        background-size: cover;
                        background-position: center;
                        background-repeat: no-repeat;
                        height: 100vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 0 20px;
                    }

                    .login-box {
                        background-color: rgba(255, 255, 255, 0.9);
                        padding: 2rem;
                        border-radius: 10px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        width: 400px;
                        max-width: 100%;
                    }

                    .login-box .form-control {
                        padding-left: 2.5rem;
                    }

                    .login-box .position-relative {
                        position: relative;
                    }

                    .login-box .position-absolute {
                        font-size: 1.2rem;
                        color: #6c757d;
                    }

                    .login-box h3 {
                        margin-bottom: 1.5rem;
                    }

                    .login-box .btn {
                        background-color: #28282B;
                        color: white;
                        width: 100%;
                        padding: 0.75rem;
                        font-size: 1rem;
                        border: none;
                        border-radius: 5px;
                    }

                    .login-box .btn:hover {
                        background-color: #343a40;
                    }

                    .login-box a {
                        color: #007bff;
                        text-decoration: none;
                    }

                    .login-box a:hover {
                        color: #0056b3;
                    }
                `}
            </style>
        </div>
    );
}

export default LoginPage;
