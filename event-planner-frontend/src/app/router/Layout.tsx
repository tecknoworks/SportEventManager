import NavigationMenu from 'common/components/NavigationMenu/NavigationMenu';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <NavigationMenu />
      <div>
        <Outlet />
      </div>
      {/* <Footer className={cn.mainFooter} /> */}
    </div>
  );
};

export default Layout;
