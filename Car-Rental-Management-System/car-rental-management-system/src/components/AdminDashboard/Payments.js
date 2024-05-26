import React, { useState, useEffect } from 'react';
import { Table, Container } from 'react-bootstrap';
import axios from 'axios';

const Payments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/payments/getall')
      .then(response => {
        setPayments(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the payments!', error);
      });
  }, []);

  return (
    <Container>
      <h2 className="my-4">Payments List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Payment Date</th>
            <th>Payment Method</th>
            <th>Rental ID</th>
            <th>Amount Paid</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.payment_ID}>
              <td>{payment.payment_ID}</td>
              <td>{payment.payment_date}</td>
              <td>{payment.payment_method}</td>
              <td>{payment.rental.rental_ID}</td>
              <td>{payment.amount_paid}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Payments;
