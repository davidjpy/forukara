import { FC } from 'react';
import { FaBlog } from 'react-icons/fa';

import '@common/layout/Layout.css'
import SignUpForm from '@features/auth/SignUpForm';
import LoginForm from '@features/auth/LoginForm';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import { toggleSignUpForm, toggleLoginForm } from '@features/auth/authSlice'
import { useLogoutMutation, useGetUserByIdQuery, useRefreshQuery } from '@features/auth/authApiSlice';
import { useNavigate } from 'react-router-dom';

const Nav: FC = () => {

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