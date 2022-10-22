import { FC } from 'react';
import { FaBlog } from 'react-icons/fa';

import SignUpForm from '@features/authentication/SignUpForm';
import { useAppDispatch } from '@app/hooks';
import { toggleSignUpForm } from '@features/authentication/authenticationSlice'

const Nav: FC = () => {

    const dispatch = useAppDispatch();

    const handleSignUpFormMounted = (): void => {
        dispatch(toggleSignUpForm(true));
    }

    return (
        <>
            <header className='splashlayout__nav'>
                <div className='splashlayout__container'>
                    <div className='splashlayout__logo-wrapper'>
                        <FaBlog />
                        <p>Forukara</p>
                    </div>
                    <div className='splashlayout__button-wrapper'>
                        <button className='splashlayout__button splashlayout__button--text'>Login</button>
                        <button onClick={handleSignUpFormMounted} className='splashlayout__button splashlayout__button--slide'>&nbsp;</button>
                    </div>
                </div>
            </header>
            <SignUpForm />
        </>
    );
}   

export default Nav; 