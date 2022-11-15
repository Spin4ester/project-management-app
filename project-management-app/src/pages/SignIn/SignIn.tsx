import React from 'react';
import styles from './SignIn.module.css';

export function SignIn() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h4>Account Login</h4>
        <input className={styles.input} placeholder="Login" type="text" />
        <input className={styles.input} placeholder="Password" type="password" />
        <button className={styles.button}>Sign In</button>
        <div className={styles.signup}>
          <h6>Don&apos;t have account yet?</h6>
          <button className={styles.button}>Sign Up</button>
        </div>
      </div>
    </div>
  );
}
