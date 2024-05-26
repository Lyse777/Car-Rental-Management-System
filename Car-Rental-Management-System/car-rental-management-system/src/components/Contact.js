import React from 'react';

const ContactUs = () => {
  const styles = {
    container: {
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      maxWidth: '700px',
      margin: '40px auto',
      padding: '20px',
      borderRadius: '12px',
      border: '5px solid lavender',
      lineHeight: '1.6',
      marginTop: '11%',
    },
    list: {
      listStyleType: 'none',
      padding: '0',
    },
    listItem: {
      marginBottom: '15px',
      fontSize: '1rem',
      
    },
    title: {
      textAlign: 'center',
      color: 'black',
      fontSize: '1.75rem',
      marginBottom: '20px',
    },
    mapContainer: {
      height: '300px',
      width: '100%',
      border: 'none',
    },
    mapHeader: {
      textAlign: 'center',
      color: 'black',
      fontSize: '1.5rem',
      marginTop: '40px',
      marginBottom: '10px',
    }
  };

  // Google Maps iframe URL for Kigali, Rwanda
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.06141830865!2d30.09163937910156!3d-1.9440690000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca6df4f5e3e2b%3A0x2c9f39ca32252aa0!2sKigali!5e0!3m2!1sen!2srw!4v1614001663997!5m2!1sen!2srw";

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Contact Us</h2>
      <ul style={styles.list}>
      <hr />    <br />
        <li style={styles.listItem}><b>Email:</b> carrental889@gmail.com</li>
        <li style={styles.listItem}><b>Phone:</b> +250 782 567 504</li>
        <li style={styles.listItem}><b>Address:</b> KK 567, Kigali, Rwanda</li>
        <li style={styles.listItem}><b>Office Hours:</b> 9:00 AM - 5:00 PM (Mon - sun)</li>
        <li style={styles.listItem}>Follow us on Social Media for updates and support</li>
      </ul>
      <br />
      <hr /> 
      <h2 style={styles.mapHeader}>Location</h2>
      <hr />
      <br />
      <iframe
       title="Google Map of Kigali, Rwanda"  // Title added for accessibility
        src={mapUrl}
        style={styles.mapContainer}
        allowFullScreen
        loading="lazy"
        
      />   
    </div>  
  );
};

export default ContactUs;
