import { FC } from 'react';
import { FaBlog } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import '@common/layout/Layout.css'
import SignUpForm from '@features/auth/SignUpForm';
import LoginForm from '@features/auth/LoginForm';
import { useAppDispatch } from '@app/hooks';
import { toggleSignUpForm, toggleLoginForm } from '@features/auth/authSlice'
import { useLogoutMutation } from '@features/auth/authApiSlice';
import { useNavigate } from 'react-router-dom';
import { useGetUser } from '@common/hooks/useGetUser';
import default_avatar from '@media/images/default_avatar.webp';

const Nav: FC = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [logout,] = useLogoutMutation();
    const [user, isLoading, isAuthing] = useGetUser();

    const handleSignUpFormMounted = (): void => {
        dispatch(toggleSignUpForm(true));
    }

    const handleLoginFormMounted = (): void => {
        dispatch(toggleLoginForm(true));
    }

    const handleLogout = async (): Promise<any> => {
        handleNavigate('/');
        await logout();
    }

    const handleNavigate = (page: string): void => {
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
                    {(isLoading || isAuthing) &&
                        <div className='nav__wrapper' style={{ gap: 0 }}>
                            <Skeleton
                                width={80}
                                height={30}
                                baseColor='#E3E3E3'
                                style={{ marginRight: '1.4rem' }}
                            />
                            <Skeleton
                                circle
                                height={40}
                                width={40}
                                baseColor='#E3E3E3'
                            />
                        </div>
                    }

                    <div className='nav__wrapper'>
                        {(user.profile.username && !isLoading) && (
                            <>
                                <p role='button' onClick={handleLogout} className='nav__txt nav__txt--btn nav__txt--link'>Logout</p>
                                <figure onClick={() => handleNavigate(`profile/${user.profile.username}`)} aria-label='Profile'>
                                    <img src={user.profile.avatar as string || default_avatar} alt={user.profile.avatar as string} />
                                </figure>
                            </>
                        )}

                        {((!localStorage.getItem('auth')) && !isAuthing) && (
                            <>
                                <p role='button' onClick={handleLoginFormMounted} className='nav__txt nav__txt--btn nav__txt--link'>Login</p>
                                <button onClick={handleSignUpFormMounted} className='nav__btn nav__btn--green-alien-light'>
                                    Register
                                </button>
                            </>
                        )}
                    </div>
                </section>
            </nav>
            <SignUpForm />
            <LoginForm />
        </>
    )
}

export default Nav;