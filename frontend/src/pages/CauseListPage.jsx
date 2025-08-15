import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';

const CauseListPage = () => {
  const [causes, setCauses] = useState([]);
  const [donationAmount, setDonationAmount] = useState({});

  useEffect(() => {
    fetchCauses();
  }, []);

  const fetchCauses = async () => {
    const res = await axiosInstance.get('/api/causes');
    setCauses(res.data);
  };

  const handleDonate = async (id) => {
    if (!donationAmount[id]) return alert('Enter donation amount');
    await axiosInstance.post(`/api/causes/${id}/donate`, { amount: donationAmount[id] });
    fetchCauses();
  };

  const handleDelete = async (id) => {
    await axiosInstance.delete(`/api/causes/${id}`);
    fetchCauses();
  };

  return (
    <div>
      <h2>Donation Causes</h2>
      {causes.map((cause) => (
        <div key={cause._id} style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
          <h3>{cause.title}</h3>
          <p>{cause.description}</p>
          <p>Goal: ${cause.goalAmount}</p>
          <p>Donated: ${cause.donatedAmount}</p>
          <input
            type="number"
            placeholder="Enter amount"
            value={donationAmount[cause._id] || ''}
            onChange={(e) => setDonationAmount({ ...donationAmount, [cause._id]: e.target.value })}
          />
          <button onClick={() => handleDonate(cause._id)}>Donate</button>
          <button onClick={() => handleDelete(cause._id)} style={{ marginLeft: '5px', color: 'red' }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default CauseListPage;
