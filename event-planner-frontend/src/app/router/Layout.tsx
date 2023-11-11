import { Box } from '@chakra-ui/react';
import NavigationMenu from 'common/components/NavigationMenu/NavigationMenu';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from 'services/auth/context/AuthContext';

const Layout = () => {
  return (
    <AuthProvider>
      <Box height="100vh" display="flex" flexDirection="column">
        <NavigationMenu />
        <Box
          display="flex"
          flexDirection="column"
          bgGradient="linear(to-r, #610C9F, #E95793)"
          paddingBottom="50px"
          overflowY="auto"
          flex="1"
        >
          <Outlet />
        </Box>
        {/* <Footer className={cn.mainFooter} /> */}
      </Box>
    </AuthProvider>
  );
};

export default Layout;
