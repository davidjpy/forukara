import { FC, FormEvent, ChangeEvent, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { RiLockPasswordFill } from 'react-icons/ri';

import { useClickOutside } from '@common/hooks/useClickOutside';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import { toggleSignUpForm, toggleLoginForm } from '@features/authentication/authenticationSlice';

const SignUpForm: FC = () => {

    const dispatch = useAppDispatch();
    const signUpFormMounted = useAppSelector((state) => state.authentication.signUpFormMounted);
    const [userId, setUserId] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');


    const hadnleSignUpFormUnmounted = (): void => {
        dispatch(toggleSignUpForm(false));
    }

    const handleLoginFormMounted = (): void => {
        dispatch(toggleSignUpForm(false));
        dispatch(toggleLoginForm(true));
    }

    const handleSubmitForm = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        console.log('submit');
    }

    const handleChangeUserId = (e: ChangeEvent<HTMLInputElement>): void => {
        setUserId(e.target.value);
    }

    const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value);
    }

    const handleChangePassword = (e: ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value);
    }

    const handleChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>): void => {
        setConfirmPassword(e.target.value);
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
                <form onSubmit={handleSubmitForm} className='layout__form'>
                    <div>
                        <input value={userId} onChange={handleChangeUserId} type='text' placeholder=' ' className='layout__input' />
                        <span className='layout__placeholder'><FaUser style={{ fontSize: '14px', marginBottom: '1px' }} /> User ID *</span>
                    </div>
                    <div>
                        <input value={email} onChange={handleChangeEmail} type='email' placeholder=' ' className='layout__input' />
                        <span className='layout__placeholder'><IoMdMail style={{ fontSize: '17px' }} /> Email *</span>
                    </div>
                    <div>
                        <input value={password} onChange={handleChangePassword} type='password' placeholder=' ' className='layout__input' />
                        <span className='layout__placeholder'><RiLockPasswordFill style={{ fontSize: '16px' }} /> Password *</span>
                    </div>
                    <div>
                        <input value={confirmPassword} onChange={handleChangeConfirmPassword} type='password' placeholder=' ' className='layout__input' />
                        <span className='layout__placeholder'><RiLockPasswordFill style={{ fontSize: '16px' }} /> Confirm Password *</span>
                    </div>
                    <input type='submit' value='Create Account' />
                </form>
                <p className='layout__text layout__text--white' style={{ textAlign: 'center', marginTop: '30px' }}>
                    Already have an account?
                    <span onClick={handleLoginFormMounted} className='layout__text--alien-green-light layout__text--link' style={{ marginLeft: '5px' }} >Login</span>
                </p>
            </section>
        </>
    );
}

export default SignUpForm;