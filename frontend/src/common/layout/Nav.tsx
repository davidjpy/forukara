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
            <nav className='layout__nav'>
                <section className='layout__nav-wrapper'>
                    <header className='layout__logo-wrapper'>
                        <FaBlog className='layout__logo' />
                        <p className='layout__header'>Forukara</p>
                    </header>
                    {user.id ? (
                        <div className='layout__action-wrapper'>
                            <p role='button' onClick={handleLogout} className='layout__text layout__text--button layout__text--link'>Logout</p>
                            <p role='button' onClick={handleNavigateProfile} className='layout__text layout__text--button layout__text--link'>
                                {user?.username}
                            </p>
                        </div>
                    ) : (
                        <div className='layout__action-wrapper'>
                            <p role='button' onClick={handleLoginFormMounted} className='layout__text layout__text--button layout__text--link'>Login</p>
                            <button onClick={handleSignUpFormMounted} className='layout__button layout__button--green-alien-light'>
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