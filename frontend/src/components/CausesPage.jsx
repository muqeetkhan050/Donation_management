

import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const CausesPage = () => {
  const [causes, setCauses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCause, setEditingCause] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    targetAmount: ''
  });
  const [error, setError] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [donationAmounts, setDonationAmounts] = useState({});
  
  const navigate = useNavigate();

  const fetchCauses = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axiosInstance.get('/api/causes');
      setCauses(response.data || []);
    } catch (err) {
      console.error('Failed to fetch causes:', err);
      setError(err.response?.data?.message || 'Failed to load causes');
      if (err.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchCauses();
  }, [refreshTrigger, fetchCauses]);

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleEdit = (cause) => {
    setEditingCause(cause._id);
    setEditForm({
      title: cause.title,
      description: cause.description,
      targetAmount: cause.targetAmount
    });
  };

  const handleCancelEdit = () => {
    setEditingCause(null);
    setEditForm({ title: '', description: '', targetAmount: '' });
  };

  const handleSaveEdit = async (causeId) => {
    try {
      const response = await axiosInstance.put(`/api/causes/${causeId}`, {
        ...editForm,
        targetAmount: Number(editForm.targetAmount)
      });
      
      setCauses(causes.map(cause => 
        cause._id === causeId ? response.data : cause
      ));
      setEditingCause(null);
      alert('✅ Cause updated successfully!');
    } catch (err) {
      console.error('Error updating cause:', err);
      alert(`❌ Error: ${err.response?.data?.message || 'Failed to update cause'}`);
      if (err.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  const handleDelete = async (causeId, causeTitle) => {
    const confirmed = window.confirm(
      `⚠️ Are you sure you want to delete "${causeTitle}"?`
    );
    
    if (confirmed) {
      try {
        await axiosInstance.delete(`/api/causes/${causeId}`);
        setCauses(causes.filter(cause => cause._id !== causeId));
        alert('✅ Cause deleted successfully!');
      } catch (err) {
        console.error('Error deleting cause:', err);
        alert(`❌ Error: ${err.response?.data?.message || 'Failed to delete cause'}`);
        if (err.response?.status === 401) {
          navigate('/login');
        }
      }
    }
  };

  const handleDonate = async (causeId) => {
    const amount = Number(donationAmounts[causeId]);
    if (!amount || amount <= 0) {
      alert('❌ Please enter a valid amount');
      return;
    }

    try {
      const response = await axiosInstance.post(`/api/causes/${causeId}/donate`, { amount });
      setCauses(causes.map(c => c._id === causeId ? response.data : c));
      setDonationAmounts(prev => ({ ...prev, [causeId]: '' }));
      alert(`✅ Thank you for donating $${amount}!`);
    } catch (err) {
      console.error('Donation failed:', err);
      alert(err.response?.data?.message || 'Donation failed');
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', fontSize: '18px', color: '#666' }}>
        <div style={{ marginBottom: '20px' }}>🔄 Loading causes...</div>
        <div style={{ fontSize: '14px', color: '#999' }}>Please wait while we fetch the latest data</div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      {error && (
        <div style={{
          backgroundColor: '#ffebee',
          color: '#c62828',
          padding: '15px',
          borderRadius: '4px',
          marginBottom: '20px',
          border: '1px solid #ef9a9a'
        }}>{error}</div>
      )}

      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#1a73e8', marginBottom: '10px', fontSize: '32px' }}>
          🎯 Donation Causes ({causes.length})
        </h1>
        <p style={{ color: '#666', fontSize: '16px', marginBottom: '25px' }}>
          Manage your causes, track donations, and make an impact
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/create-cause')}
            style={{
              padding: '12px 24px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '16px',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            ➕ Create New Cause
          </button>
          
          <button
            onClick={handleRefresh}
            style={{
              padding: '12px 24px',
              backgroundColor: '#17a2b8',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '16px',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {causes.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px', backgroundColor: '#f8f9fa', borderRadius: '15px', border: '2px dashed #dee2e6' }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>📋</div>
          <p style={{ fontSize: '24px', color: '#666', marginBottom: '10px', fontWeight: 'bold' }}>
            No causes found yet
          </p>
          <p style={{ fontSize: '16px', color: '#888', marginBottom: '25px' }}>
            Create your first cause to start making a difference!
          </p>
          <button
            onClick={() => navigate('/create-cause')}
            style={{
              padding: '15px 30px',
              backgroundColor: '#1a73e8',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}
          >
            🚀 Get Started
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '25px' }}>
          {causes.map((cause, index) => (
            <div key={cause._id} style={{
              border: '2px solid #e3f2fd',
              borderRadius: '15px',
              padding: '25px',
              backgroundColor: '#fff',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-10px',
                left: '20px',
                backgroundColor: '#1a73e8',
                color: 'white',
                padding: '5px 12px',
                borderRadius: '15px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>#{index + 1}</div>

              {/* Cover Image */}
              {cause.image && (
                <img 
                  src={`http://localhost:5001/${cause.image}`} 
                  alt={cause.title} 
                  style={{
                    width: '100%',
                    height: '220px',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    marginBottom: '15px'
                  }}
                />
              )}

              {editingCause === cause._id ? (
                <div style={{ paddingTop: '10px' }}>
                  {/* Editing form ... (same as before) */}
                  <h4 style={{ color: '#1a73e8', marginBottom: '15px' }}>✏️ Editing Cause</h4>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                    placeholder="Cause Title"
                    style={{
                      width: '100%',
                      padding: '12px',
                      marginBottom: '12px',
                      border: '2px solid #1a73e8',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      boxSizing: 'border-box'
                    }}
                  />
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                    placeholder="Description"
                    style={{
                      width: '100%',
                      padding: '12px',
                      marginBottom: '12px',
                      border: '2px solid #1a73e8',
                      borderRadius: '8px',
                      minHeight: '100px',
                      resize: 'vertical',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                  <input
                    type="number"
                    value={editForm.targetAmount}
                    onChange={(e) => setEditForm({...editForm, targetAmount: e.target.value})}
                    placeholder="Target Amount"
                    min="1"
                    style={{
                      width: '200px',
                      padding: '12px',
                      marginBottom: '20px',
                      border: '2px solid #1a73e8',
                      borderRadius: '8px',
                      fontSize: '16px'
                    }}
                  />
                  <div>
                    <button
                      onClick={() => handleSaveEdit(cause._id)}
                      style={{
                        padding: '12px 24px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        marginRight: '12px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '14px'
                      }}
                    >
                      ✅ Save Changes
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      style={{
                        padding: '12px 24px',
                        backgroundColor: '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      ❌ Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ paddingTop: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                    <h3 style={{ color: '#1a73e8', marginBottom: '0', fontSize: '24px', flex: 1, lineHeight: '1.2' }}>{cause.title}</h3>
                    <div style={{ display: 'flex', gap: '8px', marginLeft: '20px' }}>
                      <button
                        onClick={() => handleEdit(cause)}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#ffc107',
                          color: '#000',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          fontSize: '13px'
                        }}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(cause._id, cause.title)}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          fontSize: '13px'
                        }}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>

                  <p style={{ color: '#555', marginBottom: '20px', fontSize: '16px', lineHeight: '1.6', backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '8px', border: '1px solid #e9ecef' }}>
                    {cause.description}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
                    <div style={{ backgroundColor: '#e8f5e8', padding: '8px 12px', borderRadius: '8px', border: '1px solid #28a745' }}>
                      <strong style={{ color: '#28a745' }}>🎯 Target: </strong>
                      <span style={{ fontSize: '18px', fontWeight: 'bold' }}>${cause.targetAmount?.toLocaleString()}</span>
                    </div>
                    <div style={{ backgroundColor: '#e3f2fd', padding: '8px 12px', borderRadius: '8px', border: '1px solid #1a73e8' }}>
                      <strong style={{ color: '#1a73e8' }}>💰 Raised: </strong>
                      <span style={{ fontSize: '18px', fontWeight: 'bold' }}>${(cause.currentAmount || 0).toLocaleString()}</span>
                    </div>
                  </div>

                  <div style={{ width: '100%', backgroundColor: '#e9ecef', borderRadius: '12px', overflow: 'hidden', height: '25px', marginBottom: '10px', border: '1px solid #dee2e6', position: 'relative' }}>
                    <div style={{
                      width: `${Math.min((cause.currentAmount || 0) / cause.targetAmount * 100, 100)}%`,
                      backgroundColor: '#1a73e8',
                      height: '100%',
                      borderRadius: '12px',
                      transition: 'width 0.5s ease'
                    }}></div>
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      color: '#333',
                      textShadow: '0 0 3px rgba(255,255,255,0.8)'
                    }}>
                      {Math.round((cause.currentAmount || 0) / cause.targetAmount * 100)}%
                    </div>
                  </div>

                  {/* Donation Section */}
                  <div style={{ marginTop: '10px', display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <input
                      type="number"
                      placeholder="Enter amount"
                      value={donationAmounts[cause._id] || ''}
                      onChange={(e) => setDonationAmounts({ ...donationAmounts, [cause._id]: e.target.value })}
                      min="1"
                      style={{
                        padding: '8px 12px',
                        border: '1px solid #ccc',
                        borderRadius: '6px',
                        width: '120px'
                      }}
                    />
                    <button
                      onClick={() => handleDonate(cause._id)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#1a73e8',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                      }}
                    >
                      💵 Donate
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginTop: '15px' }}>
                    <span style={{ fontSize: '16px', color: '#666', fontWeight: 'bold', backgroundColor: '#f1f3f4', padding: '5px 10px', borderRadius: '15px' }}>
                      📊 {Math.round((cause.currentAmount || 0) / cause.targetAmount * 100)}% funded
                    </span>
                    <span style={{ fontSize: '13px', color: '#888', backgroundColor: '#f8f9fa', padding: '4px 8px', borderRadius: '12px' }}>
                      📅 {new Date(cause.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CausesPage;
