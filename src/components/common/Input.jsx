import React from 'react';
import styles from './Input.module.css';

const Input = React.forwardRef(({ label, error, ...props }, ref) => {
  return (
    <div className={styles.inputGroup}>
      {label && <label className={styles.label}>{label}</label>}
      <input className={`${styles.input} ${error ? styles.error : ''}`} ref={ref} {...props} />
      {error && <p className={styles.errorMessage}>{error.message}</p>}
    </div>
  );
});

export default Input;