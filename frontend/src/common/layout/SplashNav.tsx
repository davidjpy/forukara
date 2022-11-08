import { FC } from 'react';
import { FaBlog } from 'react-icons/fa';

import SignUpForm from '@features/auth/SignUpForm';
import LoginForm from '@features/auth/LoginForm';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import { toggleSignUpForm, toggleLoginForm } from '@features/auth/authSlice'
import { useLogoutMutation, useRefreshQuery } from '@features/auth/authApiSlice';


const Nav: FC = () => {

    const dispatch = useAppDispatch();
    const [logout, logoutResult] = useLogoutMutation();
    const user = useAppSelector(state => state.auth.user);

    const handleSignUpFormMounted = (): void => {
        dispatch(toggleSignUpForm(true));
    }

    const handleLoginFormMounted = (): void => {
        dispatch(toggleLoginForm(true));
    }

    const handleLogout = async (): Promise<any> => {
        await logout();
    }

    useRefreshQuery();

    return (
        <>
            <header className='splashlayout__nav'>
                <div className='splashlayout__container'>
                    <div className='splashlayout__logo-wrapper'>
                        <FaBlog />
                        Forukara
                        <p>{user.username}</p>
                    </div>
                    <div className='splashlayout__button-wrapper'>
                        <button onClick={handleLogout}>logout</button>
                        <button onClick={handleLoginFormMounted} className='splashlayout__button splashlayout__button--text'>Login</button>
                        <button onClick={handleSignUpFormMounted} className='splashlayout__button splashlayout__button--slide'>&nbsp;</button>
                    </div>
                </div>
            </header>
            <LoginForm />
            <SignUpForm />
        </>
    );
}

export default Nav; 