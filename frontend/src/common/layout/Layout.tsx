import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import '@common/layout/Layout.css';
import Nav from '@common/layout/Nav';
import LeftMenu from '@common/layout/LeftMenu';
import RightMenu from '@common/layout/RightMenu';

const Layout: FC = () => {
    return (
        <>
            <Nav />
            <div className='layout__wrapper'>
                <LeftMenu />
                <Outlet />
                <RightMenu />
            </div>
        </>
    );
}

export default Layout;