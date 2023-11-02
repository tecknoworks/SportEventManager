import NavigationMenu from 'common/components/NavigationMenu/NavigationMenu';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from 'services/auth/context/AuthContext';

const Layout = () => {
  return (
    <AuthProvider>
      <NavigationMenu />
      <div>
        <Outlet />
      </div>
      {/* <Footer className={cn.mainFooter} /> */}
    </AuthProvider>
  );
};

export default Layout;
