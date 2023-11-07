import React from 'react';
import { FormControl, FormLabel, Select } from '@chakra-ui/react';
import { SkillLevel } from 'features/event/api/models';

interface SkillLevelFieldProps {
  skillLevel: number;
  onChange: (e: any) => void;
}

const SkillLevelField: React.FC<SkillLevelFieldProps> = ({ skillLevel, onChange }) => {
  return (
    <FormControl isRequired>
      <FormLabel>Skill Level</FormLabel>
      <Select placeholder="Select skill level" value={skillLevel} onChange={onChange}>
        <option value={SkillLevel.Beginner}>Beginner</option>
        <option value={SkillLevel.Intermediate}>Intermediate</option>
        <option value={SkillLevel.Advanced}>Advanced</option>
      </Select>
    </FormControl>
  );
};

export default SkillLevelField;
