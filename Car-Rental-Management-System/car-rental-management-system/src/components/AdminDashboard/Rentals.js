import React, { useState, useEffect } from 'react';
import { Table, Container, Alert } from 'react-bootstrap';
import axios from 'axios';

const Rentals = () => {
  const [rentals, setRentals] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/rentals/getall')
      .then(response => {
        setRentals(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the rentals!', error);
        setError('There was an error fetching the rentals. Please try again later.');
      });
  }, []);

  
  return (
    <Container>
      <h2 className="my-4">Rentals List</h2>
      {error && <Alert variant="danger">{error}</Alert>}
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>Rental ID</th>
            <th>Rental Start Date</th>
            <th>Return Date</th>
            <th>Total Rental Cost</th>
            <th>Payment Status</th>
            <th>Employee ID</th>
            <th>Car ID</th>
            <th>Customer ID</th>
          </tr>
        </thead>
        <tbody>
          {rentals.map((rental) => (
            <tr key={rental.rental_ID}>
              <td>{rental.rental_ID}</td>
              <td>{rental.rental_start_date}</td>
              <td>{rental.return_date}</td>
              <td>{rental.total_rental_cost}</td>
              <td>{rental.payment_status}</td>
              <td>{rental.employee.employee_ID}</td>
              <td>{rental.car.car_ID}</td>
              <td>{rental.customer.customer_ID}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Rentals;
