import { FC } from 'react';
import { FaBlog } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import SignUpForm from '@features/auth/SignUpForm';
import LoginForm from '@features/auth/LoginForm';
import { useAppDispatch } from '@app/hooks';
import { toggleSignUpForm, toggleLoginForm } from '@features/auth/authSlice'
import { useLogoutMutation } from '@features/auth/authApiSlice';
import { useNavigate } from 'react-router-dom';
import { useGetUser } from '@common/hooks/useGetUser';
import default_avatar from '@media/images/default_avatar.webp';

const SplashNav: FC = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [logout,] = useLogoutMutation();
    const [user, loading, authing] = useGetUser();

    const handleSignUpFormMounted = (): void => {
        dispatch(toggleSignUpForm(true));
    }

    const handleLoginFormMounted = (): void => {
        dispatch(toggleLoginForm(true));
    }

    const handleLogout = async (): Promise<any> => {
        await logout();
    }

    const handleNavigate = (page: string): void => {
        navigate(page);
    }

    return (
        <>
            <nav className='sp-nav'>
                <section className='sp-nav__nav'>
                    <header>
                        <FaBlog className='sp-nav__logo' />
                        <h1>Forukara</h1>
                    </header>
                    {(loading || authing) &&
                        <div className='sp-nav__wrapper'>
                            <Skeleton
                                width={100}
                                height={35}
                                baseColor='#CCCCCC'

                                style={{ marginRight: '1.4rem' }}
                            />
                            <Skeleton
                                circle
                                height={50}
                                width={50}
                                baseColor='#CCCCCC'
                            />
                        </div>
                    }
                    <div className='sp-nav__wrapper'>
                        {(user.profile.username && !loading) && (
                            <>
                                <button onClick={handleLogout} className='sp-nav__btn-txt'>Logout</button>
                                <figure onClick={() => handleNavigate(`profile/${user.profile.username}`)} aria-label='Profile'>
                                    <img src={user.profile.avatar as string || default_avatar} alt={user.profile.avatar as string || default_avatar} />
                                </figure>
                            </>
                        )}

                        {((!localStorage.getItem('auth')) && !authing) && (
                            <>
                                <button onClick={handleLoginFormMounted} className='sp-nav__btn-txt'>Login</button>
                                <button onClick={handleSignUpFormMounted} className='sp-nav__btn sp-nav__btn--slide'>&nbsp;</button>
                            </>
                        )}
                    </div>
                </section>
            </nav >
            <LoginForm />
            <SignUpForm />
        </>
    );
}

export default SplashNav;


