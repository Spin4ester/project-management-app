import React from 'react';
import styles from './SignUp.module.css';

export function SignUp() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h4>Account Registration</h4>
        <input className={styles.input} placeholder="Login" type="text" />
        <input className={styles.input} placeholder="Password" type="password" />
        <input className={styles.input} placeholder="Confirm Password" type="password" />
        <button className={styles.button}>Sign Up</button>
        <div className={styles.signup}>
          <h6>Already a member?</h6>
          <button className={styles.button}>Sign In</button>
        </div>
      </div>
    </div>
  );
}
