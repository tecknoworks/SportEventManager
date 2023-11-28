import React from 'react';
import {
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { selectNotificationMessages } from 'common/components/NavigationMenu/store/notificationSelector';
import PrimaryButton from 'common/components/buttons/PrimaryButton';

interface NotificationsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Notifications: React.FC<NotificationsProps> = ({ isOpen, onClose }) => {
  const notificationMessages = useSelector(selectNotificationMessages);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent height="500px">
        <ModalHeader>Notifications</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="auto">
          {notificationMessages.map((notification, index) => (
            <React.Fragment key={index}>
              <Text padding="10px">{notification}</Text>
              {index < notificationMessages.length - 1 && <Divider />}
            </React.Fragment>
          ))}
          {notificationMessages.length === 0 && <Text>You have no new notifications!</Text>}
        </ModalBody>
        <ModalFooter>
          <PrimaryButton text={'Close'} onClick={onClose} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Notifications;
