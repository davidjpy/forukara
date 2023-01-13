import { FC, useState, FormEvent, useEffect, useCallback, useRef } from 'react';
import { FaLinkedinIn } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import FocusTrap from 'focus-trap-react';
import { Options } from 'focus-trap';
import { IoMdClose, IoMdMail } from 'react-icons/io';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineTwitter } from 'react-icons/ai';
import { GrGoogle } from 'react-icons/gr';

import { useAppSelector, useAppDispatch } from '@app/hooks';
import { useClickOutside } from '@common/hooks/useClickOutside';
import { toggleLoginForm, toggleSignUpForm } from '@features/auth/authSlice';
import { useLoginMutation } from '@features/auth/authApiSlice';
import { useInput } from '@common/hooks/useInput';
import { onkeyDownHandler } from '@common/utilities/onKeyDownHandler';
import { oAuthHandler } from '@common/utilities/oAuthHandler';

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
    const [emailErr, setEmailErr] = useState<string>('');
    const [passwordErr, setPasswordErr] = useState<string>('');
    const [err, setErr] = useState<string>('');
    const [connectionErr, setConnectionErr] = useState<string>('');
    const [email, onChangeEmail, resetEmail] = useInput('', [setEmailErr, setErr, setConnectionErr]);
    const [password, onChangePassword, resetPassword] = useInput('', [setPasswordErr, setErr, setConnectionErr]);
    const [focusGoogle, setFocusGoogle] = useState<boolean>(false);

    const submitNotAllowed: boolean = Boolean(err || emailErr || passwordErr);

    const resetInput = (): void => {
        resetEmail();
        resetPassword();
        setEmailErr('');
        setPasswordErr('');
        setErr('');
        setConnectionErr('');
    }

    const unmountLogin = useCallback((): void => {
        dispatch(toggleLoginForm(false));
        resetInput();
    }, [dispatch]);

    const mountSignUp = (): void => {
        unmountLogin();
        dispatch(toggleSignUpForm(true));
    }

    const submitForm = async (e: FormEvent<HTMLFormElement>): Promise<any> => {
        e.preventDefault();
        await login({
            auth: { mode: 'id', provider: 'email' },
            body: {
                email: email,
                password: password
            }
        });
    }

    useEffect(() => {
        if (loginResult.isSuccess) {
            unmountLogin();
            resetInput();
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
                        case 2:
                            setEmailErr(message[i].error);
                            break;
                        case 3:
                            setPasswordErr(message[i].error);
                            break;
                    }
                }
            }
        }
    }, [loginResult, unmountLogin]);

    useEffect(() => {
        let ref = overlayRef.current;
        const fadeOut = (): void => {
            if (ref && ref.classList.contains('auth__overlay--fade') && !loginFormMounted) {
                ref.style.display = 'none';
                ref.classList.remove('auth__overlay--fade');
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

    const wrapperRef = useClickOutside(unmountLogin);

    const inputFields = [
        {
            id: 'login-email',
            text: 'Email',
            icon: <IoMdMail aria-hidden={true} style={{ fontSize: '14px', marginBottom: '1px' }} />,
            value: email,
            onChange: onChangeEmail,
            err: emailErr,
            type: 'email'
        },
        {
            id: 'login-password',
            text: 'Password',
            icon: <RiLockPasswordFill aria-hidden={true} style={{ fontSize: '14px', marginBottom: '1px' }} />,
            value: password,
            onChange: onChangePassword,
            err: passwordErr,
            type: 'password'
        }
    ];

    return (
        <FocusTrap active={loginFormMounted} focusTrapOptions={focusTrapOptions}>
            <div ref={overlayRef}
                className={loginFormMounted ? 'auth__overlay' : 'auth__overlay auth__overlay--fade'}>
                <section ref={wrapperRef} className='auth auth--login'>
                    <button aria-label='close login form' title='Close Login Form' onClick={unmountLogin}
                        className='auth__btn auth__btn--cross' style={{ top: '1.5rem' }}
                    >
                        <IoMdClose aria-hidden={true} />
                    </button>
                    <header>
                        <h1>Login</h1>
                    </header>
                    <form onSubmit={submitForm} className='auth__form'>
                        {inputFields.map((item) => {
                            return (
                                <div key={item.id} style={{ margin: item.id === 'login-email' ? '2rem 0 0 0' : item.err && '1rem 0 0 0' }}>
                                    <input id={item.id} value={item.value} onChange={item.onChange} type={item.type} placeholder=' '
                                        onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }} className='auth__input' />
                                    <label htmlFor={item.id} aria-label={item.text} className='auth__placeholder'>{item.icon} {item.text}<span>*</span></label>
                                    {item.err && <p className='auth__txt auth__txt--red' style={{ margin: '8px 0 0 8px', fontSize: '0.8rem' }}>{item.err}</p>}
                                </div>
                            );
                        })}
                        {err && <p className='auth__txt auth__txt--red' style={{ margin: '8px 0 0 8px', fontSize: '0.8rem' }}>{err}</p>}
                        {connectionErr && <p className='auth__txt auth__txt--red' style={{ margin: '8px 0 0 8px', fontSize: '0.8rem' }}>{connectionErr}</p>}
                        {loginResult.isLoading ? (
                            <div style={{ position: 'relative', margin: 0 }}>
                                <input aria-label='Loading' type='submit' disabled={true} value='' />
                                <div className='auth__loader' style={{ position: 'absolute' }} />
                            </div>
                        ) : (
                            <input aria-label='Login' type='submit' disabled={submitNotAllowed} value='Login' />
                        )}
                    </form>
                    <div className='opts__divider' style={{ marginTop: '1.8rem' }}><p>or</p></div>
                    <div className='auth__icon-group'>
                        <button onClick={() => oAuthHandler('google')} aria-label='login with google' title='Login With Google'
                            onFocus={() => setFocusGoogle(true)} onBlur={() => setFocusGoogle(false)}
                            onMouseEnter={() => setFocusGoogle(true)} onMouseLeave={() => setFocusGoogle(false)}>
                            {focusGoogle ?
                                <FcGoogle aria-hidden={true} className='auth__icon' /> :
                                <GrGoogle aria-hidden={true} className='auth__icon' style={{ width: '20px', height: '20px' }} />}
                        </button>
                        <button aria-label='login with twitter' title='Login With Twitter'>
                            <AiOutlineTwitter aria-hidden={true} className='auth__icon auth__icon--tw' />
                        </button>
                        <button onClick={() => oAuthHandler('linkedin')} aria-label='login with linkedin' title='Login With Linkedin'>
                            <FaLinkedinIn aria-hidden={true} className='auth__icon auth__icon--ln' />
                        </button>
                    </div>
                    <p className='auth__txt auth__txt--white' style={{ textAlign: 'center' }}>
                        Don't have an account?
                        <span role='button' aria-label='open signup form' tabIndex={0} onClick={mountSignUp} onKeyDown={(e) => onkeyDownHandler(e, 'Enter', mountSignUp)}
                            className='auth__txt--green-alien-light auth__txt--link' style={{ marginLeft: '5px' }} >Sign up</span>
                    </p>
                </section>
            </div>
        </FocusTrap>
    );
}

export default LoginForm;

