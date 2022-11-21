import { FC } from 'react';
import { FaBlog } from 'react-icons/fa';

import SignUpForm from '@features/auth/SignUpForm';
import LoginForm from '@features/auth/LoginForm';
import { useAppDispatch } from '@app/hooks';
import { toggleSignUpForm, toggleLoginForm } from '@features/auth/authSlice'
import { useLogoutMutation } from '@features/auth/authApiSlice';
import { useNavigate } from 'react-router-dom';
import { useGetUser } from '@common/hooks/useGetUser';

const SplashNav: FC = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [logout,] = useLogoutMutation();
    const [user, isLoading, isFetching, isSuccess] = useGetUser();

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
        navigate(`profile/${user.username}`);
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
                            <button onClick={handleLogout} className='splashlayout__button splashlayout__button--text'>LOGOUT</button>
                            <p role='button' onClick={handleNavigateProfile} className='splashlayout__button splashlayout__button--text' style={{ textAlign: 'center' }}>{user.username}</p>
                        </div>
                    ) : (
                        <div className='splashlayout__action-wrapper'>
                            <button onClick={handleLoginFormMounted} className='splashlayout__button splashlayout__button--text'>LOGIN</button>
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