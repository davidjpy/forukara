import { Suspense, lazy, useRef, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

const SplashLayout = lazy(() => import('@common/layout/SplashLayout'));
const SplashPage = lazy(() => import('@pages/SplashPage'));
const Layout = lazy(() => import('@common/layout/Layout'));
const HomePage = lazy(() => import('@pages/HomePage'));

function App() {
    return (
        <Suspense fallback={<div>Loading</div>}>
            <Routes>
                <Route path='/' element={<SplashLayout />}>
                    <Route index element={<SplashPage />} />
                </Route>
                <Route path='/' element={<Layout />}>
                    <Route path='home' element={<HomePage />} />
                    <Route path='davidho' element={<HomePage />} />
                </Route>
            </Routes>
        </Suspense>
    );
}

export default App;
