import { Suspense, lazy } from 'react';

import { Routes, Route } from 'react-router-dom';

// import SplashLayout from '@common/layout/SplashLayout';
// import Layout from '@common/layout/Layout';
// import SplashPage from '@pages/SplashPage';
// import HomePage from '@pages/HomePage';
// import ProfilePage from '@pages/ProfilePage';
// import EditProfilePage from '@pages/EditProfilePage';
// import ProtectedRoute from '@pages/ProtectedRoute';
// import NotFoundPage from '@pages/NotFoundPage';

const SplashLayout = lazy(() => import('@common/layout/SplashLayout'));
const Layout = lazy(() => import('@common/layout/Layout'));
const SplashPage = lazy(() => import('@pages/SplashPage'));
const HomePage = lazy(() => import('@pages/HomePage'));
const ProfilePage = lazy(() => import('@pages/ProfilePage'));
const EditProfilePage = lazy(() => import('@pages/EditProfilePage'));
const CreateDiscussionPage = lazy(() => import('@pages/CreateDiscussionPage'))
const ProtectedRoute = lazy(() => import('@pages/ProtectedRoute'));
const NotFoundPage = lazy(() => import('@pages/NotFoundPage'));

function App() {
    return (
        <Suspense fallback={<div>loading</div>}>
            <Routes>
                <Route path='/' element={<SplashLayout />}>
                    <Route index element={<SplashPage />} />
                </Route>
                <Route path='/' element={<Layout />}>
                    <Route path='home' element={<HomePage />} />
                    <Route path='profile/:username' element={<ProfilePage />} />
                    <Route path='settings' element={<ProtectedRoute redirect='/home' />}>
                        <Route path='edit' element={<EditProfilePage />} />
                    </Route>
                    <Route path='discussion' element={<CreateDiscussionPage />} />
                </Route>
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </Suspense>
    );
}

export default App;
