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
    const [connectionErr, setConnectionErr] = useState<string>('');
    const [userId, handleChangeUserId, resetUserId] = useInput('', [setUserIdErr, setErr, setConnectionErr]);
    const [password, handleChangePassword, resetPassword] = useInput('', [setPasswordErr, setErr, setConnectionErr]);

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
            if (ref && ref.classList.contains('form__overlay--fade') && !loginFormMounted) {
                ref.style.display = 'none';
                ref.classList.remove('form__overlay--fade');
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
            text: 'User ID*', 
            icon: <FaUser style={{ fontSize: '14px', marginBottom: '1px' }} />, 
            value: userId, 
            onChange: handleChangeUserId, 
            err: userIdErr, 
            type: 'text' 
        },
        { 
            id: 'login-password', 
            text: 'Password*', 
            icon: <RiLockPasswordFill style={{ fontSize: '14px', marginBottom: '1px' }} />, 
            value: password, 
            onChange: handleChangePassword, 
            err: passwordErr,
            type: 'text' 
        }
    ];

    return (
        <div ref={overlayRef}
            className={loginFormMounted ? 'form__overlay' : 'form__overlay form__overlay--fade'}>
            <section ref={wrapperRef} className='form form--login'>
                <header>
                    <h1>Login</h1>
                </header>
                <form onSubmit={handleSubmitForm}>
                    {inputFields.map((item) => {
                        return (
                            <div key={item.id} style={{ margin: item.err && '1rem 0 0.5rem 0' }}>
                                <input value={item.value}  onChange={item.onChange} type={item.type} placeholder=' ' className='form__input' />
                                <label htmlFor={item.id} className='form__placeholder'>{item.icon} {item.text}</label>
                                {item.err && <p className='form__text form__text--red' style={{ margin: '8px 0 0 8px', fontSize: '0.8rem' }}>{item.err}</p>}
                            </div>
                        );
                    })}
                    {err && <p className='form__text form__text--red' style={{ margin: '8px 0 0 8px', fontSize: '0.8rem' }}>{err}</p>}
                    {connectionErr && <p className='form__text form__text--red' style={{ margin: '8px 0 0 8px', fontSize: '0.8rem' }}>{connectionErr}</p>}
                    {loginResult.isLoading ? (
                        <div style={{ position: 'relative', margin: 0 }}>
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

