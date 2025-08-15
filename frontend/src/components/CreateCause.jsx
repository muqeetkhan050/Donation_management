import React, { useState } from 'react';
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const CreateCause = ({ onCauseCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axiosInstance.post(
        '/api/causes',
        { title, description, goalAmount: Number(goalAmount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (onCauseCreated) {
        onCauseCreated(res.data); // update parent state if needed
      }

      // Redirect to causes page
      navigate('/causes', { state: { newCause: res.data } });

    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create cause');
    }
  };

  return (
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
  );
};

export default CreateCause;

const styles = {
  card: {
    background: '#ffffff',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '25px',
    color: '#1a73e8',
    fontSize: '28px',      // bigger font
    fontWeight: '700',     // bold
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", // modern font
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)', // subtle shadow
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
  },
};
