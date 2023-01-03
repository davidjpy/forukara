import { Routes, Route } from 'react-router-dom';

import SplashLayout from '@common/layout/SplashLayout';
import Layout from '@common/layout/Layout';
import SplashPage from '@pages/SplashPage';
import HomePage from '@pages/HomePage';
import ProfilePage from '@pages/ProfilePage';
import EditProfilePage from '@pages/EditProfilePage';
import ProtectedRoute from '@pages/ProtectedRoute';

function App() {
    return (
        <Routes>
            <Route path='/' element={<SplashLayout />}>
                <Route index element={<SplashPage />} />
            </Route>
            <Route path='/' element={<Layout />}>
                <Route path='home' element={<HomePage />} />
                <Route path='profile'>
                    <Route path=':username'>
                        <Route index element={<ProfilePage />} />
                        <Route element={<ProtectedRoute redirect='/home' />}>
                            <Route path='update' element={<EditProfilePage />} />
                        </Route>
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
