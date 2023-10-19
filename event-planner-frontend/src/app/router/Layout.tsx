import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <div>Navigation</div>
      <div>
        <Outlet />
      </div>
      {/* <Footer className={cn.mainFooter} /> */}
    </div>
  )
}

export default Layout
