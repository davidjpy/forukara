import { FC, useState, FormEvent, useEffect, useCallback, useRef } from 'react';
import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';

import { useAppSelector, useAppDispatch } from '@app/hooks';
import { useClickOutside } from '@common/hooks/useClickOutside';
import { toggleLoginForm, toggleSignUpForm } from '@features/auth/authSlice';
import { useLoginMutation } from '@features/auth/authApiSlice';
import { useInput } from '@common/hooks/useInput';

const LoginForm: FC = () => {

    const dispatch = useAppDispatch();
    const overlayRef = useRef<HTMLDivElement>(null);
    const loginFormMounted = useAppSelector((state) => state.auth.loginFormMounted);
    const [login, loginResult] = useLoginMutation();
    const [userIdErr, setUserIdErr] = useState<string>('');
    const [passwordErr, setPasswordErr] = useState<string>('');
    const [err, setErr] = useState<string>('');
    const [userId, handleChangeUserId, resetUserId] = useInput('', [setUserIdErr, setErr]);
    const [password, handleChangePassword, resetPassword] = useInput('', [setPasswordErr, setErr]);

    const submitNotAllowed: boolean = Boolean(err || userIdErr || passwordErr);
    
    const handleResetInput = (): void => {
        resetUserId();
        resetPassword();
        setUserIdErr('');
        setPasswordErr('');
        setErr('');
    }

    const handleLoginFormUnmounted = useCallback((): void => {
        dispatch(toggleLoginForm(false));
        handleResetInput();
    }, [dispatch]);

    const handleSignUpFormMounted = (): void => {
        handleLoginFormUnmounted();
        dispatch(toggleSignUpForm(true));
    }

    const handleSubmitForm = async (e: FormEvent<HTMLFormElement>): Promise<any> => {
        e.preventDefault();
        await login({
            username: userId,
            password: password
        });
    }

    useEffect(() => {
        if (loginResult.isSuccess) {
            handleLoginFormUnmounted();
            handleResetInput();
        }

        if (loginResult.isError && 'data' in loginResult.error) {
            const { message } = loginResult.error.data as { message: Array<{ error: string, code: number }> };

            for (let i = 0; i < message.length; i++) {
                switch (message[i].code) {
                    case 0:
                        setErr(message[i].error);
                        break;
                    case 1:
                        setUserIdErr(message[i].error);
                        break;
                    case 3:
                        setPasswordErr(message[i].error);
                        break;
                }
            }
        }
    }, [loginResult, handleLoginFormUnmounted]);

    useEffect(() => {
        const fadeOut = (): void => {
            if (overlayRef.current && overlayRef.current.classList.contains('form__overlay--fade') && !loginFormMounted) {
                overlayRef.current.style.display = 'none';
                overlayRef.current.classList.remove('form__overlay--fade');
            }
        }

        if (overlayRef.current) {
            overlayRef.current.addEventListener('animationend', fadeOut);
        }

        return () => {
            overlayRef.current?.removeEventListener('animationend', fadeOut);
        }
    }, []);

    useEffect(() => {
        if (loginFormMounted && overlayRef.current) {
            overlayRef.current.style.display = 'block';
        }
    }, [loginFormMounted]);

    const wrapperRef = useClickOutside(handleLoginFormUnmounted);

    return (
        <div ref={overlayRef}
            className={loginFormMounted ? 'form__overlay' : 'form__overlay form__overlay--fade'}>
            <section ref={wrapperRef} className='form form--login'>
                <header>
                    <h1>Login</h1>
                </header>
                <form onSubmit={handleSubmitForm}>
                    <div style={{ margin: userIdErr && '1.5rem 0 0.5rem 0' }}>
                        <input value={userId} id='login-username' onChange={handleChangeUserId} type='text' placeholder=' ' className='form__input' />
                        <label htmlFor='login-username' className='form__placeholder'><FaUser style={{ fontSize: '14px', marginBottom: '1px' }} /> User ID*</label>
                        {userIdErr && <p className='form__text form__text--red' style={{ margin: '8px 0 0 8px', fontSize: '0.8rem' }}>{userIdErr}</p>}
                    </div>
                    <div style={{ margin: passwordErr && '1.5rem 0 0.5rem 0' }}>
                        <input value={password} id='login-password' onChange={handleChangePassword} type='password' placeholder=' ' className='form__input' />
                        <label htmlFor='login-password' className='form__placeholder'><RiLockPasswordFill style={{ fontSize: '16px' }} /> Password*</label>
                        {passwordErr && <p className='form__text form__text--red' style={{ margin: '8px 0 0 8px', fontSize: '0.8rem' }}>{passwordErr}</p>}
                    </div>
                    {err && <p className='form__text form__text--red'>{err}</p>}
                    {loginResult.isLoading ? (
                        <div style={{ position: 'relative' }}>
                            <input aria-label='Loading' type='submit' disabled={true} value='' />
                            <div className='form__loader' style={{ position: 'absolute' }} />
                        </div>
                    ) : (
                        <input aria-label='Login' type='submit' disabled={submitNotAllowed} value='Login' />
                    )}
                </form>
                <p id='open-signup-form' className='form__text form__text--white' style={{ textAlign: 'center', marginTop: '30px' }}>
                    Don't have an account?
                    <span role='button' aria-labelledby='open-signup-form' onClick={handleSignUpFormMounted} className='form__text--green-alien-light form__text--link' style={{ marginLeft: '5px' }} >Sign up</span>
                </p>
            </section>
        </div>
    );
}

export default LoginForm;

