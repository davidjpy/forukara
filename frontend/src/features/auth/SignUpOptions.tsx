import { FC } from 'react';
import { MdEmail } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineTwitter } from 'react-icons/ai';
import { FaLinkedinIn } from 'react-icons/fa';

type Props = {
    block: 'options' | 'form' | 'success';
    setBlock: React.Dispatch<React.SetStateAction<'options' | 'form' | 'success'>>;
    handleLoginFormMounted: () => void;
    signUpFormMounted: boolean;
}

const SignUpOptions: FC<Props> = ({ block, setBlock, handleLoginFormMounted, signUpFormMounted }: Props) => {

    const handleNextBlock = (block: 'options' | 'form' | 'success'): void => {
        setBlock(block);
    }

    return (
        <section className='signupoptions'
            style={{
                left:
                    block === 'options' ? 0 :
                        block === 'form' ? 'calc(-100%)' :
                            'calc(-200%)'
            }}
        >
            <div className='signupoptions__wrapper'>
                <button id='email-signup-option' onClick={() => handleNextBlock('form')} className='signupoptions__button signupoptions__button--transparent'>
                    <MdEmail className='signupoptions__icon' />
                    Sign up with email
                </button>
            </div>
            <div className='signupoptions__divider'><p>or</p></div>
            <div className='signupoptions__wrapper'>
                <button className='signupoptions__button signupoptions__button--google'>
                    <div>
                        <FcGoogle className='signupoptions__icon' />
                    </div>
                    Sign up with Google
                </button>
                <button className='signupoptions__button signupoptions__button--twitter'>
                    <AiOutlineTwitter className='signupoptions__icon signupoptions__icon--twitter' />
                    Sign Up With Twitter
                </button>
                <button className='signupoptions__button signupoptions__button--linkedin'>
                    <div>
                        <FaLinkedinIn className='signupoptions__icon signupoptions__icon--linkedin' />
                    </div>
                    Sign Up With Linkedin
                </button>
            </div>
            <p id='open-login-form' className='form__text form__text--white' style={{ textAlign: 'center', margin: '30px 0 50px 0' }}>
                Already have an account?
                <span role='button' aria-labelledby='open-login-form' tabIndex={0} onClick={handleLoginFormMounted} className='form__text--green-alien-light form__text--link' style={{ marginLeft: '5px' }} >Login</span>
            </p>
        </section>
    );
}

export default SignUpOptions;