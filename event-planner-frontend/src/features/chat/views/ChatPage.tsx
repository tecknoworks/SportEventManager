import { Box, Text } from '@chakra-ui/layout';
import { useEffect, useState } from 'react';
import ChatsList from '../components/ChatsList/ChatsList';
import IndividualChat from '../components/IndividualChat/IndividualChat';
import ChatSearch from '../components/ChatSearch/ChatSearch';
import { ChatDetails } from '../api/dtos/dtos';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'redux/store';
import { getChatsDetailsThunk } from '../store/thunks/getChatsDetailsThunk';
import { selectChatsDetails } from '../store/selectors/chatSelector';
import { connect, disconnect } from 'services/signalService';

const ChatPage = () => {
  const chats = useSelector(selectChatsDetails);
  const dispatch: AppDispatch = useDispatch();
  const [selectedChatDetails, setSelectedChatDetails] = useState<ChatDetails>();
  const [foundChats, setFoundChats] = useState<ChatDetails[]>([]);

  useEffect(() => {
    dispatch(getChatsDetailsThunk());
  }, []);

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, []);

  return (
    <Box className="mybox" display="flex" gap="2rem" padding="2rem" height="100%">
      <Box display="flex" flexDirection="column" justifyContent="center" gap="1rem">
        <ChatSearch allChats={chats} setFoundChats={setFoundChats} />
        <ChatsList
          lastMessage={{ username: 'ana', chatId: '2', userId: '123', messageText: 'am mere', date: '' }}
          chats={foundChats}
          selectedChatDetails={selectedChatDetails}
          setSelectedChatDetails={setSelectedChatDetails}
        />
      </Box>
      <IndividualChat chatDetails={selectedChatDetails} />
    </Box>
  );
};

export default ChatPage;
