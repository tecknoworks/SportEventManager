import { Box, useColorMode } from '@chakra-ui/react';
import NavigationMenu from 'common/components/NavigationMenu/NavigationMenu';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from 'services/auth/context/AuthContext';

const Layout = () => {
  
  const { colorMode } = useColorMode();
  const bgColor = colorMode === 'dark' ? '#495057' : 'linear(to-r, #610C9F, #E95793)'; 
  
  return (
    <AuthProvider>
      <Box height="100vh" display="flex" flexDirection="column">
        <NavigationMenu />
        <Box
          display="flex"
          flexDirection="column"
          overflowY="auto"
          flex="1"
          bg={bgColor}
        >
          <Outlet />
        </Box>
        {/* <Footer className={cn.mainFooter} /> */}
      </Box>
    </AuthProvider>
  );
};

export default Layout;
