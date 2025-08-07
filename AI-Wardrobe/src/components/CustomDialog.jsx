import React from 'react';
import styles from './CustomDialog.module.css';

const CustomDialog = ({
  visible,
  title,
  message,
  confirmText = '确定',
  cancelText = '取消',
  onConfirm,
  onCancel
}) => {
  if (!visible) return null;

  return (
    <div className={styles.dialogOverlay}>
      <div className={styles.dialogContainer}>
        {title && <div className={styles.dialogTitle}>{title}</div>}
        {message && <div className={styles.dialogMessage}>{message}</div>}
        
        <div className={styles.dialogActions}>
          <button className={styles.dialogButton} onClick={onCancel}>
            {cancelText}
          </button>
          <button 
            className={`${styles.dialogButton} ${styles.dialogConfirm}`} 
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomDialog;