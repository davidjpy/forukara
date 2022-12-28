import { FC, useState, FormEvent, useEffect, useCallback, useRef } from 'react';
import { FaUser, FaLinkedinIn } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import FocusTrap from 'focus-trap-react';
import { Options } from 'focus-trap';
import { IoMdClose } from 'react-icons/io';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineTwitter } from 'react-icons/ai';
import { GrGoogle } from 'react-icons/gr';

import { useAppSelector, useAppDispatch } from '@app/hooks';
import { useClickOutside } from '@common/hooks/useClickOutside';
import { toggleLoginForm, toggleSignUpForm } from '@features/auth/authSlice';
import { useLoginMutation } from '@features/auth/authApiSlice';
import { useInput } from '@common/hooks/useInput';
import { onkeyDown } from '@common/utilities/onKeyDown';
import { baseUrl } from '@app/apiSlice';

const focusTrapOptions: Options = {
    checkCanFocusTrap: (trapContainers) => {
        return new Promise((resolve) => {
            const results = trapContainers.map((container) => {
                const interval = setInterval(() => {
                    if (getComputedStyle(container).display !== 'none') {
                        resolve();
                        clearInterval(interval);
                    }
                }, 5);
            })
            return Promise.all(results);
        });
    },
    initialFocus: false,
    returnFocusOnDeactivate: false,
    escapeDeactivates: false
};

const LoginForm: FC = () => {

    const dispatch = useAppDispatch();
    const overlayRef = useRef<HTMLDivElement>(null);
    const loginFormMounted = useAppSelector((state) => state.auth.loginFormMounted);
    const [login, loginResult] = useLoginMutation();
    const [userIdErr, setUserIdErr] = useState<string>('');
    const [passwordErr, setPasswordErr] = useState<string>('');
    const [err, setErr] = useState<string>('');
    const [connectionErr, setConnectionErr] = useState<string>('');
    const [userId, handleChangeUserId, resetUserId] = useInput('', [setUserIdErr, setErr, setConnectionErr]);
    const [password, handleChangePassword, resetPassword] = useInput('', [setPasswordErr, setErr, setConnectionErr]);
    const [focusGoogle, setFocusGoogle] = useState<boolean>(false);

    const submitNotAllowed: boolean = Boolean(err || userIdErr || passwordErr);

    const handleResetInput = (): void => {
        resetUserId();
        resetPassword();
        setUserIdErr('');
        setPasswordErr('');
        setErr('');
        setConnectionErr('');
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

        if (loginResult.isError) {
            if ('status' in loginResult.error && loginResult.error.status === 'FETCH_ERROR') {
                setConnectionErr('Connection lost*');
            }

            if ('data' in loginResult.error) {
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
        }
    }, [loginResult, handleLoginFormUnmounted]);

    useEffect(() => {
        let ref = overlayRef.current;
        const fadeOut = (): void => {
            if (ref && ref.classList.contains('authform__overlay--fade') && !loginFormMounted) {
                ref.style.display = 'none';
                ref.classList.remove('authform__overlay--fade');
            }
        }

        if (ref) {
            ref.addEventListener('animationend', fadeOut);
        }

        return () => {
            ref?.removeEventListener('animationend', fadeOut);
        }
    }, []);

    useEffect(() => {
        if (loginFormMounted && overlayRef.current) {
            overlayRef.current.style.display = 'block';
        }
    }, [loginFormMounted]);

    const wrapperRef = useClickOutside(handleLoginFormUnmounted);

    const inputFields = [
        {
            id: 'login-username',
            text: 'User ID',
            icon: <FaUser aria-hidden={true} style={{ fontSize: '14px', marginBottom: '1px' }} />,
            value: userId,
            onChange: handleChangeUserId,
            err: userIdErr,
            type: 'text'
        },
        {
            id: 'login-password',
            text: 'Password',
            icon: <RiLockPasswordFill aria-hidden={true} style={{ fontSize: '14px', marginBottom: '1px' }} />,
            value: password,
            onChange: handleChangePassword,
            err: passwordErr,
            type: 'text'
        }
    ];

    return (
        <FocusTrap active={loginFormMounted} focusTrapOptions={focusTrapOptions}>
            <div ref={overlayRef}
                className={loginFormMounted ? 'authform__overlay' : 'authform__overlay authform__overlay--fade'}>
                <section ref={wrapperRef} className='authform authform--login'>
                    <button aria-label='close login form' title='Close Login Form' onClick={handleLoginFormUnmounted}
                        className='authform__button authform__button--cross' style={{ top: '1.5rem' }}
                    >
                        <IoMdClose aria-hidden={true} />
                    </button>
                    <header>
                        <h1>Login</h1>
                    </header>
                    <form onSubmit={handleSubmitForm} className='authform__form'>
                        {inputFields.map((item) => {
                            return (
                                <div key={item.id} style={{ margin: item.id === 'login-username' ? '2rem 0 0 0' : item.err && '1rem 0 0 0' }}>
                                    <input id={item.id} value={item.value} onChange={item.onChange} type={item.type} placeholder=' '
                                        onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }} className='authform__input' />
                                    <label htmlFor={item.id} aria-label={item.text} className='authform__placeholder'>{item.icon} {item.text + '*'}</label>
                                    {item.err && <p className='authform__text authform__text--red' style={{ margin: '8px 0 0 8px', fontSize: '0.8rem' }}>{item.err}</p>}
                                </div>
                            );
                        })}
                        {err && <p className='authform__text authform__text--red' style={{ margin: '8px 0 0 8px', fontSize: '0.8rem' }}>{err}</p>}
                        {connectionErr && <p className='authform__text authform__text--red' style={{ margin: '8px 0 0 8px', fontSize: '0.8rem' }}>{connectionErr}</p>}
                        {loginResult.isLoading ? (
                            <div style={{ position: 'relative', margin: 0 }}>
                                <input aria-label='Loading' type='submit' disabled={true} value='' />
                                <div className='authform__loader' style={{ position: 'absolute' }} />
                            </div>
                        ) : (
                            <input aria-label='Login' type='submit' disabled={submitNotAllowed} value='Login' />
                        )}
                    </form>
                    <div className='signupoptions__divider' style={{ marginTop: '1.8rem' }}><p>or</p></div>
                    <div className='authform__icon-group'>
                        <a aria-label='login with google' title='Login With Google'  href={baseUrl + '/auth/google'}
                            onFocus={() => setFocusGoogle(true)} onBlur={() => setFocusGoogle(false)}
                            onMouseEnter={() => setFocusGoogle(true)} onMouseLeave={() => setFocusGoogle(false)}>
                            {focusGoogle ?
                                <FcGoogle aria-hidden={true} className='authform__icon' /> :
                                <GrGoogle aria-hidden={true} className='authform__icon' style={{ width: '20px', height: '20px' }} />}
                        </a>
                        <a tabIndex={0} aria-label='login with twitter'  title='Login With Twitter'><AiOutlineTwitter aria-hidden={true} className='authform__icon authform__icon--twitter' /></a>
                        <a aria-label='login with linkedin' title='Login With Linkedin' href={baseUrl + '/auth/linkedin'}><FaLinkedinIn aria-hidden={true} className='authform__icon authform__icon--linkedin' /></a>
                    </div>
                    <p className='authform__text authform__text--white' style={{ textAlign: 'center' }}>
                        Don't have an account?
                        <span role='button' aria-label='open signup form' tabIndex={0} onClick={handleSignUpFormMounted} onKeyDown={(e) => onkeyDown(e, 'Enter', handleSignUpFormMounted)}
                            className='authform__text--green-alien-light authform__text--link' style={{ marginLeft: '5px' }} >Sign up</span>
                    </p>
                </section>
            </div>
        </FocusTrap>
    );
}

export default LoginForm;

