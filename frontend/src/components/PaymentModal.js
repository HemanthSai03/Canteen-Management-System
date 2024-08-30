import React from 'react';

const PaymentModal = ({ onClose }) => {
  const handlePayment = () => {
    // Redirect to the Razorpay payment link
    window.open('https://razorpay.me/@hemanthsaiv', '_blank');
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2>Payment</h2>
        <p>Click the button below to proceed to payment.</p>
        <button onClick={handlePayment} style={styles.submitButton}>
          Pay Now
        </button>
        <button onClick={onClose} style={styles.closeButton}>Close</button>
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1001,
  },
  modalContent: {
    backgroundColor: 'black',
    padding: '20px',
    borderRadius: '8px',
    width: '400px',
    maxWidth: '90%',
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    marginTop: '10px',
  },
  closeButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    marginTop: '10px',
  },
};

export default PaymentModal;
