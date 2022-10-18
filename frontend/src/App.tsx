import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Layout = lazy(() => import('@common/layout/Layout'));
const HomePage = lazy(() => import('@pages/HomePage'))

function App() {
    return (
        <Suspense fallback={<div>Loading</div>}>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<HomePage />} />
                </Route>
            </Routes>
        </Suspense>
    );
}

export default App;
