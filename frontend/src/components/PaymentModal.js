import React from 'react';

const PaymentModal = ({ cart, onClose }) => {
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2>Payment</h2>
        <ul style={styles.itemList}>
          {cart.map((item, index) => (
            <li key={index} style={styles.item}>
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
            </li>
          ))}
        </ul>
        <form style={styles.paymentForm}>
          <label>
            Card Number:
            <input type="text" name="cardNumber" required />
          </label>
          <label>
            Expiry Date:
            <input type="text" name="expiryDate" required />
          </label>
          <label>
            CVV:
            <input type="text" name="cvv" required />
          </label>
          <button type="submit" style={styles.submitButton}>Pay Now</button>
        </form>
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
  },
  itemList: {
    listStyleType: 'none',
    padding: '0',
    marginBottom: '20px',
  },
  item: {
    borderBottom: '1px solid #ddd',
    padding: '10px 0',
  },
  paymentForm: {
    display: 'flex',
    flexDirection: 'column',
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
