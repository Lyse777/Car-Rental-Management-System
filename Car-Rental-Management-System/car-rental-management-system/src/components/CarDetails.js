import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Form, Button, ProgressBar, Row, Col } from 'react-bootstrap';
import { FaCar, FaCreditCard, FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';

const generateCustomerId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 10; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const CheckoutProcess = () => {
  const { carId } = useParams();
  const [step, setStep] = useState(1);
  const [car, setCar] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentConfirmation, setPaymentConfirmation] = useState(null);

  const [customerId, setCustomerId] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [drivingLicenseNumber, setDrivingLicenseNumber] = useState('');
  const [rentalStartDate, setRentalStartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [totalRentalCost, setTotalRentalCost] = useState(0);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (carId) {
      fetch(`http://localhost:8080/cars/${carId}`)
        .then(response => response.json())
        .then(data => {
          setCar(data);
        })
        .catch(error => console.error('Failed to fetch car details:', error));
    }
  }, [carId]);

  useEffect(() => {
    if (rentalStartDate && returnDate && car) {
      const start = new Date(rentalStartDate);
      const end = new Date(returnDate);
      const days = (end - start) / (1000 * 60 * 60 * 24);
      const totalAmount = car.rental_price_per_day * days;
      setTotalRentalCost(totalAmount);
    }
  }, [rentalStartDate, returnDate, car]);

  useEffect(() => {
    setCustomerId(generateCustomerId());
  }, []);

  const validateForm = () => {
    let formErrors = {};
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      formErrors.email = 'Invalid email format';
    }
    if (!firstName) {
      formErrors.firstName = 'First name is required';
    }
    if (!lastName) {
      formErrors.lastName = 'Last name is required';
    }
    if (!address) {
      formErrors.address = 'Address is required';
    }
    if (!phoneNumber.match(/^\d{10}$/)) {
      formErrors.phoneNumber = 'Phone number must be 10 digits';
    }
    if (!drivingLicenseNumber) {
      formErrors.drivingLicenseNumber = 'Driving license number is required';
    }
    if (new Date(rentalStartDate) < new Date()) {
      formErrors.rentalStartDate = 'Rental start date cannot be in the past';
    }
    if (new Date(returnDate) <= new Date(rentalStartDate)) {
      formErrors.returnDate = 'Return date must be after rental start date';
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleCustomerSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      await axios.post('http://localhost:8080/Customer/addcustomers', {
        customer_ID: customerId,
        first_name: firstName,
        last_name: lastName,
        contact_information: phoneNumber,
        email: email,
        address: address,
        driving_license_number: drivingLicenseNumber,
      });
      setStep(3);
    } catch (error) {
      console.error('Error inserting customer data:', error);
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const rentalResponse = await axios.post('http://localhost:8080/rentals/adds', {
        rental_start_date: rentalStartDate,
        return_date: returnDate,
        total_rental_cost: totalRentalCost,
        payment_status: 'Borrowed',
        car: { car_ID: carId },
        customer: { customer_ID: customerId },
        employee: { employee_ID: '1' },
      });

      const rental = rentalResponse.data;

      const paymentResponse = await axios.post('http://localhost:8080/payments/adds', {
        payment_date: new Date().toISOString().split('T')[0],
        payment_method: paymentMethod,
        amount_paid: totalRentalCost,
        rental: { rental_ID: rental.rental_ID },
      });

      setPaymentConfirmation(paymentResponse.data);
      setStep(4);
    } catch (error) {
      console.error('Payment processing error:', error);
    }
  };

  const progress = Math.round((step - 1) / 3 * 100);

  return (
    <Container style={{ marginTop: '120px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className={step === 1 ? 'text-primary' : ''}>
          <FaCar /> Step 1: Select Car
        </div>
        <div className={step === 2 ? 'text-primary' : ''}>
          <FaCreditCard /> Step 2: Customer Details
        </div>
        <div className={step === 3 ? 'text-primary' : ''}>
          <FaCreditCard /> Step 3: Payment
        </div>
        <div className={step === 4 ? 'text-primary' : ''}>
          <FaCheckCircle /> Step 4: Confirmation
        </div>
      </div>
      <ProgressBar now={progress} label={`${progress}%`} className="mb-4" />

      {step === 1 && car && (
        <Row>
          <Col md={6}>
            <Card.Img
              variant="top"
              src={car.image || 'https://via.placeholder.com/200x150'}
              style={{ height: '300px', width: '100%', objectFit: 'cover' }}
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/200x150'; }}
            />
          </Col>
          <Col md={6}>
            <Card.Body>
              <Card.Title>{car.model}</Card.Title>
              <Card.Text style={{ marginTop: '2%' }}>
                Make: {car.make}<br />
                Year: {car.years}<br />
                Color: {car.color}<br />
                Mileage: {car.mileage} miles<br />
                Price per day: RWF {car.rental_price_per_day}<br />
                <b>INSURANCE</b><br />
                Insurance Company: {car.insurance.insurance_company}<br />
                Coverage Type: {car.insurance.coverage_type}<br />
                Premium Amount: RWF {car.insurance.premium_amount}
              </Card.Text>
              <Button variant="dark" onClick={() => setStep(2)}>Proceed to Customer Details</Button>
            </Card.Body>
            <br />     <br />
          </Col>
        </Row>
      )}

      {step === 2 && (
        <Form onSubmit={handleCustomerSubmit} className="p-4 border rounded">
          <h4 className="mb-4">Enter Customer Details</h4>
          <Form.Group controlId="customerId">
            <Form.Label>Customer ID</Form.Label>
            <Form.Control type="text" value={customerId} readOnly />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} isInvalid={!!errors.email} required />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" value={firstName} onChange={e => setFirstName(e.target.value)} isInvalid={!!errors.firstName} required />
            <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" value={lastName} onChange={e => setLastName(e.target.value)} isInvalid={!!errors.lastName} required />
            <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" value={address} onChange={e => setAddress(e.target.value)} isInvalid={!!errors.address} required />
            <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="phoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} isInvalid={!!errors.phoneNumber} required />
            <Form.Control.Feedback type="invalid">{errors.phoneNumber}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="drivingLicenseNumber">
            <Form.Label>Driving License Number</Form.Label>
            <Form.Control type="text" value={drivingLicenseNumber} onChange={e => setDrivingLicenseNumber(e.target.value)} isInvalid={!!errors.drivingLicenseNumber} required />
            <Form.Control.Feedback type="invalid">{errors.drivingLicenseNumber}</Form.Control.Feedback>
          </Form.Group>
          <br />     
          <Button variant="dark" type="submit">Next</Button>
          <br />     <br />
        </Form>
      )}

      {step === 3 && (
        <Form onSubmit={handlePaymentSubmit} className="p-4 border rounded">
          <h4 className="mb-4">Payment Details</h4>
          <Form.Group controlId="rentalStartDate">
            <Form.Label>Rental Start Date</Form.Label>
            <Form.Control type="date" value={rentalStartDate} onChange={e => setRentalStartDate(e.target.value)} isInvalid={!!errors.rentalStartDate} required />
            <Form.Control.Feedback type="invalid">{errors.rentalStartDate}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="returnDate">
            <Form.Label>Return Date</Form.Label>
            <Form.Control type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)} isInvalid={!!errors.returnDate} required />
            <Form.Control.Feedback type="invalid">{errors.returnDate}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="totalRentalCost">
            <Form.Label>Total Rental Cost</Form.Label>
            <Form.Control type="text" value={totalRentalCost} readOnly />
          </Form.Group>
          <Form.Group controlId="paymentMethod">
            <Form.Label>Payment Method</Form.Label>
            <Form.Control as="select" value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} required>
              <option value="">Select a method...</option>
              <option value="VISA">Visa</option>
              <option value="MASTER_CARD">MasterCard</option>
              <option value="PAYPAL">PayPal</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="customerId">
            <Form.Label>Customer ID</Form.Label>
            <Form.Control type="text" value={customerId} readOnly />
          </Form.Group>
          <Form.Group controlId="employeeId">
            <Form.Label>Employee ID</Form.Label>
            <Form.Control type="text" value="1" readOnly />
          </Form.Group>
          <br />     
          <Button variant="dark" type="submit">Submit Payment</Button>
          <br />     <br />
        </Form>
      )}

      {step === 4 && paymentConfirmation && (
        <Card className="p-4 border rounded">
          <Card.Header as="h4" className="text-center">Payment Confirmation</Card.Header>
          <Card.Body>
            <Card.Title className="text-center">Thank you for your payment!</Card.Title>
            <Card.Text className="text-center">
              Payment ID: {paymentConfirmation.payment_ID}<br />
              Payment Method: {paymentConfirmation.payment_method}<br />
              Amount Paid: {paymentConfirmation.amount_paid}
            </Card.Text>
          </Card.Body>
          <br />     <br />
        </Card>
      )}
    </Container>
  );
};

export default CheckoutProcess;
