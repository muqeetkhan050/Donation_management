import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import { useLocation } from 'react-router-dom';
import CreateCause from './CreateCause';

const CausesPage = () => {
  const [causes, setCauses] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchCauses = async () => {
      try {
        const res = await axiosInstance.get('/api/causes');
        setCauses(res.data);
      } catch (err) {
        console.error('Failed to fetch causes:', err);
      }
    };
    fetchCauses();
  }, []);

  // Add new cause from redirect (if present)
  useEffect(() => {
    if (location.state?.newCause) {
      setCauses(prev => [location.state.newCause, ...prev]);
    }
  }, [location.state]);

  const handleCauseCreated = (newCause) => {
    setCauses(prev => [newCause, ...prev]);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <CreateCause onCauseCreated={handleCauseCreated} />
      <h2 style={{ marginTop: '30px', color: '#1a73e8' }}>Donation Causes</h2>
      {causes.length === 0 && <p>No causes yet.</p>}
      {causes.map((cause) => (
        <div key={cause._id} style={{
          border: '1px solid #ccc',
          borderRadius: '10px',
          padding: '15px',
          marginTop: '15px',
          background: '#f9f9f9',
        }}>
          <h3 style={{ color: '#1a73e8' }}>{cause.title}</h3>
          <p>{cause.description}</p>
          <p><strong>Goal:</strong> ${cause.goalAmount}</p>
        </div>
      ))}
    </div>
  );
};

export default CausesPage;

