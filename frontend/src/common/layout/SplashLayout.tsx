import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import '@common/layout/Layout.css';
import SplashNav from '@common/layout/SplashNav';

const SplashLayout: FC = () => {
    return (
        <>
            <SplashNav />
            <Outlet />
        </>
    );
}

export default SplashLayout;