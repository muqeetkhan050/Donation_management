// // import React, { useState } from 'react';
// // import axiosInstance from '../axiosConfig';
// // import { useNavigate } from 'react-router-dom';

// // const CreateCause = () => {
// //   const [title, setTitle] = useState('');
// //   const [description, setDescription] = useState('');
// //   const [goalAmount, setGoalAmount] = useState('');
// //   const navigate = useNavigate(); // for redirect

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await axiosInstance.post('/api/causes', {
// //         title,
// //         description,
// //         goalAmount: Number(goalAmount),
// //       });

// //       alert('Cause created successfully');

// //       // Reset form
// //       setTitle('');
// //       setDescription('');
// //       setGoalAmount('');

// //       // Redirect to Causes page
// //       navigate('/causes'); 
// //     } catch (err) {
// //       alert(err.response?.data?.message || 'Failed to create cause');
// //     }
// //   };

// //   return (
// //     <div style={styles.container}>
// //       <div style={styles.card}>
// //         <h2 style={styles.title}>Create Cause</h2>
// //         <form onSubmit={handleSubmit} style={styles.form}>
// //           <input
// //             type="text"
// //             placeholder="Cause Title"
// //             value={title}
// //             onChange={(e) => setTitle(e.target.value)}
// //             required
// //             style={styles.input}
// //           />
// //           <textarea
// //             placeholder="Description"
// //             value={description}
// //             onChange={(e) => setDescription(e.target.value)}
// //             required
// //             style={{ ...styles.input, height: '100px', resize: 'none' }}
// //           />
// //           <input
// //             type="number"
// //             placeholder="Goal Amount"
// //             value={goalAmount}
// //             onChange={(e) => setGoalAmount(e.target.value)}
// //             required
// //             style={styles.input}
// //           />
// //           <button type="submit" style={styles.button}>Add Cause</button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // const styles = {
// //   container: {
// //     display: 'flex',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     height: '100vh',
// //     background: '#e6f0ff',
// //   },
// //   card: {
// //     background: '#ffffff',
// //     padding: '40px',
// //     borderRadius: '15px',
// //     boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
// //     width: '100%',
// //     maxWidth: '400px',
// //   },
// //   title: {
// //     textAlign: 'center',
// //     marginBottom: '30px',
// //     color: '#1a73e8',
// //     fontFamily: 'Arial, sans-serif',
// //   },
// //   form: {
// //     display: 'flex',
// //     flexDirection: 'column',
// //     gap: '15px',
// //   },
// //   input: {
// //     padding: '12px 15px',
// //     borderRadius: '10px',
// //     border: '1px solid #ccc',
// //     fontSize: '16px',
// //     outline: 'none',
// //     transition: '0.3s',
// //   },
// //   button: {
// //     padding: '12px',
// //     borderRadius: '10px',
// //     border: 'none',
// //     backgroundColor: '#1a73e8',
// //     color: '#fff',
// //     fontSize: '16px',
// //     cursor: 'pointer',
// //     transition: '0.3s',
// //   },
// // };

// // export default CreateCause;


// import React, { useState } from 'react';
// import axiosInstance from '../axiosConfig';
// import { useNavigate } from 'react-router-dom';

// const CreateCause = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [goalAmount, setGoalAmount] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axiosInstance.post('/api/causes', {
//         title,
//         description,
//         goalAmount: Number(goalAmount),
//       });

//       alert('Cause created successfully');
//       setTitle('');
//       setDescription('');
//       setGoalAmount('');
//       navigate('/causes');
//     } catch (err) {
//       alert(err.response?.data?.message || 'Failed to create cause');
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.left}>
//         <div style={styles.card}>
//           <h2 style={styles.title}>Create a New Cause</h2>
//           <p style={styles.subtitle}>Help make a difference by adding your donation cause.</p>
//           <form onSubmit={handleSubmit} style={styles.form}>
//             <input
//               type="text"
//               placeholder="Cause Title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//               style={styles.input}
//             />
//             <textarea
//               placeholder="Description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               required
//               style={{ ...styles.input, height: '100px', resize: 'none' }}
//             />
//             <input
//               type="number"
//               placeholder="Goal Amount"
//               value={goalAmount}
//               onChange={(e) => setGoalAmount(e.target.value)}
//               required
//               style={styles.input}
//             />
//             <button type="submit" style={styles.button}>Add Cause</button>
//           </form>
//         </div>
//       </div>
//       <div style={styles.right}>
//         <h1 style={styles.rightTitle}>Create and Manage Donations</h1>
//         <p style={styles.rightText}>
//           Easily add new causes, track donations, and help your community grow. 
//           Every contribution matters.
//         </p>
//         {/* Optional: add illustration/image */}
//         <div style={styles.imagePlaceholder}>🎁</div>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: 'flex',
//     height: '100vh',
//     fontFamily: 'Arial, sans-serif',
//   },
//   left: {
//     flex: 1,
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     background: '#e6f0ff',
//   },
//   right: {
//     flex: 1,
//     background: '#d0e4ff', // lighter blue
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: '50px',
//     color: '#1a3f6c',
//     textAlign: 'center',
//   },
//   card: {
//     background: '#ffffff',
//     padding: '40px',
//     borderRadius: '15px',
//     boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
//     width: '100%',
//     maxWidth: '400px',
//   },
//   title: {
//     textAlign: 'center',
//     marginBottom: '10px',
//     color: '#1a73e8',
//     fontSize: '28px',
//     fontWeight: 'bold',
//   },
//   subtitle: {
//     textAlign: 'center',
//     marginBottom: '25px',
//     color: '#555',
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '15px',
//   },
//   input: {
//     padding: '12px 15px',
//     borderRadius: '10px',
//     border: '1px solid #ccc',
//     fontSize: '16px',
//     outline: 'none',
//     transition: '0.3s',
//   },
//   button: {
//     padding: '12px',
//     borderRadius: '10px',
//     border: 'none',
//     backgroundColor: '#1a73e8',
//     color: '#fff',
//     fontSize: '16px',
//     cursor: 'pointer',
//     transition: '0.3s',
//   },
//   rightTitle: {
//     fontSize: '32px',
//     fontWeight: 'bold',
//     marginBottom: '20px',
//   },
//   rightText: {
//     fontSize: '18px',
//     marginBottom: '30px',
//     lineHeight: '1.6',
//   },
//   imagePlaceholder: {
//     fontSize: '50px',
//   },
// };

// export default CreateCause;

import React, { useState } from 'react';
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const CreateCause = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      await axiosInstance.post('/api/causes', {
        title,
        description,
        goalAmount: Number(goalAmount),
      });

      alert('Cause created successfully');
      setTitle('');
      setDescription('');
      setGoalAmount('');
      navigate('/causes');

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

    <div style={styles.container}>
      {/* Heading on top */}
      <div style={styles.header}>
        <h1 style={styles.mainTitle}>Create and Manage Donations</h1>
        <p style={styles.subtitle}>Easily add new causes and track donations to make a positive impact.</p>
      </div>

      {/* Form card */}
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
    color: '#1a73e8',
    fontWeight: 'bold',

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

    transition: '0.3s',

  },
};
