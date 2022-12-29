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
            <section className='signupoptions'
                style={{
                    left:
                        block === 'options' ? 0 :
                            block === 'form' ? 'calc(-100%)' :
                                'calc(-200%)',
                    opacity: signUpFormMounted ? '1' : '0'
                }}
            >
                <button aria-label='close signup form' title='Close Signup Form' onClick={hadnleSignUpFormUnmounted}
                    className='authform__button authform__button--cross' style={{ display: block === 'options' ? 'block' : 'none' }}
                >
                    <IoMdClose aria-hidden={true} />
                </button>
                <div className='signupoptions__wrapper'>
                    <button onClick={() => handleNextBlock('form')} className='signupoptions__button signupoptions__button--transparent' style={{ margin: '0.6rem 0 0 0' }}>
                        <MdEmail aria-hidden={true} className='signupoptions__icon' />
                        Sign up with email
                    </button>
                </div>
                <div className='signupoptions__divider'><p>or</p></div>
                <div className='signupoptions__wrapper'>
                    <a onClick={() => oAuthPKCEHandler('/auth/google', 82)} className='signupoptions__button signupoptions__button--google'>
                        <div>
                            <FcGoogle aria-hidden={true} className='signupoptions__icon' />
                        </div>
                        Sign up with Google
                    </a>
                    <a tabIndex={0} className='signupoptions__button signupoptions__button--twitter'>
                        <AiOutlineTwitter aria-hidden={true} className='signupoptions__icon signupoptions__icon--twitter' />
                        Sign Up With Twitter
                    </a>
                    <a className='signupoptions__button signupoptions__button--linkedin'>
                        <div>
                            <FaLinkedinIn aria-hidden={true} className='signupoptions__icon signupoptions__icon--linkedin' />
                        </div>
                        Sign Up With Linkedin
                    </a>
                </div>
                <p className='authform__text authform__text--white' style={{ textAlign: 'center', margin: '30px 0 50px 0' }}>
                    Already have an account?
                    <span role='button' aria-label='open login form' tabIndex={0} onClick={handleLoginFormMounted} onKeyDown={(e) => onkeyDownHandler(e, 'Enter', handleLoginFormMounted)}
                        className='authform__text--green-alien-light authform__text--link' style={{ marginLeft: '5px' }} >Login</span>
                </p>
            </section>
        </FocusTrap>
    );
}

export default SignUpOptions;