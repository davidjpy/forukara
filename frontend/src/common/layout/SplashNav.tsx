import { FC } from 'react';
import { FaBlog } from 'react-icons/fa';

import SignUpForm from '@features/authentication/SignUpForm';
import LoginForm from '@features/authentication/LoginForm';
import { useAppDispatch } from '@app/hooks';
import { toggleSignUpForm, toggleLoginForm } from '@features/authentication/authenticationSlice'
import { useGetUserByIdQuery } from '@features/authentication/authenticationApiSlice';

const Nav: FC = () => {

    const dispatch = useAppDispatch();
    const { data, isLoading, isFetching, isError } = useGetUserByIdQuery('635d52e29d72d9a119602b87');

    const handleSignUpFormMounted = (): void => {
        dispatch(toggleSignUpForm(true));
    }

    const handleLoginFormMounted = (): void => {
        dispatch(toggleLoginForm(true));
    }

    return (
        <>
            <header className='splashlayout__nav'>
                <div className='splashlayout__container'>
                    <div className='splashlayout__logo-wrapper'>
                        <FaBlog />
                        <p>Forukara</p>
                    </div>
                    <div className='splashlayout__button-wrapper'>
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