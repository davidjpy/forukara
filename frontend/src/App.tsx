import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Layout = lazy(() => import('@common/layout/Layout'));
const SplashPage = lazy(() => import('@pages/SplashPage'));
const HomePage = lazy(() => import('@pages/HomePage'));

function App() {
    return (
        <Suspense fallback={<div>Loading</div>}>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<SplashPage />} />
                    <Route path='home' element={<HomePage />} />
                </Route>
            </Routes>
        </Suspense>
    );
}

export default App;
