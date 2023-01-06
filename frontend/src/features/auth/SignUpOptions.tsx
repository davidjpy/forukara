import { FC } from 'react';
import { MdEmail } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineTwitter } from 'react-icons/ai';
import { FaLinkedinIn } from 'react-icons/fa';
import { Options } from 'focus-trap';
import FocusTrap from 'focus-trap-react';
import { IoMdClose } from 'react-icons/io';

import { onkeyDownHandler } from '@common/utilities/onKeyDownHandler';
import { oAuthPKCEHandler } from '@common/utilities/oAuthPKCEHandler';

type Props = {
    block: 'options' | 'form' | 'success';
    handleLoginFormMounted: () => void;
    hadnleSignUpFormUnmounted: () => void;
    signUpFormMounted: boolean;
    handleNextBlock: (block: 'options' | 'form' | 'success') => void;
}

const focusTrapOptions: Options = {
    checkCanFocusTrap: (trapContainers) => {
        return new Promise((resolve) => {
            const results = trapContainers.map((container) => {
                const interval = setInterval(() => {
                    if (getComputedStyle(container).opacity !== '0') {
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
    escapeDeactivates: false,
    allowOutsideClick: true
};

const SignUpOptions: FC<Props> = ({ block, hadnleSignUpFormUnmounted, handleLoginFormMounted, signUpFormMounted, handleNextBlock }: Props) => {

    return (
        <FocusTrap
            active={signUpFormMounted && block === 'options'}
            focusTrapOptions={focusTrapOptions}
        >
            <section className='opts'
                style={{
                    left:
                        block === 'options' ? 0 :
                            block === 'form' ? 'calc(-100%)' :
                                'calc(-200%)',
                    opacity: signUpFormMounted ? '1' : '0'
                }}
            >
                <button aria-label='close signup form' title='Close Signup Form' onClick={hadnleSignUpFormUnmounted}
                    className='auth__btn auth__btn--cross' style={{ display: block === 'options' ? 'block' : 'none' }}
                >
                    <IoMdClose aria-hidden={true} />
                </button>
                <div className='opts__wrapper'>
                    <button onClick={() => handleNextBlock('form')} className='opts__btn opts__btn--transparent' style={{ margin: '0.6rem 0 0 0' }}>
                        <MdEmail aria-hidden={true} className='opts__icon' />
                        Sign up with email
                    </button>
                </div>
                <div className='opts__divider'><p>or</p></div>
                <div className='opts__wrapper'>
                    <button onClick={() => oAuthPKCEHandler('google')} className='opts__btn opts__btn--google'>
                        <div>
                            <FcGoogle aria-hidden={true} className='opts__icon' />
                        </div>
                        Sign up with Google
                    </button>
                    <button className='opts__btn opts__btn--twitter'>
                        <AiOutlineTwitter aria-hidden={true} className='opts__icon opts__icon--twitter' />
                        Sign Up With Twitter
                    </button>
                    <button onClick={() => oAuthPKCEHandler('linkedin')} className='opts__btn opts__btn--linkedin'>
                        <div>
                            <FaLinkedinIn aria-hidden={true} className='opts__icon opts__icon--linkedin' />
                        </div>
                        Sign Up With Linkedin
                    </button>
                </div>
                <p className='auth__txt auth__txt--white' style={{ textAlign: 'center', margin: '30px 0 50px 0' }}>
                    Already have an account?
                    <span role='button' aria-label='open login form' tabIndex={0} onClick={handleLoginFormMounted} onKeyDown={(e) => onkeyDownHandler(e, 'Enter', handleLoginFormMounted)}
                        className='auth__txt--green-alien-light auth__txt--link' style={{ marginLeft: '5px' }} >Login</span>
                </p>
            </section>
        </FocusTrap>
    );
}

export default SignUpOptions;