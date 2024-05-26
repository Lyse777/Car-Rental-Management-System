import React, { useState, useEffect } from 'react';
import { Table, Container } from 'react-bootstrap';
import axios from 'axios';

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/Customer/getallcustomers')
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the customers!', error);
      });
  }, []);

  return (
    <Container>
      <h2 className="my-4">Customers List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Address</th>
            <th>Driving License Number</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.customer_ID}>
              <td>{customer.customer_ID}</td>
              <td>{customer.first_name}</td>
              <td>{customer.last_name}</td>
              <td>{customer.contact_information}</td>
              <td>{customer.email}</td>
              <td>{customer.address}</td>
              <td>{customer.driving_license_number}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Customers;
