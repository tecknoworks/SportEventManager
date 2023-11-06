import { Box } from '@chakra-ui/react';
import NavigationMenu from 'common/components/NavigationMenu/NavigationMenu';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from 'services/auth/context/AuthContext';

const Layout = () => {
  return (
    <AuthProvider>
      <Box bgGradient="linear(to-r, #610C9F, #E95793)">
        <NavigationMenu />
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          bgGradient="linear(to-r, #610C9F, #E95793)"
          paddingX="50px"
          overflowY="auto"
          height="calc(100vh - 64px)"
        >
          <Outlet />
        </Box>
        {/* <Footer className={cn.mainFooter} /> */}
      </Box>
    </AuthProvider>
  );
};

export default Layout;
