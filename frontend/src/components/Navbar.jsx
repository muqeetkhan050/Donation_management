

import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <h1 style={styles.logo}>Create and Manage Cause</h1>
      <div style={styles.links}>
        <Link to="/login" style={styles.link}>Login</Link>
        <Link to="/register" style={styles.link}>Register</Link>
       <Link to="/my-cause" style={styles.link}>My Causes</Link>{/* Changed here */}
        <Link to="/create-cause" style={styles.link}>Create Cause</Link>
        <Link to="/causes" style={styles.link}>View Causes</Link>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    backgroundColor: '#1a73e8',
    color: '#fff',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  links: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: '500',
  },
};

export default Navbar;
