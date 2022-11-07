import { FC, useEffect } from 'react';
import { FaBlog } from 'react-icons/fa';

import SignUpForm from '@features/auth/SignUpForm';
import LoginForm from '@features/auth/LoginForm';
import { useAppDispatch } from '@app/hooks';
import { toggleSignUpForm, toggleLoginForm } from '@features/auth/authSlice'
import { useGetUserByIdQuery, useLogoutMutation } from '@features/auth/authApiSlice';

const Nav: FC = () => {

    const dispatch = useAppDispatch();
    const [logout, logoutResult] = useLogoutMutation();
    // const { data, isLoading, isFetching, isError } = useGetUserByIdQuery('635d52e29d72d9a119602b87');

    const handleSignUpFormMounted = (): void => {
        dispatch(toggleSignUpForm(true));
    }

    const handleLoginFormMounted = (): void => {
        dispatch(toggleLoginForm(true));
    }

    const handleLogout = async (): Promise<any> => {
        await logout();
    }

    useEffect(() => {
        console.log(logoutResult);
    }, [logoutResult])

    return (
        <>
            <header className='splashlayout__nav'>
                <div className='splashlayout__container'>
                    <div className='splashlayout__logo-wrapper'>
                        <FaBlog />
                        <p>Forukara</p>
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