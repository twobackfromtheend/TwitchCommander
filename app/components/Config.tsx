import React, { useState } from 'react';
import * as electron from 'electron';

const getToken = () => {
  electron.shell.openExternal('https://twitchapps.com/tmi/');
};

type Props = {
  setBotOptions: (botOptions: BotProps) => void;
};

export default function Config(props: Props) {
  const { setBotOptions } = props;

  const [username, setUsername] = useState('');
  const [channel, setChannel] = useState('callumtheshogun');
  const [oAuthToken, setOAuthToken] = useState('');
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [botOptionsSet, setBotOptionsSet] = useState(false);
  const onSubmit = () => {
    setSubmitAttempted(true);
    if (username !== '' && oAuthToken !== '' && channel !== '') {
      setBotOptions({ username, channel, oAuthToken });
      setBotOptionsSet(true);
    } else {
      console.log('Did not start bot.');
    }
  };

  const inputsDisabled = botOptionsSet;

  const inputGroupClassName = 'input-group mb-2';
  return (
    <div className="card mb-3 dark">
      <div className="card-body">
        <h5 className="card-title mb-3">Config</h5>
        <form
          className={`needs-validation ${
            submitAttempted ? 'was-validated' : ''
          }`}
          noValidate
        >
          <div className="card-text">
            <div className={inputGroupClassName}>
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  Username
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                aria-label="Username"
                value={username}
                onChange={event => {
                  setUsername(event.target.value);
                }}
                required
                disabled={inputsDisabled}
              />
            </div>
            <div className={inputGroupClassName}>
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  Channel
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                aria-label="Channel"
                value={channel}
                onChange={event => {
                  setChannel(event.target.value.toLowerCase());
                }}
                disabled={inputsDisabled}
              />
            </div>
            <div className={inputGroupClassName}>
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  OAuth
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="oauth:GET_TOKEN"
                aria-label="oauth"
                value={oAuthToken}
                onChange={event => {
                  setOAuthToken(event.target.value);
                }}
                required
                disabled={inputsDisabled}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={getToken}
                >
                  Get Token
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={inputsDisabled ? undefined : onSubmit}
            disabled={inputsDisabled}
          >
            Connect
          </button>
        </form>
      </div>
    </div>
  );
}
