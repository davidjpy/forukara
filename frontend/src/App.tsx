import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const SplashLayout = lazy(() => import('@common/layout/SplashLayout'));
const Layout = lazy(() => import('@common/layout/Layout'));
const SplashPage = lazy(() => import('@pages/SplashPage'));
const HomePage = lazy(() => import('@pages/HomePage'));
const ProfilePage = lazy(() => import('@pages/ProfilePage'));

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
                    </Route>
                </Route>
            </Routes>
        </Suspense>
    );
}

export default App;
