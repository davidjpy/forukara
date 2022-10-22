import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import '@common/layout/Layout.css';
import SplashNav from '@common/layout/SplashNav';

const Layout: FC = () => {
    return (
        <>
            <SplashNav />
            <Outlet />
        </>
    );
}

export default Layout;