import { Box } from '@chakra-ui/layout';
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
import AssistantChat from '../components/AssistantChat/AssistantChat';

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
          chats={foundChats}
          selectedChatDetails={selectedChatDetails}
          setSelectedChatDetails={setSelectedChatDetails}
        />
      </Box>
      {selectedChatDetails?.id !== 'GPT' && <IndividualChat chatDetails={selectedChatDetails} />}
      {selectedChatDetails?.id === 'GPT' && <AssistantChat chatDetails={selectedChatDetails} />}
    </Box>
  );
};

export default ChatPage;
