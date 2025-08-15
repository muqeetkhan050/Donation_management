import React, { useState } from 'react';
import axiosInstance from '../axiosConfig';

const AddCausePage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goalAmount, setGoalAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axiosInstance.post('/api/causes', {
      title,
      description,
      goalAmount
    });
    alert('Cause created successfully!');
    setTitle('');
    setDescription('');
    setGoalAmount('');
  };

  return (
    <div>
      <h2>Create Donation Cause</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Cause Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Cause Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Goal Amount"
          value={goalAmount}
          onChange={(e) => setGoalAmount(e.target.value)}
          required
        />
        <button type="submit">Create Cause</button>
      </form>
    </div>
  );
};

export default AddCausePage;
