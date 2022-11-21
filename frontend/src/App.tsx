import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import SplashLayout from '@common/layout/SplashLayout';
import Layout from '@common/layout/Layout';
import SplashPage from '@pages/SplashPage';
import HomePage from '@pages/HomePage';
import ProfilePage from '@pages/ProfilePage';
import UpdatePage from '@pages/UpdatePage';

// const SplashLayout = lazy(() => import('@common/layout/SplashLayout'));
// const Layout = lazy(() => import('@common/layout/Layout'));
// const SplashPage = lazy(() => import('@pages/SplashPage'));
// const HomePage = lazy(() => import('@pages/HomePage'));
// const ProfilePage = lazy(() => import('@pages/ProfilePage'));
// const UpdatePage = lazy(() => import('@pages/UpdatePage'));

function App() {
    return (
        <Suspense fallback={<div>Loading</div>}>
            <Routes>
                <Route path='/' element={<SplashLayout />}>
                    <Route index element={<SplashPage />} />
                </Route>
                <Route path='/' element={<Layout />}>
                    <Route path='home' element={<HomePage />} />
                    <Route path='profile'>
                        <Route path=':username' element={<ProfilePage />} />
                        <Route path='update' element={<UpdatePage />} />
                    </Route>
                </Route>
            </Routes>
        </Suspense>
    );
}

export default App;
