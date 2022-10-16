import { Outlet } from 'react-router-dom';

import '@common/layout/Nav.css';
import Nav from '@common/layout/Nav';

const Layout = () => {
    return (
        <>
            <Nav />
            <Outlet />
        </>
    );
}

export default Layout;