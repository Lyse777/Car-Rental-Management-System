import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Maintenance = () => {
  const [maintenances, setMaintenances] = useState([]);
  const [cars, setCars] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    maintenance_ID: '',
    maintenance_type: '',
    maintenance_date: '',
    car_id: '',
    maintenance_cost: '',
    employee_id: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchMaintenances();
    fetchCars();
    fetchEmployees();
  }, []);

  const fetchMaintenances = async () => {
    try {
      const response = await axios.get('http://localhost:8080/maintenance/getall');
      console.log('Fetched maintenances:', response.data);
      setMaintenances(response.data);
    } catch (error) {
      console.error('Error fetching maintenances data:', error);
    }
  };

  const fetchCars = async () => {
    try {
      const response = await axios.get('http://localhost:8080/cars/all');
      console.log('Fetched cars:', response.data);
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars data:', error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:8080/employees/getall');
      console.log('Fetched employees:', response.data);
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees data:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const maintenanceData = {
      maintenance_ID: formData.maintenance_ID,
      maintenance_type: formData.maintenance_type,
      maintenance_date: formData.maintenance_date,
      car: {
        car_ID: formData.car_id
      },
      maintenance_cost: formData.maintenance_cost,
      employee: {
        employee_ID: formData.employee_id
      }
    };

    if (isEditing) {
      try {
        await axios.put(`http://localhost:8080/maintenance/update/${formData.maintenance_ID}`, maintenanceData);
        fetchMaintenances();
        setIsEditing(false);
        setFormData({
          maintenance_ID: '',
          maintenance_type: '',
          maintenance_date: '',
          car_id: '',
          maintenance_cost: '',
          employee_id: ''
        });
      } catch (error) {
        console.error('Error updating maintenance:', error);
      }
    } else {
      try {
        console.log('Submitting maintenance data:', maintenanceData);
        const response = await axios.post('http://localhost:8080/maintenance/add', maintenanceData);
        setMaintenances([...maintenances, response.data]);
        setFormData({
          maintenance_ID: '',
          maintenance_type: '',
          maintenance_date: '',
          car_id: '',
          maintenance_cost: '',
          employee_id: ''
        });
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  const handleEdit = (maintenance) => {
    setFormData({
      maintenance_ID: maintenance.maintenance_ID,
      maintenance_type: maintenance.maintenance_type,
      maintenance_date: maintenance.maintenance_date,
      car_id: maintenance.car ? maintenance.car.car_ID : '',
      maintenance_cost: maintenance.maintenance_cost,
      employee_id: maintenance.employee ? maintenance.employee.employee_ID : ''
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/maintenance/delete/${id}`);
      setMaintenances(maintenances.filter(maintenance => maintenance.maintenance_ID !== id));
    } catch (error) {
      console.error('Error deleting maintenance:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Manage Maintenance</h2>
      <form onSubmit={handleFormSubmit} style={styles.form}>
       
        <div style={styles.formGroup}>
          <label style={styles.label}>Maintenance Type:</label>
          <input
            type="text"
            name="maintenance_type"
            value={formData.maintenance_type}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Maintenance Date:</label>
          <input
            type="date"
            name="maintenance_date"
            value={formData.maintenance_date}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Car ID:</label>
          <select
            name="car_id"
            value={formData.car_id}
            onChange={handleInputChange}
            required
            style={styles.input}
          >
            <option value="" disabled>Select Car</option>
            {cars.map((car) => (
              <option key={car.car_ID} value={car.car_ID}>{car.car_ID}</option>
            ))}
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Maintenance Cost:</label>
          <input
            type="number"
            name="maintenance_cost"
            value={formData.maintenance_cost}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Employee ID:</label>
          <select
            name="employee_id"
            value={formData.employee_id}
            onChange={handleInputChange}
            required
            style={styles.input}
          >
            <option value="" disabled>Select Employee</option>
            {employees.map((employee) => (
              <option key={employee.employee_ID} value={employee.employee_ID}>{employee.employee_ID}</option>
            ))}
          </select>
        </div>
        <button type="submit" style={styles.button}>
          {isEditing ? 'Update Maintenance' : 'Add Maintenance'}
        </button>
      </form>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Maintenance ID</th>
            <th style={styles.th}>Maintenance Type</th>
            <th style={styles.th}>Maintenance Date</th>
            <th style={styles.th}>Car ID</th>
            <th style={styles.th}>Maintenance Cost</th>
            <th style={styles.th}>Employee ID</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {maintenances.map(maintenance => (
            <tr key={maintenance.maintenance_ID}>
              <td style={styles.td}>{maintenance.maintenance_ID}</td>
              <td style={styles.td}>{maintenance.maintenance_type}</td>
              <td style={styles.td}>{maintenance.maintenance_date}</td>
              <td style={styles.td}>{maintenance.car ? maintenance.car.car_ID : 'N/A'}</td>
              <td style={styles.td}>{maintenance.maintenance_cost}</td>
              <td style={styles.td}>{maintenance.employee ? maintenance.employee.employee_ID : 'N/A'}</td>
              <td style={styles.td}>
                <button
                  style={styles.editButton}
                  onClick={() => handleEdit(maintenance)}
                >
                  Edit
                </button>
                <button
                  style={styles.deleteButton}
                  onClick={() => handleDelete(maintenance.maintenance_ID)}
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

export default Maintenance;
