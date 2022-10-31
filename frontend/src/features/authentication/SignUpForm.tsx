import { FC, FormEvent, ChangeEvent, useState, useEffect, useRef, MutableRefObject } from 'react';
import { FaUser } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { RiLockPasswordFill } from 'react-icons/ri';

import { useClickOutside } from '@common/hooks/useClickOutside';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import { toggleSignUpForm, toggleLoginForm } from '@features/authentication/authenticationSlice';
import { useCreateUserMutation, useResendEmailMutation } from '@features/authentication/authenticationApiSlice';

const SignUpForm: FC = () => {

    const formRef = useRef<HTMLDivElement | null>(null);
    const counterRef = useRef<number>(60);
    const dispatch = useAppDispatch();
    const signUpFormMounted = useAppSelector((state) => state.authentication.signUpFormMounted);
    const [createUser, createUserResult] = useCreateUserMutation();
    const [resendEmail, resendEmailResult] = useResendEmailMutation();
    const [userId, setUserId] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [emailCopy, setEmailCopy] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const [err, setErr] = useState<string>('');
    const [userIdErr, setUserIdErr] = useState<string>('');
    const [emailErr, setEmailErr] = useState<string>('');
    const [passwordErr, setPasswordErr] = useState<string>('');
    const [confirmPasswordErr, setConfirmPasswordErr] = useState<string>('');
    const [resendEmailErr, setResendEmailErr] = useState<string>('');
    const [resendCooldown, setresendCooldown] = useState<number>(-1);

    const submitNotAllowed: boolean = Boolean(err || userIdErr || emailErr || passwordErr || confirmPasswordErr);

    const hadnleSignUpFormUnmounted = (): void => {
        dispatch(toggleSignUpForm(false));
        handleResetInput();
        setTimeout(() => {
            if (formRef.current) {
                formRef.current.style.left = '64px';
            }
        }, 300);
    }

    const handleLoginFormMounted = (): void => {
        hadnleSignUpFormUnmounted();
        dispatch(toggleLoginForm(true));
    }

    const handleSubmitForm = async (e: FormEvent<HTMLFormElement>): Promise<any> => {
        e.preventDefault();
        setEmailCopy(email);
        await createUser({
            username: userId,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        });
    }

    useEffect(() => {
        console.log(createUserResult);

        if (createUserResult.isSuccess) {
            if (formRef.current) {
                formRef.current.style.left = '-322px';
            }
            handleResetInput();
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

    const handleresendEmail = async (): Promise<any> => {
        await resendEmail({
            email: emailCopy,
        });
        counterRef.current--;
        let ref = 1;
        setresendCooldown(ref++);
        const timer = setInterval(() => {
            counterRef.current--;
            setresendCooldown(ref++);

            if (counterRef.current === 0) {
                counterRef.current = 60;
                clearInterval(timer);
            }
        }, 1000);
    }

    useEffect(() => {
        console.log(resendEmailResult)
        if (resendEmailResult.error && 'data' in resendEmailResult.error) {
            const { message } = resendEmailResult.error.data as { message: { error: string; code: number } };
            setResendEmailErr(message.error + '*');
        }
    }, [resendEmailResult]);

    const handleResetInput = (): void => {
        setUserId('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErr('');
        setUserIdErr('');
        setEmailErr('');
        setPasswordErr('');
        setConfirmPasswordErr('');
    }

    const handleChangeUserId = (e: ChangeEvent<HTMLInputElement>): void => {
        setUserId(e.target.value);
        setUserIdErr('');
        setErr('');
    }

    const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value);
        setEmailErr('');
        setErr('');
    }

    const handleChangePassword = (e: ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value);
        setPasswordErr('');
        setErr('');
    }

    const handleChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>): void => {
        setConfirmPassword(e.target.value);
        setConfirmPasswordErr('');
        setErr('');
    }

    const wrapperRef = useClickOutside(hadnleSignUpFormUnmounted);

    return (
        <>
            <div className='layout__overlay'
                style={signUpFormMounted
                    ? { opacity: 1, pointerEvents: 'all' }
                    : { opacity: 0, pointerEvents: 'none' }}
            />
            <section ref={wrapperRef} className='layout__signupform'
                style={signUpFormMounted
                    ? { opacity: 1, pointerEvents: 'all' }
                    : { opacity: 0, pointerEvents: 'none' }}>
                <h1 className='layout__header'>Sign Up</h1>
                <div ref={formRef} className='layout__form-wrapper'>
                    <div style={{ width: '322px' }}>
                        <form onSubmit={handleSubmitForm} className='layout__form'>
                            <div style={{ margin: userIdErr && '1.5rem 0 0.5rem 0' }}>
                                <input value={userId} onChange={handleChangeUserId} type='text' placeholder=' ' className='layout__input' />
                                <span className='layout__placeholder'><FaUser style={{ fontSize: '14px', marginBottom: '1px' }} /> User ID *</span>
                                {userIdErr && <p className='layout__text layout__text--red' style={{ margin: '8px 0 0 8px', fontSize: '0.8rem' }}>{userIdErr}</p>}
                            </div>
                            <div style={{ margin: emailErr && '1.5rem 0 0.5rem 0' }}>
                                <input value={email} onChange={handleChangeEmail} type='email' placeholder=' ' className='layout__input' />
                                <span className='layout__placeholder'><IoMdMail style={{ fontSize: '17px' }} /> Email *</span>
                                {emailErr && <p className='layout__text layout__text--red' style={{ margin: '8px 0 0 8px', fontSize: '0.8rem' }}>{emailErr}</p>}
                            </div>
                            <div style={{ margin: passwordErr && '1.5rem 0 0.5rem 0' }}>
                                <input value={password} onChange={handleChangePassword} type='password' placeholder=' ' className='layout__input' />
                                <span className='layout__placeholder'><RiLockPasswordFill style={{ fontSize: '16px' }} /> Password *</span>
                                {passwordErr && <p className='layout__text layout__text--red' style={{ margin: '8px 0 0 8px', fontSize: '0.8rem' }}>{passwordErr}</p>}
                            </div>
                            <div style={{ margin: confirmPasswordErr && '1.5rem 0 0.5rem 0' }}>
                                <input value={confirmPassword} onChange={handleChangeConfirmPassword} type='password' placeholder=' ' className='layout__input' />
                                <span className='layout__placeholder'><RiLockPasswordFill style={{ fontSize: '16px' }} /> Confirm Password *</span>
                                {confirmPasswordErr && <p className='layout__text layout__text--red' style={{ margin: '8px 0 0 8px', fontSize: '0.8rem' }}>{confirmPasswordErr}</p>}
                            </div>
                            {err && <p className='layout__text layout__text--red'>{err}</p>}
                            {createUserResult.isLoading ? (
                                <div style={{ position: 'relative' }}>
                                    <input type='submit' disabled={true} value='' />
                                    <div className='layout__loader' style={{ position: 'absolute' }} />
                                </div>
                            ) : (
                                <input type='submit' disabled={submitNotAllowed} value='Create Account' />
                            )}
                        </form>
                        <p className='layout__text layout__text--white' style={{ textAlign: 'center', marginTop: '30px' }}>
                            Already have an account?
                            <span onClick={handleLoginFormMounted} className='layout__text--alien-green-light layout__text--link' style={{ marginLeft: '5px' }} >Login</span>
                        </p>
                    </div>
                    <div className='layout__success-wrapper'>
                        <p className='layout__text layout__text--alien-green-light'>Congratulation!</p>
                        <p className='layout__text layout__text--white'>Your account has been successfully created. Verify your email address by checking the verification email we just delivered to your inbox</p>
                        <p className='layout__text layout__text--white'>If the email is not reaching you. To get another email, click {counterRef?.current === 60 ? 
                        (
                            <span onClick={handleresendEmail} className='layout__text layout__text--alien-green-light layout__text--link'>here</span>
                        ) : (
                            <span className='layout__text layout__text--gray'>here ({counterRef.current})</span>
                        )}</p>
                        {resendEmailErr && <p className='layout__text layout__text--red' style={{ margin: '0 0 1rem 0' }}>{resendEmailErr}</p>}
                        <p className='layout__text layout__text--red'>The account will be deleted in five minutes if not verified*</p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default SignUpForm;