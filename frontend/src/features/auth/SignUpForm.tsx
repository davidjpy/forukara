import { FC, FormEvent, useState, useEffect, useRef } from 'react';
import { FaUser } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { RiLockPasswordFill } from 'react-icons/ri';

import { useClickOutside } from '@common/hooks/useClickOutside';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import { toggleSignUpForm, toggleLoginForm } from '@features/auth/authSlice';
import { useCreateUserMutation } from '@features/user/userApiSlice';
import { useInput } from '@common/hooks/useInput';
import SignUpSuccess from '@features/auth/SignUpSuccess';
import SignUpOptions from './SignUpOptions';

const SignUpForm: FC = () => {

    const overlayRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const signUpFormMounted = useAppSelector((state) => state.auth.signUpFormMounted);
    const [createUser, createUserResult] = useCreateUserMutation();
    const [emailCopy, setEmailCopy] = useState<string>('');
    const [block, setBlock] = useState<'options' | 'form' | 'success'>('options');

    const [err, setErr] = useState<string>('');
    const [userIdErr, setUserIdErr] = useState<string>('');
    const [emailErr, setEmailErr] = useState<string>('');
    const [passwordErr, setPasswordErr] = useState<string>('');
    const [resendEmailErr, setResendEmailErr] = useState<string>('');
    const [confirmPasswordErr, setConfirmPasswordErr] = useState<string>('');
    const [connectionErr, setConnectionErr] = useState<string>('');
    const [userId, handleChangeUserId, resetUserId] = useInput('', [setUserIdErr, setErr, setConnectionErr]);
    const [email, handleChangeEmail, resetEmail] = useInput('', [setEmailErr, setErr, setConnectionErr]);
    const [password, handleChangePassword, resetPassword] = useInput('', [setPasswordErr, setErr, setConnectionErr]);
    const [confirmPassword, handleChangeConfirmPassword, resetConfirmPassword] = useInput('', [setConfirmPasswordErr, setErr, setConnectionErr]);

    const submitNotAllowed: boolean = Boolean(err || userIdErr || emailErr || passwordErr || confirmPasswordErr);

    const handleResetInput = (): void => {
        resetUserId();
        resetEmail();
        resetPassword();
        resetConfirmPassword();
        setErr('');
        setUserIdErr('');
        setEmailErr('');
        setPasswordErr('');
        setConfirmPasswordErr('');
        setResendEmailErr('');
        setConnectionErr('');
    }

    const hadnleSignUpFormUnmounted = (): void => {
        dispatch(toggleSignUpForm(false));
        handleResetInput();

        setTimeout(() => {
            setBlock('options');
        }, 400);
    }

    const handleLoginFormMounted = (): void => {
        hadnleSignUpFormUnmounted();
        dispatch(toggleLoginForm(true));
    }

    const handleSubmitForm = async (e: FormEvent<HTMLFormElement>): Promise<any> => {
        e.preventDefault();
        // setSuccessed(true);
        setEmailCopy(email);
        await createUser({
            username: userId,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        });
    }

    useEffect(() => {
        if (createUserResult.isSuccess) {
            handleResetInput();
            setBlock('success');
        }

        if (createUserResult.isError) {
            if ('status' in createUserResult.error && createUserResult.error.status === 'FETCH_ERROR') {
                setConnectionErr('Connection lost*');
            }

            if ('data' in createUserResult.error) {
                const { message } = createUserResult.error.data as { message: Array<{ error: string; code: number; }> };

                for (let i = 0; i < message.length; i++) {
                    switch (message[i].code) {
                        case 0:
                            setErr(message[i].error + '*');
                            break;
                        case 1:
                            setUserIdErr(message[i].error + '*');
                            break;
                        case 2:
                            setEmailErr(message[i].error + '*');
                            break;
                        case 3:
                            setPasswordErr(message[i].error + '*');
                            break;
                        case 4:
                            setConfirmPasswordErr(message[i].error + '*');
                            break;
                    }
                }
            }
        }
    }, [createUserResult]);


    useEffect(() => {
        let ref = overlayRef.current;
        const fadeOut = (): void => {
            if (ref && ref.classList.contains('form__overlay--fade') && !signUpFormMounted) {
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
    });

    useEffect(() => {
        if (signUpFormMounted && overlayRef.current) {
            overlayRef.current.style.display = 'block';
        }
    }, [signUpFormMounted]);

    const wrapperRef = useClickOutside(hadnleSignUpFormUnmounted);

    const inputFields = [
        {
            id: 'register-username',
            text: 'User ID*',
            icon: <FaUser style={{ fontSize: '14px', marginBottom: '1px' }} />,
            value: userId,
            onChange: handleChangeUserId,
            err: userIdErr,
            type: 'text'
        },
        {
            id: 'register-email',
            text: 'Email*',
            icon: <IoMdMail style={{ fontSize: '14px', marginBottom: '1px' }} />,
            value: email,
            onChange: handleChangeEmail,
            err: emailErr,
            type: 'email'
        },
        {
            id: 'register-password',
            text: 'Password*',
            icon: <RiLockPasswordFill style={{ fontSize: '14px', marginBottom: '1px' }} />,
            value: password,
            onChange: handleChangePassword,
            err: passwordErr,
            type: 'password'
        },
        {
            id: 'register-confirm-password',
            text: 'Confirm Password*',
            icon: <RiLockPasswordFill style={{ fontSize: '14px', marginBottom: '1px' }} />,
            value: confirmPassword,
            onChange: handleChangeConfirmPassword,
            err: confirmPasswordErr,
            type: 'password'
        }
    ];

    return (
        <div ref={overlayRef}
            className={signUpFormMounted ? 'form__overlay' : 'form__overlay form__overlay--fade'}>
            <section ref={wrapperRef} className='form form--signup'>
                <header>
                    <h1>Sign Up</h1>
                </header>

                <div className='form__wrapper'>
                    <SignUpOptions
                        block={block}
                        setBlock={setBlock}
                        handleLoginFormMounted={handleLoginFormMounted}
                    />
                    <form onSubmit={handleSubmitForm}
                        style={{
                            left:
                                block === 'options' ? 'calc(100% + 2rem)' :
                                    block === 'form' ? '2rem' :
                                        'calc(-100% + 2rem)',
                        }}
                    >
                        {inputFields.map((item) => {
                            return (
                                <div key={item.id} style={{ margin: item.err && '1rem 0 0.5rem 0' }}>
                                    <input value={item.value} onChange={item.onChange} type={item.type} placeholder=' ' className='form__input' />
                                    <label htmlFor={item.id} className='form__placeholder'>{item.icon} {item.text}</label>
                                    {item.err && <p className='form__text form__text--red' style={{ margin: '8px 0 0 8px', fontSize: '0.8rem' }}>{item.err}</p>}
                                </div>
                            );
                        })}
                        {err && <p className='form__text form__text--red' style={{ margin: '8px 0 0 8px', fontSize: '0.8rem' }}>{err}</p>}
                        {connectionErr && <p className='form__text form__text--red' style={{ margin: '8px 0 0 8px', fontSize: '0.8rem' }}>{connectionErr}</p>}
                        {createUserResult.isLoading ? (
                            <div style={{ position: 'relative', margin: 0 }}>
                                <input aria-label='Loading' type='submit' disabled={true} value='' />
                                <div className='form__loader' style={{ position: 'absolute' }} />
                            </div>
                        ) : (
                            <input aria-label='Sign up' type='submit' disabled={submitNotAllowed} value='Create Account' />
                        )}
                        <p id='open-login-form' className='form__text form__text--white' style={{ textAlign: 'center', margin: '30px 0 50px 0' }}>
                            Already have an account?
                            <span role='button' aria-labelledby='open-login-form' onClick={handleLoginFormMounted} className='form__text--green-alien-light form__text--link' style={{ marginLeft: '5px' }} >Login</span>
                        </p>
                    </form>
                    <SignUpSuccess
                        emailCopy={emailCopy}
                        resendEmailErr={resendEmailErr}
                        setResendEmailErr={setResendEmailErr}
                        block={block}
                    />
                </div>
                <div style={{ position: 'absolute', bottom: 0 }}>
                    <button onClick={() => setBlock('options')}>options</button>
                    <button onClick={() => setBlock('form')}>form</button>
                    <button onClick={() => setBlock('success')}>success</button>
                </div>
            </section>
        </div>
    );
}

export default SignUpForm;