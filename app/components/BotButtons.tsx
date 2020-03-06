import React from 'react';
import { Client } from 'tmi.js';

const getRandomisedString = () =>
  Math.random()
    .toString(36)
    .substring(7);

const say = (
  client: Client,
  channel: string,
  command: string,
  randomise = true
) => {
  const sentCommand = randomise
    ? `${command} ${getRandomisedString()}`
    : command;
  return client.say(channel, sentCommand);
};

const commands = [
  'drive',
  'back',
  'right',
  'left',
  'jump',
  'boost',
  '1',
  '2',
  '3',
  '4',
  'bcam',
  'lookback',
  'item'
];

type Props = {
  client: Client;
  channel: string;
};

export default function BotButtons(props: Props) {
  const { client, channel } = props;
  return (
    <div className="list-group">
      {commands.map(command => (
        <button
          key={command}
          type="button"
          className="list-group-item list-group-item-action"
          onClick={() => say(client, channel, command)}
        >
          {command}
        </button>
      ))}
    </div>
  );
}
