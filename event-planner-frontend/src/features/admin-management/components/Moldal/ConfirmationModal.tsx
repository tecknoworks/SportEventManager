import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

interface ConfirmationModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  confirmAction: 'delete' | 'sendEmail' | 'closeEvent' | null;
  handleConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  confirmAction,
  handleConfirm,
}) => {
  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm Action</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {confirmAction === 'delete'
            ? 'Are you sure you want to delete this user?'
            : confirmAction === 'closeEvent'
            ? 'Are you sure you want to close this event?'
            : 'Are you sure you want to send a recovery email?'}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleConfirm}>
            Yes
          </Button>
          <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
            No
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
