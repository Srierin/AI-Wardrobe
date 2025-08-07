import React from 'react';
import styles from './CustomToast.module.css';

const CustomToast = ({ message, type = 'default' }) => {
  const toastClass = type === 'error' 
    ? `${styles.toast} ${styles.toastError}` 
    : styles.toast;

  return (
    <div className={toastClass}>
      {message}
    </div>
  );
};

export default CustomToast;