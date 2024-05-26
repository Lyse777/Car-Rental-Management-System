import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [formData, setFormData] = useState({
    location_ID: '',
    address: '',
    contact_information: '',
    operating_hours: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await axios.get('http://localhost:8080/locations/getall');
      console.log('Fetched locations:', response.data);
      setLocations(response.data);
    } catch (error) {
      console.error('Error fetching locations data:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (isEditing) {
      try {
        await axios.put(`http://localhost:8080/locations/update/${formData.location_ID}`, formData);
        fetchLocations();
        setIsEditing(false);
        setFormData({
          location_ID: '',
          address: '',
          contact_information: '',
          operating_hours: ''
        });
      } catch (error) {
        console.error('Error updating location:', error);
      }
    } else {
      try {
        console.log('Submitting location data:', formData);
        const response = await axios.post('http://localhost:8080/locations/add', formData);
        setLocations([...locations, response.data]);
        setFormData({
          location_ID: '',
          address: '',
          contact_information: '',
          operating_hours: ''
        });
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  const handleEdit = (location) => {
    setFormData({
      location_ID: location.location_ID,
      address: location.address,
      contact_information: location.contact_information,
      operating_hours: location.operating_hours
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/locations/delete/${id}`);
      setLocations(locations.filter(location => location.location_ID !== id));
    } catch (error) {
      console.error('Error deleting location:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Manage Locations</h2>
      <form onSubmit={handleFormSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Location ID:</label>
          <input
            type="text"
            name="location_ID"
            value={formData.location_ID}
            onChange={handleInputChange}
            required
            style={styles.input}
            disabled={isEditing}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Contact Information:</label>
          <input
            type="text"
            name="contact_information"
            value={formData.contact_information}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Operating Hours:</label>
          <input
            type="text"
            name="operating_hours"
            value={formData.operating_hours}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          {isEditing ? 'Update Location' : 'Add Location'}
        </button>
      </form>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Location ID</th>
            <th style={styles.th}>Address</th>
            <th style={styles.th}>Contact Information</th>
            <th style={styles.th}>Operating Hours</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {locations.map(location => (
            <tr key={location.location_ID}>
              <td style={styles.td}>{location.location_ID}</td>
              <td style={styles.td}>{location.address}</td>
              <td style={styles.td}>{location.contact_information}</td>
              <td style={styles.td}>{location.operating_hours}</td>
              <td style={styles.td}>
                <button
                  style={styles.editButton}
                  onClick={() => handleEdit(location)}
                >
                  Edit
                </button>
                <button
                  style={styles.deleteButton}
                  onClick={() => handleDelete(location.location_ID)}
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

export default Locations;
