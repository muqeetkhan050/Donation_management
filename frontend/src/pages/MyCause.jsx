import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';

const MyCause = () => {
  const [causes, setCauses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyCauses = async () => {
      try {
        const res = await axiosInstance.get('/api/causes/my');
        setCauses(res.data);
      } catch (err) {
        console.error('Failed to fetch my causes:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyCauses();
  }, []);

  if (loading) return <p>Loading your causes...</p>;

  if (causes.length === 0)
    return <p>You haven’t created any causes yet.</p>;

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ color: '#1a73e8' }}>My Causes</h2>
      {causes.map((cause) => (
        <div key={cause._id} style={{
          border: '1px solid #ccc',
          borderRadius: '10px',
          padding: '15px',
          marginTop: '15px',
          background: '#f9f9f9'
        }}>
          <h3 style={{ color: '#1a73e8' }}>{cause.title}</h3>
          <p>{cause.description}</p>
          <p><strong>Goal:</strong> ${cause.targetAmount}</p>
          <p><strong>Raised:</strong> ${cause.currentAmount}</p>
          {cause.imageUrl && (
            <img 
              src={cause.imageUrl} 
              alt={cause.title} 
              style={{ width: '100%', maxHeight: '250px', objectFit: 'cover', marginTop: '10px', borderRadius: '8px' }} 
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default MyCause;
