import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <Button type="submit" colorScheme="purple" size="md" variant="solid" onClick={() => navigate('/browseevents')}>
      Go to Browse Events
    </Button>
  );
};

export default HomePage;
