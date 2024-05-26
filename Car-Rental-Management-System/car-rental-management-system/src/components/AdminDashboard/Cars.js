import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Car = () => {
  const [cars, setCars] = useState([]);
  const [insurances, setInsurances] = useState([]);
  const [formData, setFormData] = useState({
    car_ID: '',
    make: '',
    model: '',
    years: '',
    color: '',
    image: '',
    mileage: '',
    rental_price_per_day: '',
    insurance_ID: '',
    car_status: 'Available'
  });
  const [isEditing, setIsEditing] = useState(false);

  const makes = [
    'Toyota_Motor_Corporation',
    'BMW',
    'Hyundai_Motor_Group',
    'Ford_Motor_Company',
    'Volkswagen_Group',
    'Mercedes_Benz'
  ];

  const models = [
    'Toyota_Camry',
    'Toyota_Corolla',
    'Toyota_RAV4',
    'Volkswagen_Golf',
    'Volkswagen_Passat',
    'Audi_A4',
    'Audi_Q5',
    'Bentley_Continental_GT',
    'Ford_Explorer',
    'Ford_Mustang',
    'BMW_3_Series',
    'BMW_X5',
    'Hyundai_Sonata',
    'Kia_Sportage',
    'Mercedes_Benz_GLE',
    'Mercedes_Benz_GLC'
  ];

  useEffect(() => {
    fetchCars();
    fetchInsurances();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await axios.get('http://localhost:8080/cars/all');
      console.log('Fetched cars:', response.data);
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars data:', error);
    }
  };

  const fetchInsurances = async () => {
    try {
      const response = await axios.get('http://localhost:8080/insurance/getall');
      console.log('Fetched insurances:', response.data);
      setInsurances(response.data);
    } catch (error) {
      console.error('Error fetching insurances data:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Prepare the data structure expected by the backend
    const carData = {
      car_ID: formData.car_ID,
      make: formData.make,
      model: formData.model,
      years: formData.years,
      color: formData.color,
      image: formData.image,
      mileage: formData.mileage,
      rental_price_per_day: formData.rental_price_per_day,
      insurance: {
        insurance_ID: formData.insurance_ID
      }
    };

    if (isEditing) {
      try {
        await axios.put(`http://localhost:8080/cars/update/${formData.car_ID}`, carData);
        fetchCars();
        setIsEditing(false);
        setFormData({
          car_ID: '',
          make: '',
          model: '',
          years: '',
          color: '',
          image: '',
          mileage: '',
          rental_price_per_day: '',
          insurance_ID: '',
          car_status: 'Available'
        });
      } catch (error) {
        console.error('Error updating car:', error);
      }
    } else {
      try {
        console.log('Submitting car data:', carData); // Add logging
        const response = await axios.post('http://localhost:8080/cars/save', carData);
        setCars([...cars, response.data]);
        setFormData({
          car_ID: '',
          make: '',
          model: '',
          years: '',
          color: '',
          image: '',
          mileage: '',
          rental_price_per_day: '',
          insurance_ID: '',
          car_status: 'Available'
        });
      } catch (error) {
        console.error('Error submitting form:', error);
        if (error.response) {
          console.error('Server response:', error.response.data);
        }
      }
    }
  };

  const handleEdit = (car) => {
    setFormData({
      car_ID: car.car_ID,
      make: car.make,
      model: car.model,
      years: car.years,
      color: car.color,
      image: car.image,
      mileage: car.mileage,
      rental_price_per_day: car.rental_price_per_day,
      insurance_ID: car.insurance ? car.insurance.insurance_ID : ''
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/cars/delete/${id}`);
      setCars(cars.filter(car => car.car_ID !== id));
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Manage Cars</h2>
      <form onSubmit={handleFormSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Car ID:</label>
          <input
            type="text"
            name="car_ID"
            value={formData.car_ID}
            onChange={handleInputChange}
            required
            style={styles.input}
            disabled={isEditing}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Make:</label>
          <select
            name="make"
            value={formData.make}
            onChange={handleInputChange}
            required
            style={styles.input}
          >
            <option value="" disabled>Select Make</option>
            {makes.map((make) => (
              <option key={make} value={make}>{make.replace('_', ' ')}</option>
            ))}
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Model:</label>
          <select
            name="model"
            value={formData.model}
            onChange={handleInputChange}
            required
            style={styles.input}
          >
            <option value="" disabled>Select Model</option>
            {models.map((model) => (
              <option key={model} value={model}>{model.replace('_', ' ')}</option>
            ))}
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Year:</label>
          <input
            type="number"
            name="years"
            value={formData.years}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Color:</label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Image URL:</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Mileage:</label>
          <input
            type="number"
            name="mileage"
            value={formData.mileage}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Rental Price Per Day:</label>
          <input
            type="number"
            name="rental_price_per_day"
            value={formData.rental_price_per_day}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Insurance ID:</label>
          <select
            name="insurance_ID"
            value={formData.insurance_ID}
            onChange={handleInputChange}
            required
            style={styles.input}
          >
            <option value="" disabled>Select Insurance ID</option>
            {insurances.map((insurance) => (
              <option key={insurance.insurance_ID} value={insurance.insurance_ID}>{insurance.insurance_ID}</option>
            ))}
          </select>
        </div>
        <button type="submit" style={styles.button}>
          {isEditing ? 'Update Car' : 'Add Car'}
        </button>
      </form>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Car ID</th>
            <th style={styles.th}>Make</th>
            <th style={styles.th}>Model</th>
            <th style={styles.th}>Year</th>
            <th style={styles.th}>Color</th>
            <th style={styles.th}>Image</th>
            <th style={styles.th}>Mileage</th>
            <th style={styles.th}>Rental Price Per Day</th>
            <th style={styles.th}>Insurance ID</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map(car => (
            <tr key={car.car_ID}>
              <td style={styles.td}>{car.car_ID}</td>
              <td style={styles.td}>{car.make.replace('_', ' ')}</td>
              <td style={styles.td}>{car.model.replace('_', ' ')}</td>
              <td style={styles.td}>{car.years}</td>
              <td style={styles.td}>{car.color}</td>
              <td style={styles.td}><img src={car.image} alt={car.model} style={styles.image} /></td>
              <td style={styles.td}>{car.mileage}</td>
              <td style={styles.td}>{car.rental_price_per_day}</td>
              <td style={styles.td}>{car.insurance ? car.insurance.insurance_ID : 'N/A'}</td>
              <td style={styles.td}>{car.car_status}</td>
              <td style={styles.td}>
                <button
                  style={styles.editButton}
                  onClick={() => handleEdit(car)}
                >
                  Edit
                </button>
                <button
                  style={styles.deleteButton}
                  onClick={() => handleDelete(car.car_ID)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '5px',
  },
  input: {
    padding: '8px',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    marginTop: '10px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    border: '1px solid #ddd',
    padding: '8px',
    backgroundColor: '#f2f2f2',
  },
  td: {
    border: '1px solid #ddd',
    padding: '8px',
  },
  image: {
    width: '100px',
  },
  editButton: {
    padding: '5px 10px',
    fontSize: '14px',
    backgroundColor: '#FFA500',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    marginRight: '5px',
  },
  deleteButton: {
    padding: '5px 10px',
    fontSize: '14px',
    backgroundColor: '#FF0000',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
};

export default Car;
