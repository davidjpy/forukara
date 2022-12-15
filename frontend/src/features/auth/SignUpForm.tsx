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

const SignUpForm: FC = () => {

    const overlayRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const signUpFormMounted = useAppSelector((state) => state.auth.signUpFormMounted);
    const [createUser, createUserResult] = useCreateUserMutation();
    const [emailCopy, setEmailCopy] = useState<string>('');
    const [successed, setSuccessed] = useState<boolean>(false);

    const [err, setErr] = useState<string>('');
    const [userIdErr, setUserIdErr] = useState<string>('');
    const [emailErr, setEmailErr] = useState<string>('');
    const [passwordErr, setPasswordErr] = useState<string>('');
    const [resendEmailErr, setResendEmailErr] = useState<string>('');
    const [confirmPasswordErr, setConfirmPasswordErr] = useState<string>('');
    const [userId, handleChangeUserId, resetUserId] = useInput('', [setUserIdErr, setErr]);
    const [email, handleChangeEmail, resetEmail] = useInput('', [setEmailErr, setErr]);
    const [password, handleChangePassword, resetPassword] = useInput('', [setPasswordErr, setErr]);
    const [confirmPassword, handleChangeConfirmPassword, resetConfirmPassword] = useInput('', [setConfirmPasswordErr, setErr]);

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
    }

    const hadnleSignUpFormUnmounted = (): void => {
        dispatch(toggleSignUpForm(false));
        handleResetInput();
        setSuccessed(false);
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
            setSuccessed(true);
        }

        if (createUserResult.isError && 'data' in createUserResult.error) {
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

    return (
        <div ref={overlayRef}
            className={signUpFormMounted ? 'form__overlay' : 'form__overlay form__overlay--fade'}>
            <section ref={wrapperRef} className='form form--signup'>
                <header>
                    <h1>Sign Up</h1>
                </header>
                <div className='form__wrapper'>
                    <form onSubmit={handleSubmitForm} 
                        style={{ 
                            left: successed ? '-100%' : '3rem',
                            transitionDelay: successed ? '0s' : '0.5s'
                        }}
                    >
                        <div style={{ margin: userIdErr && '1.5rem 0 0.5rem 0' }}>
                            <input id='register-username' value={userId} onChange={handleChangeUserId} type='text' placeholder=' ' className='form__input' />
                            <label htmlFor='register-username' className='form__placeholder'><FaUser style={{ fontSize: '14px', marginBottom: '1px' }} /> User ID*</label>
                            {userIdErr && <p className='form__text form__text--red' style={{ margin: '8px 0 0 8px', fontSize: '0.8rem' }}>{userIdErr}</p>}
                        </div>
                        <div style={{ margin: emailErr && '1.5rem 0 0.5rem 0' }}>
                            <input id='register-email' value={email} onChange={handleChangeEmail} type='email' placeholder=' ' className='form__input' />
                            <label htmlFor='register-email' className='form__placeholder'><IoMdMail style={{ fontSize: '17px' }} /> Email*</label>
                            {emailErr && <p className='form__text form__text--red' style={{ margin: '8px 0 0 8px', fontSize: '0.8rem' }}>{emailErr}</p>}
                        </div>
                        <div style={{ margin: passwordErr && '1.5rem 0 0.5rem 0' }}>
                            <input id='register-password' value={password} onChange={handleChangePassword} type='password' placeholder=' ' className='form__input' />
                            <label htmlFor='register-password' className='form__placeholder'><RiLockPasswordFill style={{ fontSize: '16px' }} /> Password*</label>
                            {passwordErr && <p className='form__text form__text--red' style={{ margin: '8px 0 0 8px', fontSize: '0.8rem' }}>{passwordErr}</p>}
                        </div>
                        <div style={{ margin: confirmPasswordErr && '1.5rem 0 0.5rem 0' }}>
                            <input id='register-confirm-password' value={confirmPassword} onChange={handleChangeConfirmPassword} type='password' placeholder=' ' className='form__input' />
                            <label htmlFor='register-confirm-password' className='form__placeholder'><RiLockPasswordFill style={{ fontSize: '16px' }} /> Confirm Password*</label>
                            {confirmPasswordErr && <p className='form__text form__text--red' style={{ margin: '8px 0 0 8px', fontSize: '0.8rem' }}>{confirmPasswordErr}</p>}
                        </div>
                        {err && <p className='form__text form__text--red'>{err}</p>}
                        {createUserResult.isLoading ? (
                            <div style={{ position: 'relative', margin: 0 }}>
                                <input aria-label='Loading' type='submit' disabled={true} value='' />
                                <div className='form__loader' style={{ position: 'absolute' }} />
                            </div>
                        ) : (
                            <input aria-label='Sign up' type='submit' disabled={submitNotAllowed} value='Create Account' />
                        )}
                        <p id='open-login-form' className='form__text form__text--white' style={{ textAlign: 'center', margin: '30px 0' }}>
                            Already have an account?
                            <span role='button' aria-labelledby='open-login-form' onClick={handleLoginFormMounted} className='form__text--green-alien-light form__text--link' style={{ marginLeft: '5px' }} >Login</span>
                        </p>
                    </form>
                    <SignUpSuccess
                        emailCopy={emailCopy}
                        resendEmailErr={resendEmailErr}
                        setResendEmailErr={setResendEmailErr}
                        successed={successed}
                    />
                </div>
            </section>
        </div>
    );
}

export default SignUpForm;