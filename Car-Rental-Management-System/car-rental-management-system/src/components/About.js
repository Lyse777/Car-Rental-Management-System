import React from 'react';

const AboutUs = () => {
  const styles = {
    aboutUsSection: {
      backgroundColor: '#f8f9fa',
      marginTop: '7%',
      color: '#333',
    },
    sectionTitle: {
      fontSize: '2.5rem',
      color: 'black',
    },
    sectionSubtitle: {
      fontSize: '2rem',
      color: 'black',
    },
    leadText: {
      fontSize: '1.2rem',
      fontWeight: '400',
      color: '#555',
    },
    missionList: {
      marginBottom: '10px',
      fontSize: '1.1rem',
      lineHeight: '1.6',
    },
    missionListStrong: {
      color: '#343a40',
    },
    textLogo: {
      fontSize: '4rem',  // Large text size for visual impact
      fontWeight: '700',  // Bold font weight to mimic a logo
      color: 'black',  // Brand color for text
      textAlign: 'center',  // Center-align text
      paddingTop: '20px',  // Padding on top to align with vertical centering
      transition: 'color 0.3s ease-in-out, text-shadow 0.3s ease-in-out',  // Smooth transition for hover effects
      cursor: 'pointer',  // Indicates the text is interactive
    },
    textLogoHover: {
      color: 'gray',  // Highlight color on hover
      textShadow: '2px 2px 8px rgba(0,0,0,0.2)',  // Subtle shadow for depth
    },
    alignItemsCenter: {
      alignItems: 'center',
    },
    rounded: {
      borderRadius: '0.25rem',
    },
    shadow: {
      boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
    },
  };

  const [hover, setHover] = React.useState(false);

  return (
    
    <div style={styles.aboutUsSection} className="container py-5">
      <div style={styles.alignItemsCenter} className="row">
        <div className="col-md-8">
          <h2 style={styles.sectionTitle}>About Us</h2>
          <p style={styles.leadText}>Welcome to Car Rental Management System, where we are dedicated to providing you with a seamless and enjoyable car rental experience. Whether you're traveling for business or pleasure, we strive to make your journey comfortable and convenient.</p>
        </div>
        <div className="col-md-4">
          <div
            style={{ ...styles.textLogo, ...(hover ? styles.textLogoHover : null) }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            CarRental
          </div>
        </div>
      </div>
      <hr />
      <div className="row mt-5">
        <div className="col-md-12">
          <h3 style={styles.sectionSubtitle}>Our Mission</h3>
          <p>We are on a mission to redefine the car rental experience by focusing on:</p>
          <ul>
            <li style={styles.missionList}><strong style={styles.missionListStrong}>Exceptional Service:</strong> We aim to exceed your expectations by delivering exceptional customer service at every touchpoint.</li>
            <li style={styles.missionList}><strong style={styles.missionListStrong}>Wide Selection:</strong> Choose from a wide range of vehicles to suit your needs, from compact cars to luxury sedans and SUVs.</li>
            <li style={styles.missionList}><strong style={styles.missionListStrong}>Affordable Pricing:</strong> We believe in transparent pricing and offer competitive rates to ensure you get the best value for your money.</li>
            <li style={styles.missionList}><strong style={styles.missionListStrong}>Convenience:</strong> With easy online booking and flexible rental options, renting a car with us is hassle-free.</li>
            <li style={styles.missionList}><strong style={styles.missionListStrong}>Quality and Safety:</strong> Your safety is our priority. We ensure that all our vehicles are well-maintained and undergo regular inspections for your peace of mind.</li>
            <li style={styles.missionList}><strong style={styles.missionListStrong}>Community and Sustainability:</strong> We are committed to contributing positively to our community and promoting sustainable practices in the car rental industry.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
