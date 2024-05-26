import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [locations, setLocations] = useState([]);
  const [formData, setFormData] = useState({
    employee_ID: '',
    first_name: '',
    last_name: '',
    telephoneNumber: '',
    position: 'Accountant',
    location_ID: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  const positions = [
    'Accountant',
    'Maintenance_Technician',
    'Marketing',
    'Security_Personnel',
    'IT_Support',
    'Manager'
  ];

  useEffect(() => {
    fetchEmployees();
    fetchLocations();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:8080/employees/getall');
      console.log('Fetched employees:', response.data);
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees data:', error);
    }
  };

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

    const employeeData = {
      ...formData,
      location: {
        location_ID: formData.location_ID
      }
    };

    if (isEditing) {
      try {
        await axios.put(`http://localhost:8080/employees/update/${formData.employee_ID}`, employeeData);
        fetchEmployees();
        setIsEditing(false);
        setFormData({
          employee_ID: '',
          first_name: '',
          last_name: '',
          telephoneNumber: '',
          position: 'Accountant',
          location_ID: ''
        });
      } catch (error) {
        console.error('Error updating employee:', error);
      }
    } else {
      try {
        console.log('Submitting employee data:', employeeData);
        const response = await axios.post('http://localhost:8080/employees/add', employeeData);
        setEmployees([...employees, response.data]);
        setFormData({
          employee_ID: '',
          first_name: '',
          last_name: '',
          telephoneNumber: '',
          position: 'Accountant',
          location_ID: ''
        });
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  const handleEdit = (employee) => {
    setFormData({
      employee_ID: employee.employee_ID,
      first_name: employee.first_name,
      last_name: employee.last_name,
      telephoneNumber: employee.telephoneNumber,
      position: employee.position,
      location_ID: employee.location ? employee.location.location_ID : ''
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/employees/delete/${id}`);
      setEmployees(employees.filter(employee => employee.employee_ID !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Manage Employees</h2>
      <form onSubmit={handleFormSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Employee ID:</label>
          <input
            type="text"
            name="employee_ID"
            value={formData.employee_ID}
            onChange={handleInputChange}
            required
            style={styles.input}
            disabled={isEditing}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>First Name:</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Telephone Number:</label>
          <input
            type="text"
            name="telephoneNumber"
            value={formData.telephoneNumber}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Position:</label>
          <select
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            required
            style={styles.input}
          >
            {positions.map((position) => (
              <option key={position} value={position}>{position.replace('_', ' ')}</option>
            ))}
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Location ID:</label>
          <select
            name="location_ID"
            value={formData.location_ID}
            onChange={handleInputChange}
            required
            style={styles.input}
          >
            <option value="" disabled>Select Location</option>
            {locations.map((location) => (
              <option key={location.location_ID} value={location.location_ID}>{location.location_ID}</option>
            ))}
          </select>
        </div>
        <button type="submit" style={styles.button}>
          {isEditing ? 'Update Employee' : 'Add Employee'}
        </button>
      </form>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Employee ID</th>
            <th style={styles.th}>First Name</th>
            <th style={styles.th}>Last Name</th>
            <th style={styles.th}>Telephone Number</th>
            <th style={styles.th}>Position</th>
            <th style={styles.th}>Location ID</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.employee_ID}>
              <td style={styles.td}>{employee.employee_ID}</td>
              <td style={styles.td}>{employee.first_name}</td>
              <td style={styles.td}>{employee.last_name}</td>
              <td style={styles.td}>{employee.telephoneNumber}</td>
              <td style={styles.td}>{employee.position}</td>
              <td style={styles.td}>{employee.location ? employee.location.location_ID : 'N/A'}</td>
              <td style={styles.td}>
                <button
                  style={styles.editButton}
                  onClick={() => handleEdit(employee)}
                >
                  Edit
                </button>
                <button
                  style={styles.deleteButton}
                  onClick={() => handleDelete(employee.employee_ID)}
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
export default Employee;