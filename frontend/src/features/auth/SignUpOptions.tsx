import { FC } from 'react';

type Props = {
    block: 'options' | 'form' | 'success';
    setBlock: React.Dispatch<React.SetStateAction<'options' | 'form' | 'success'>>;
    handleLoginFormMounted: () => void;
}

const SignUpOptions: FC<Props> = ({ block, setBlock, handleLoginFormMounted }: Props) => {
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
                <button className='signupoptions__button signupoptions__button--transparent'>Sign up with email</button>
            </div>
            <div className='signupoptions__divider'><p>or</p></div>
            <div className='signupoptions__wrapper'>
                <button className='signupoptions__button signupoptions__button--google'>Sign up with Google</button>
                <button className='signupoptions__button signupoptions__button--twitter'>Sign Up With Twitter</button>
                <button className='signupoptions__button signupoptions__button--linkedin'>Sign Up With Linkedin</button>
            </div>
            <p id='open-login-form' className='form__text form__text--white' style={{ textAlign: 'center', margin: '30px 0 50px 0' }}>
                Already have an account?
                <span role='button' aria-labelledby='open-login-form' onClick={handleLoginFormMounted} className='form__text--green-alien-light form__text--link' style={{ marginLeft: '5px' }} >Login</span>
            </p>
        </section>
    );
}

export default SignUpOptions;