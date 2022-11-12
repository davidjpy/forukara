import { FC } from 'react';
import { FaBlog } from 'react-icons/fa';

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
            <header className='layout__nav'>
                <div className='layout__container'>
                    <div className='layout__logo-wrapper'>
                        <FaBlog className='layout__logo'/>
                        <p className='layout__logo--text'>Forukara</p>
                    </div>
                    {user.id ? (
                        <div className='layout__action-wrapper'>
                            <button onClick={handleLogout} className='layout__button layout__button--text'>Logout</button>
                            <p onClick={handleNavigateProfile} className='layout__button layout__button--text' style={{ textAlign: 'center' }}>{user.username}</p>
                        </div>
                    ) : (
                        <div className='layout__action-wrapper'>
                            <button onClick={handleLoginFormMounted} className='layout__button layout__button--text'>Login</button>
                            <button onClick={handleSignUpFormMounted} className='layout__button layout__button--slide'>&nbsp;</button>
                        </div>
                    )}
                </div>
            </header>
            <LoginForm />
            <SignUpForm />
        </>
    );
}

export default Nav; 