import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MDBContainer, MDBInput } from 'mdb-react-ui-kit';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaUserTag } from 'react-icons/fa';
import { Navbar, Container } from 'react-bootstrap';

const backgroundImage = `${process.env.PUBLIC_URL}/assets/images/well.jpg`;
const carImage = `${process.env.PUBLIC_URL}/assets/images/cari.png`;

function SignupPage() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('ROLE_CUSTOMER');
    const [mobile, setMobileNumber] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validateFullName = (name) => {
        const re = /^[a-zA-Z\s]{3,}$/;
        return re.test(String(name));
    };

    const validateMobileNumber = (number) => {
        const re = /^\d{10}$/;
        return re.test(String(number));
    };

    const handleSignup = async () => {
        setError('');
        setSuccess('');
        try {
            if (!fullName || !email || !password || !confirmPassword || !mobile) {
                setError('Please fill in all fields.');
                return;
            }

            if (!validateFullName(fullName)) {
                setError('Full Name must be at least 3 characters long and contain only letters and spaces.');
                return;
            }

            if (!validateEmail(email)) {
                setError('Please enter a valid email address.');
                return;
            }

            if (!validateMobileNumber(mobile)) {
                setError('Mobile Number must be 10 digits long.');
                return;
            }

            if (password.length < 4) {
                setError('Password must be at least 4 characters long.');
                return;
            }

            if (password !== confirmPassword) {
                setError('Passwords do not match.');
                return;
            }

            const response = await axios.post('http://localhost:8080/auth/signup', {
                fullName,
                email,
                password,
                role,
                mobile
            });

            setSuccess(response.data.message);
            navigate('/users');
        } catch (error) {
            console.error('Signup failed:', error.response ? error.response.data : error.message);
            setError(error.response ? error.response.data.message : error.message);
        }
    };

    return (
        
        <div className="signup-container d-flex flex-column align-items-center min-vh-100" style={{ backgroundImage: `url(${backgroundImage})` }}>
            
<br /><br /><br /><br /><br />
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
            <div className="signup-box p-5 rounded shadow-lg mt-5">
                <MDBContainer className="p-3">
                    <h3 className="mb-4 text-center">Create Your Account</h3>
                    {error && <p className="text-danger text-center">{error}</p>}
                    {success && <p className="text-success text-center">{success}</p>}
                    <div className="mb-3 position-relative">
                        <FaUser className="position-absolute top-50 start-0 translate-middle-y ms-3" />
                        <MDBInput wrapperClass='ms-5' id='fullName' placeholder="Full Name" value={fullName} type='text'
                            onChange={(e) => setFullName(e.target.value)} />
                    </div>
                    <div className="mb-3 position-relative">
                        <FaEnvelope className="position-absolute top-50 start-0 translate-middle-y ms-3" />
                        <MDBInput wrapperClass='ms-5' placeholder='Email Address' id='email' value={email} type='email'
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3 position-relative">
                        <FaLock className="position-absolute top-50 start-0 translate-middle-y ms-3" />
                        <MDBInput wrapperClass='ms-5' placeholder='Password' id='password' type='password' value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="mb-3 position-relative">
                        <FaLock className="position-absolute top-50 start-0 translate-middle-y ms-3" />
                        <MDBInput wrapperClass='ms-5' placeholder='Confirm Password' id='confirmPassword' type='password'
                            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <div className="mb-3 position-relative">
                        <FaPhone className="position-absolute top-50 start-0 translate-middle-y ms-3" />
                        <MDBInput wrapperClass='ms-5' placeholder='Mobile Number' id='mobileNumber' value={mobile} type='text'
                            onChange={(e) => setMobileNumber(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <FaUserTag className="me-2" />
                        <label className="form-label mb-1">Role:</label>
                        <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="ROLE_CUSTOMER">Customer</option>
                            <option value="ROLE_ADMIN">Admin</option>
                        </select>
                    </div>
                    <button className="btn mb-4" onClick={handleSignup}>Sign Up</button>
                    <div className="text-center">
                        <p>Already registered? <a href="/users">Login</a></p>
                    </div>
                </MDBContainer>
               
                  </div>
            <p className="mb-0 mt-2" style={{ color: 'white' }}>© {new Date().getFullYear()} Car Rental Management System</p>
          
            <style>
                {`

                body{
                    background-color: #343a40;
                }
                    .signup-container {
                        background-size: cover;
                        background-position: center;
                        background-repeat: no-repeat;
                        height: 100vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 0 20px;
                    }

                    .signup-box {
                        background-color: rgba(255, 255, 255, 0.9);
                        padding: 2rem;
                        border-radius: 10px;
                        height: 153%;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        width: 400px;
                        max-width: 100%;
                    }

                    .signup-box .form-control {
                        padding-left: 2.5rem;
                    }

                    .signup-box .position-relative {
                        position: relative;
                    }

                    .signup-box .position-absolute {
                        font-size: 1.2rem;
                        color: #6c757d;
                    }

                    .signup-box h2 {
                        margin-bottom: 1.5rem;
                    }

                    .signup-box .btn {
                        background-color: #28282B;
                        color: white;
                        width: 100%;
                        padding: 0.75rem;
                        font-size: 1rem;
                        border: none;
                        border-radius: 5px;
                    }

                    .signup-box .btn:hover {
                        background-color: #343a40;
                    }

                    .signup-box a {
                        color: #007bff;
                        text-decoration: none;
                    }

                    .signup-box a:hover {
                        color: #0056b3;
                    }
                `}
            </style>
        </div>
    );
}

export default SignupPage;
