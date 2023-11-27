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
import { EventExtendedPosition, JoinEventDto } from 'features/browse-events/api/dtos';
import { joinEventIsSuccess } from 'features/browse-events/store/selectors/eventsPageSelector';
import { joinEventThunk } from 'features/browse-events/thunks/joinEventsThunk';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'redux/store';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  eventPositions: EventExtendedPosition[];
  eventId: string;
  userId: string | undefined;
}

const JoinModal = ({ isOpen, onClose, eventPositions, eventId, userId }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [selectedPosition, setSelectedPosition] = useState<string>('');
  const isSuccess = useSelector(joinEventIsSuccess);
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPosition(event.target.value);
  };

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess]);

  const handleJoinEvent = async () => {
    const data: JoinEventDto = {
      userId: userId,
      eventId: eventId,
      eventPositionId: selectedPosition ? selectedPosition : undefined,
    };

    await dispatch(joinEventThunk(data));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Join Event</ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" flexDirection="column" alignItems="center">
          <Text color="purple">Are you sure you want to join the event?</Text>
          {eventPositions.length !== 0 && (
            <>
              <br></br>
              <Select value={selectedPosition} onChange={handleChange} placeholder="Select position">
                {eventPositions &&
                  eventPositions.map((position) => (
                    <option
                      key={position.positionId}
                      value={position.positionId}
                      disabled={position.availablePositions === 0}
                    >
                      {position.positionName} -- Available: {position.availablePositions}
                    </option>
                  ))}
              </Select>
            </>
          )}
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
