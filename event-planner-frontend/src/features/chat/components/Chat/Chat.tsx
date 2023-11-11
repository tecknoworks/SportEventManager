import React, { useState, useEffect } from 'react';
import {
  connect,
  sendMessage,
  registerMessageReceived,
  disconnect,
  registerUnauthorizedAccessHandler,
} from 'services/signalService';
import PrimaryButton from '../../../../common/components/buttons/PrimaryButton';
import { Box } from '@chakra-ui/layout';

type Message = {
  userId: string;
  message: string;
};

const Chat: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    connect();

    const messageReceived = (userId: string, message: string) => {
      setMessages((messages) => [...messages, { userId, message }]);
    };

    registerMessageReceived(messageReceived);

    const handleUnauthorizedAccess = (message: string) => {
      console.error(message);
    };

    registerUnauthorizedAccessHandler(handleUnauthorizedAccess);

    return () => {
      disconnect();
    };
  }, []);

  const handleSend = (): void => {
    sendMessage(message, 'BBEE10D5-F626-4ECE-0D21-08DBE1E2DBDF');
    setMessage('');
  };

  return (
    <Box display="flex" gap="2rem" flexDirection="column">
      <ul>
        {messages.map((m, index) => (
          <li key={index}>
            <b>{m.userId}:</b> {m.message}
          </li>
        ))}
      </ul>
      <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." />
      <PrimaryButton text="Send" onClick={handleSend} />
    </Box>
  );
};

export default Chat;
