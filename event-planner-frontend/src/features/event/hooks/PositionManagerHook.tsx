import { useState } from 'react';
import { EventPosition } from '../api/models';
import { GetPositionForSportTypeDto } from '../api/dtos';

type UsePositionManagerHook = {
  selectedPositions: EventPosition[];
  handlePositionChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleAvailablePositionsChange: (positionId: string, value: string) => void;
  handleDeletePosition: (positionId: string) => void;
  setSelectedPositions: (positions: EventPosition[]) => void;
};

export const usePositionManager = (positionsForSportType: GetPositionForSportTypeDto[]): UsePositionManagerHook => {
  const [selectedPositions, setSelectedPositions] = useState<EventPosition[]>([]);

  const handlePositionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const positionId = event.target.value;
    const positionObj = positionsForSportType.find((p) => p.id === positionId);

    if (positionObj) {
      setSelectedPositions((prev) => {
        const isPositionAlreadySelected = prev.some((p) => p.positionId === positionObj.id);
        if (isPositionAlreadySelected) {
          return prev;
        }
        const newPosition: EventPosition = {
          positionId: positionObj.id,
          positionName: positionObj.name,
          availablePositions: 0,
        };

        return [...prev, newPosition];
      });
    }
  };

  const handleAvailablePositionsChange = (positionId: string, value: string) => {
    setSelectedPositions((prev) =>
      prev.map((pos) => (pos.positionId === positionId ? { ...pos, availablePositions: parseInt(value, 10) } : pos))
    );
  };

  const handleDeletePosition = (positionId: string) => {
    setSelectedPositions((prev) => prev.filter((p) => p.positionId !== positionId));
  };

  return {
    selectedPositions,
    setSelectedPositions,
    handlePositionChange,
    handleAvailablePositionsChange,
    handleDeletePosition,
  };
};
