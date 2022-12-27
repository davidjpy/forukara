import { FC } from 'react';
import { FaBlog } from 'react-icons/fa';

import '@common/layout/Layout.css'
import SignUpForm from '@features/auth/SignUpForm';
import LoginForm from '@features/auth/LoginForm';
import { useAppDispatch } from '@app/hooks';
import { toggleSignUpForm, toggleLoginForm } from '@features/auth/authSlice'
import { useLogoutMutation } from '@features/auth/authApiSlice';
import { useNavigate } from 'react-router-dom';
import { useGetUser } from '@common/hooks/useGetUser';

const Nav: FC = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [logout,] = useLogoutMutation();
    const [user] = useGetUser();

    const handleSignUpFormMounted = (): void => {
        dispatch(toggleSignUpForm(true));
    }

    const handleLoginFormMounted = (): void => {
        dispatch(toggleLoginForm(true));
    }

    const handleLogout = async (): Promise<any> => {
        await logout();
        handleNavigateProfile('/');
    }

    const handleNavigateProfile = (page: string): void => {
        navigate(page);
    }

    return (
        <>
            <nav className='nav'>
                <section className='nav__nav'>
                    <header>
                        <FaBlog className='nav__logo' />
                        <p className='nav__header'>Forukara</p>
                    </header>
                    {user.id ? (
                        <div className='nav__wrapper'>
                            <p role='button' onClick={handleLogout} className='nav__text nav__text--button nav__text--link'>Logout</p>
                            <p role='button' onClick={() => handleNavigateProfile(`profile/${user.username}`)} className='nav__text nav__text--button nav__text--link'>
                                {user?.username}
                            </p>
                        </div>
                    ) : (
                        <div className='nav__wrapper'>
                            <p role='button' onClick={handleLoginFormMounted} className='nav__text nav__text--button nav__text--link'>Login</p>
                            <button onClick={handleSignUpFormMounted} className='nav__button nav__button--green-alien-light'>
                                Register
                            </button>
                        </div>
                    )}
                </section>
            </nav>
            <SignUpForm />
            <LoginForm />
        </>
    )
}

export default Nav;