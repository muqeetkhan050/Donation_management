import React, { useState } from 'react';
import axiosInstance from '../axiosConfig';

const CreateCause = ({ onCauseCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goalAmount, setGoalAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axiosInstance.post(
        '/api/causes',
        { title, description, goalAmount: Number(goalAmount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('Cause created successfully');

      // Reset form
      setTitle('');
      setDescription('');
      setGoalAmount('');

      // Update parent state if passed
      if (onCauseCreated) onCauseCreated(res.data);

    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create cause');
    }
  };

  return (
    <div style={styles.container}>
      {/* Heading */}
      <div style={styles.header}>
        <h1 style={styles.mainTitle}>Create and Manage Donations</h1>
        <p style={styles.subtitle}>Easily add new causes and track donations to make a positive impact.</p>
      </div>

      {/* Form Card */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Your Cause</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Cause Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={styles.input}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ ...styles.input, height: '100px', resize: 'none' }}
          />
          <input
            type="number"
            placeholder="Goal Amount"
            value={goalAmount}
            onChange={(e) => setGoalAmount(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Add Cause</button>
        </form>
      </div>
    </div>
  );
};

export default CreateCause;

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
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#1a73e8',
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
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
  },
  button: {
    padding: '12px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#1a73e8',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    transition: '0.3s',
  },
};
