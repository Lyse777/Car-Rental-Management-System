import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Insurance = () => {
  const [insurances, setInsurances] = useState([]);
  const [formData, setFormData] = useState({
    insurance_ID: '',
    coverage_type: '',
    insurance_company: '',
    premium_amount: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  const coverageTypes = ['Medical_insurance'];
  const insuranceCompanies = ['sanlam', 'RADIANT'];

  useEffect(() => {
    fetchInsurances();
  }, []);

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
    if (isEditing) {
      try {
        await axios.put(`http://localhost:8080/insurance/update/${formData.insurance_ID}`, formData);
        fetchInsurances();
        setIsEditing(false);
        setFormData({ insurance_ID: '', coverage_type: '', insurance_company: '', premium_amount: '' });
      } catch (error) {
        console.error('Error updating insurance:', error);
      }
    } else {
      try {
        const response = await axios.post('http://localhost:8080/insurance/add', formData);
        setInsurances([...insurances, response.data]);
        setFormData({ insurance_ID: '', coverage_type: '', insurance_company: '', premium_amount: '' });
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  const handleEdit = (insurance) => {
    setFormData(insurance);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/insurance/delete/${id}`);
      setInsurances(insurances.filter(insurance => insurance.insurance_ID !== id));
    } catch (error) {
      console.error('Error deleting insurance:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Manage Insurances</h2>
      <form onSubmit={handleFormSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Insurance ID:</label>
          <input
            type="number"
            name="insurance_ID"
            value={formData.insurance_ID}
            onChange={handleInputChange}
            required
            style={styles.input}
            disabled={isEditing}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Coverage Type:</label>
          <select
            name="coverage_type"
            value={formData.coverage_type}
            onChange={handleInputChange}
            required
            style={styles.input}
          >
            <option value="" disabled>Select Coverage Type</option>
            {coverageTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Insurance Company:</label>
          <select
            name="insurance_company"
            value={formData.insurance_company}
            onChange={handleInputChange}
            required
            style={styles.input}
          >
            <option value="" disabled>Select Insurance Company</option>
            {insuranceCompanies.map((company) => (
              <option key={company} value={company}>{company}</option>
            ))}
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Premium Amount:</label>
          <input
            type="number"
            name="premium_amount"
            value={formData.premium_amount}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          {isEditing ? 'Update Insurance' : 'Add Insurance'}
        </button>
      </form>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Insurance ID</th>
            <th style={styles.th}>Coverage Type</th>
            <th style={styles.th}>Insurance Company</th>
            <th style={styles.th}>Premium Amount</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {insurances.map(insurance => (
            <tr key={insurance.insurance_ID}>
              <td style={styles.td}>{insurance.insurance_ID}</td>
              <td style={styles.td}>{insurance.coverage_type}</td>
              <td style={styles.td}>{insurance.insurance_company}</td>
              <td style={styles.td}>{insurance.premium_amount}</td>
              <td style={styles.td}>
                <button
                  style={styles.editButton}
                  onClick={() => handleEdit(insurance)}
                >
                  Edit
                </button>
                <button
                  style={styles.deleteButton}
                  onClick={() => handleDelete(insurance.insurance_ID)}
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
    maxWidth: '800px',
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

export default Insurance;
