import { FC } from 'react';

import { useClickOutside } from '@common/hooks/useClickOutside';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import { toggleSignUpForm } from '@features/authentication/authenticationSlice';

const SignUpForm: FC = () => {

    const dispatch = useAppDispatch();
    const signUpFormMounted = useAppSelector((state) => state.authentication.signUpFormMounted);

    const hadnleSignUpFormUnmounted = (): void => {
        dispatch(toggleSignUpForm(false))
    }

    const wrapperRef = useClickOutside(hadnleSignUpFormUnmounted);

    return (
        <>
            <div className='layout__overlay'
                style={signUpFormMounted
                    ? { opacity: 1, pointerEvents: 'all' }
                    : { opacity: 0, pointerEvents: 'none' }}
            />
            <div ref={wrapperRef} className='layout__signupform'
                style={signUpFormMounted
                    ? { opacity: 1, pointerEvents: 'all' }
                    : { opacity: 0, pointerEvents: 'none' }}>
                <h1 className='layout__header'>Sign Up</h1>
                <form className='layout__form'>
                    <input type='text' placeholder='User ID' />
                    <input type='email' placeholder='Email' />
                    <input type='password' placeholder='Password' />
                    <input type='password' placeholder='Confirm Password' />
                    <input type='submit' value='Create Account' />
                </form>
            </div>
        </>
    );
}

export default SignUpForm;