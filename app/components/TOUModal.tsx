import React, { useState } from 'react';
import styles from './TOUModal.css';

export default function TOUModal() {
  const [hidden, setHidden] = useState(false);
  if (hidden) {
    return null;
  }
  return (
    <div className={styles['modal-wrapper']}>
      <div className={styles.modal}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Terms of Use</h5>
            </div>
            <div className="modal-body">
              <p>
                Misuse of this application may lead to severe consequences, such
                as but not limited to bans and other account limitations.
              </p>
              <p>
                Specifically, do not use this application to spam or otherwise
                interfere with a Twitch broadcast without explicit consent from
                the broadcaster.
              </p>
              <p>
                The creator of this application is not responsible for any and
                all consequences that result from the use of this application.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                onClick={() => setHidden(true)}
              >
                Agree
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
