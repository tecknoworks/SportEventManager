import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
} from '@chakra-ui/react';
import PrimaryButton from 'common/components/buttons/PrimaryButton';
import { EventExtendedPosition } from 'features/browse-events/api/dtos';
import { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  eventPositions: EventExtendedPosition[];
  eventId: string;
  userId: string | undefined;
}

const JoinModal = ({ isOpen, onClose, eventPositions, eventId, userId }: Props) => {
  const [selectedPosition, setSelectedPosition] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPosition(event.target.value);
  };

  const handleJoinEvent = () => {
    console.log(selectedPosition);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Join Event</ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" flexDirection="column" alignItems="center">
          <Text color="purple">Are you sure you want to join the event?</Text>
          <br></br>
          <Select value={selectedPosition} onChange={handleChange}>
            {eventPositions &&
              eventPositions.map((position) => (
                <option key={position.positionId} value={position.positionId}>
                  {position.positionName} -- Available: {position.availablePositions}
                </option>
              ))}
          </Select>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <PrimaryButton text="Confirm and Join Event" onClick={handleJoinEvent} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default JoinModal;
