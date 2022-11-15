import { FC } from 'react';
import { FaBlog } from 'react-icons/fa';

import SignUpForm from '@features/auth/SignUpForm';
import LoginForm from '@features/auth/LoginForm';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import { toggleSignUpForm, toggleLoginForm } from '@features/auth/authSlice'
import { useLogoutMutation, useGetUserByIdQuery, useRefreshQuery } from '@features/auth/authApiSlice';
import { useNavigate } from 'react-router-dom';

const SplashNav: FC = () => {

    useRefreshQuery();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [logout,] = useLogoutMutation();
    const user = useAppSelector(state => state.auth.user);
    const { isLoading, isFetching, isSuccess } = useGetUserByIdQuery(user.id as string, { skip: !user.id });

    const handleSignUpFormMounted = (): void => {
        dispatch(toggleSignUpForm(true));
    }

    const handleLoginFormMounted = (): void => {
        dispatch(toggleLoginForm(true));
    }

    const handleLogout = async (): Promise<any> => {
        await logout();
    }

    const handleNavigateProfile = (): void => {
        navigate(`${user.username}`);
    }

    return (
        <>
            <nav className='splashlayout__nav'>
                <section className='splashlayout__container'>
                    <header className='splashlayout__logo-wrapper'>
                        <FaBlog className='splashlayout__logo'/>
                        <p className='splashlayout__logo--text'>Forukara</p>
                    </header>
                    {user.id ? (
                        <div className='splashlayout__action-wrapper'>
                            <button onClick={handleLogout} className='splashlayout__button splashlayout__button--text'>Logout</button>
                            <p role='button' onClick={handleNavigateProfile} className='splashlayout__button splashlayout__button--text' style={{ textAlign: 'center' }}>{user.username}</p>
                        </div>
                    ) : (
                        <div className='splashlayout__action-wrapper'>
                            <button onClick={handleLoginFormMounted} className='splashlayout__button splashlayout__button--text'>Login</button>
                            <button onClick={handleSignUpFormMounted} className='splashlayout__button splashlayout__button--slide'>&nbsp;</button>
                        </div>
                    )}
                </section>
            </nav>
            <LoginForm />
            <SignUpForm />
        </>
    );
}

export default SplashNav; 