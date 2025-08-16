

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const CreateCause = ({ onCauseCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetAmount: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Detailed debugging
    console.log('=== CREATE CAUSE DEBUG ===');
    console.log('Form data:', formData);
    console.log('Token check:', localStorage.getItem('userToken'));
    console.log('User info:', localStorage.getItem('userInfo'));
    console.log('All localStorage:', Object.keys(localStorage));

    try {
      const payload = {
        ...formData,
        targetAmount: Number(formData.targetAmount)
      };
      
      console.log('Sending payload:', payload);

      const response = await axiosInstance.post('/api/causes', payload);

      console.log('Success response:', response.data);
      alert('✅ Cause created successfully!');
      if (onCauseCreated) onCauseCreated(response.data);
      navigate('/causes');
      
    } catch (err) {
      console.log('=== DETAILED ERROR INFO ===');
      console.log('Error object:', err);
      console.log('Error name:', err.name);
      console.log('Error message:', err.message);
      console.log('Error code:', err.code);
      console.log('Error status:', err.response?.status);
      console.log('Error response data:', err.response?.data);
      console.log('Error response headers:', err.response?.headers);
      console.log('Error config:', err.config);
      console.log('Request headers:', err.config?.headers);
      
      // Set user-friendly error message
      let errorMessage = 'Something went wrong. Please try again.';
      
      if (err.response) {
        // Server responded with error status
        errorMessage = err.response.data?.message || `Server error: ${err.response.status}`;
      } else if (err.request) {
        // Request was made but no response received
        errorMessage = 'No response from server. Please check your connection.';
      } else {
        // Something else happened
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Debug Panel - Remove this in production */}
      <div style={{
        backgroundColor: '#f0f0f0',
        padding: '10px',
        margin: '10px',
        borderRadius: '5px',
        fontSize: '12px',
        fontFamily: 'monospace'
      }}>
        <strong>Debug Info:</strong><br/>
        Token: {localStorage.getItem('userToken') ? '✅ Present' : '❌ Missing'}<br/>
        Form Valid: {formData.title && formData.description && formData.targetAmount ? '✅ Yes' : '❌ No'}
      </div>

      {/* Heading */}
      <div style={styles.header}>
        <h1 style={styles.mainTitle}>Create and Manage Donations</h1>
        <p style={styles.subtitle}>Easily add new causes and track donations to make a positive impact.</p>
      </div>

      {/* Error Message */}
      {error && (
        <div style={{
          backgroundColor: '#ffebee',
          color: '#c62828',
          padding: '15px',
          borderRadius: '4px',
          margin: '0 auto 20px',
          maxWidth: '450px',
          border: '1px solid #ef9a9a'
        }}>
          {error}
        </div>
      )}

      {/* Form Card */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Your Cause</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="title"
            placeholder="Cause Title"
            value={formData.title}
            onChange={handleChange}
            required
            disabled={loading}
            style={{
              ...styles.input,
              backgroundColor: loading ? '#f5f5f5' : 'white'
            }}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            disabled={loading}
            style={{ 
              ...styles.input, 
              height: '100px', 
              resize: 'none',
              backgroundColor: loading ? '#f5f5f5' : 'white'
            }}
          />
          <input
            type="number"
            name="targetAmount"
            placeholder="Target Amount ($)"
            value={formData.targetAmount}
            onChange={handleChange}
            required
            min="1"
            disabled={loading}
            style={{
              ...styles.input,
              backgroundColor: loading ? '#f5f5f5' : 'white'
            }}
          />
          <button 
            type="submit" 
            disabled={loading}
            style={{
              ...styles.button,
              backgroundColor: loading ? '#ccc' : '#1a73e8',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? '⏳ Creating...' : '✚ Add Cause'}
          </button>
        </form>

        {/* Navigation back to causes */}
        <div style={styles.navigation}>
          <button 
            onClick={() => navigate('/causes')}
            style={styles.backButton}
            disabled={loading}
          >
            ← View All Causes
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '50px 20px',
    background: '#f0f4fa',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  mainTitle: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#1a73e8',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '18px',
    color: '#555',
  },
  card: {
    background: '#ffffff',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '450px',
  },
  cardTitle: {
    textAlign: 'center',
    marginBottom: '25px',
    fontSize: '28px',
    fontWeight: '700',
    color: '#1a73e8',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '12px 15px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  button: {
    padding: '12px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#1a73e8',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  navigation: {
    marginTop: '20px',
    textAlign: 'center',
  },
  backButton: {
    padding: '10px 20px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
  }
};

export default CreateCause;