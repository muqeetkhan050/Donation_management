import React, { useState } from 'react';
import axios from 'axios';

const CreateCause = ({ onCauseCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goalAmount, setGoalAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:5001/api/causes',
        { title, description, goalAmount: Number(goalAmount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Cause created successfully');
      setTitle('');
      setDescription('');
      setGoalAmount('');
      onCauseCreated(res.data);
    } catch (err) {
      alert('Failed to create cause');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Cause</h2>
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

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#e6f0ff', // light blue background
  },
  card: {
    background: '#ffffff',
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#1a73e8', // modern blue
    fontFamily: 'Arial, sans-serif',
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
    transition: '0.3s',
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
  }
};

export default CreateCause;
