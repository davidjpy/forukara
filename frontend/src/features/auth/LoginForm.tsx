import { FC, useState, ChangeEvent, FormEvent, useEffect, useCallback } from 'react';
import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';

import { useAppSelector, useAppDispatch } from '@app/hooks';
import { useClickOutside } from '@common/hooks/useClickOutside';
import { toggleLoginForm, toggleSignUpForm } from '@features/auth/authSlice';
import { useLoginMutation } from '@features/auth/authApiSlice';

const LoginForm: FC = () => {

    const dispatch = useAppDispatch();
    const loginFormMounted = useAppSelector((state) => state.auth.loginFormMounted);
    const [login, loginResult] = useLoginMutation();
    const [userId, setUserId] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [userIdErr, setUserIdErr] = useState<string>('');
    const [passwordErr, setPasswordErr] = useState<string>('');
    const [err, setErr] = useState<string>('');

    const submitNotAllowed: boolean = Boolean(err || userIdErr || passwordErr);

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

    const handleChangeUserId = (e: ChangeEvent<HTMLInputElement>): void => {
        setUserId(e.target.value);
        setUserIdErr('');
        setErr('');
    }

    const handleChangePassword = (e: ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value);
        setPasswordErr('');
        setErr('');
    }

    const handleResetInput = (): void => {
        setUserId('');
        setPassword('');
        setUserIdErr('');
        setPasswordErr('');
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
                <form onSubmit={handleSubmitForm} className='layout__form'>
                    <div style={{ margin: userIdErr && '1.5rem 0 0.5rem 0' }}>
                        <input value={userId} onChange={handleChangeUserId} type='text' placeholder=' ' className='layout__input' />
                        <span className='layout__placeholder'><FaUser style={{ fontSize: '14px', marginBottom: '1px' }} /> User ID*</span>
                        {userIdErr && <p className='layout__text layout__text--red' style={{ margin: '8px 0 0 8px', fontSize: '0.8rem' }}>{userIdErr}</p>}
                    </div>
                    <div style={{ margin: passwordErr && '1.5rem 0 0.5rem 0' }}>
                        <input value={password} onChange={handleChangePassword} type='password' placeholder=' ' className='layout__input' />
                        <span className='layout__placeholder'><RiLockPasswordFill style={{ fontSize: '16px' }} /> Password*</span>
                        {passwordErr && <p className='layout__text layout__text--red' style={{ margin: '8px 0 0 8px', fontSize: '0.8rem' }}>{passwordErr}</p>}
                    </div>
                    {err && <p className='layout__text layout__text--red'>{err}</p>}
                    {loginResult.isLoading ? (
                        <div style={{ position: 'relative' }}>
                            <input type='submit' disabled={true} value='' />
                            <div className='layout__loader' style={{ position: 'absolute' }} />
                        </div>
                    ) : (
                        <input type='submit' disabled={submitNotAllowed} value='Login' />
                    )}
                </form>
                <p className='layout__text layout__text--white' style={{ textAlign: 'center', marginTop: '30px' }}>
                    Don't have an account?
                    <span onClick={handleSignUpFormMounted} className='layout__text--alien-green-light layout__text--link' style={{ marginLeft: '5px' }} >Sign up</span>
                </p>
            </section>
        </>
    );
}

export default LoginForm;