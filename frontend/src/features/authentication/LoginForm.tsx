import { FC, useState, ChangeEvent } from 'react';
import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';

import { useAppSelector, useAppDispatch } from '@app/hooks';
import { useClickOutside } from '@common/hooks/useClickOutside';
import { toggleLoginForm, toggleSignUpForm } from '@features/authentication/authenticationSlice';

const LoginForm: FC = () => {

    const dispatch = useAppDispatch();
    const loginFormMounted = useAppSelector((state) => state.authentication.loginFormMounted);
    const [userId, setUserId] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLoginFormUnmounted = (): void => {
        dispatch(toggleLoginForm(false));
    }

    const handleSignUpFormMounted = (): void => {
        handleLoginFormUnmounted();
        dispatch(toggleSignUpForm(true));
    }

    const handleChangeUserId = (e: ChangeEvent<HTMLInputElement>): void => {
        setUserId(e.target.value);
    }

    const handleChangePassword = (e: ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value);
    }

    const wrapperRef = useClickOutside(handleLoginFormUnmounted);

    return (
        <>
            <div className='layout__overlay'
                style={loginFormMounted 
                    ? { opacity: 1, pointerEvents: 'all' }
                    : { opacity: 0, pointerEvents: 'none' }}
            />
            <section ref={wrapperRef} className='layout__loginform'
                style={loginFormMounted
                    ? { opacity: 1, pointerEvents: 'all' }
                    : { opacity: 0, pointerEvents: 'none' }}>
                <h1 className='layout__header'>Login</h1>
                <div className='layout__form-wrapper'>
                    <div style={{ width: '322px' }}>
                        <form className='layout__form'>
                            <div>
                                <input value={userId} onChange={handleChangeUserId} type='text' placeholder=' ' className='layout__input' />
                                <span className='layout__placeholder'><FaUser style={{ fontSize: '14px', marginBottom: '1px' }} /> User ID / Email*</span>
                            </div>
                            <div>
                                <input value={password} onChange={handleChangePassword} type='password' placeholder=' ' className='layout__input' />
                                <span className='layout__placeholder'><RiLockPasswordFill style={{ fontSize: '16px' }} /> Password*</span>
                            </div>
                            <input type='submit' value='Login' />
                        </form>
                        <p className='layout__text layout__text--white' style={{ textAlign: 'center', marginTop: '30px' }}>
                            Don't have an account?
                            <span onClick={handleSignUpFormMounted} className='layout__text--alien-green-light layout__text--link' style={{ marginLeft: '5px' }} >Sign up</span>
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default LoginForm;