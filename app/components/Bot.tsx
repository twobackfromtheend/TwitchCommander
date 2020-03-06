import React, { useEffect, useState } from 'react';
import { client } from 'tmi.js';
import Progress from './Progress';
import BotButtons from './BotButtons';

type UserState = {
  badges: { string: string };
  color: string;
  'display-name': string;
  emotes: { string: string[] };
  mod: boolean;
  'room-id': string;
  subscriber: boolean;
  turbo: boolean;
  'user-id': string;
  'user-type': string;
  'emotes-raw': string;
  'badges-raw': string;
  username: string;
  'message-type': string;
};

type MessageHandler = (
  channel: string,
  userstate: UserState,
  message: string,
  self: boolean
) => void;

const OnMessage: MessageHandler = (channel, userstate, message, self) => {
  if (self) return;
  console.log(
    `Received message on ${channel}: ${message} (Type: ${userstate['message-type']})`
  );
};

export default function Bot(props: BotProps) {
  const { username, oAuthToken, channel } = props;

  const [tmiClient, setTmiClient] = useState(null as any);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null as any);

  // eslint-disable-next-line new-cap
  useEffect(() => {
    if (tmiClient === null) {
      const opts = {
        identity: {
          username,
          password: oAuthToken
        },
        channels: [channel]
      };
      // eslint-disable-next-line new-cap
      const newClient = new client(opts);
      newClient.on('connected', () => setConnected(true));
      newClient.on('message', OnMessage);
      newClient.connect().catch((e: string) => {
        setError(e);
      });
      setTmiClient(newClient);
    }
  });

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title mb-3">Commander</h5>
        {!connected &&
          (error ? (
            <>
              <p className="card-text">
                Error:&nbsp;
                {error}
              </p>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => window.location.reload()}
              >
                Reload page
              </button>
            </>
          ) : (
            <Progress />
          ))}
        {connected && tmiClient && (
          <BotButtons client={tmiClient} channel={channel} />
        )}
      </div>
      <div className="card-footer text-muted">
        Status:&nbsp;
        {connected ? 'Connected.' : 'Not connected.'}
      </div>
    </div>
  );
}
