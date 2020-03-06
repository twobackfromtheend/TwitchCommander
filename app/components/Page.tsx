import React, { useState } from 'react';
import Bot from './Bot';
import TOUModal from './TOUModal';
import Config from './Config';

export default function Page() {
  const [botOptions, setBotOptions] = useState(null as BotProps | null);

  return (
    <div className="m-3">
      <Config setBotOptions={setBotOptions} />

      {botOptions && (
        <Bot
          username={botOptions.username}
          channel={botOptions.channel}
          oAuthToken={botOptions.oAuthToken}
        />
      )}
      <TOUModal />
    </div>
  );
}
