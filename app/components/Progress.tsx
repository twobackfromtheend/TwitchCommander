import React from 'react';
import styles from './Progress.css';

export default function Progress() {
  return (
    <div className="text-center">
      <progress className={styles['pure-material-progress-circular']} />
    </div>
  );
}
