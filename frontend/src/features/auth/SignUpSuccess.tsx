import { FC, useRef, useState, useEffect } from 'react';
import { Options } from 'focus-trap';
import FocusTrap from 'focus-trap-react';
import { IoMdClose } from 'react-icons/io';

import { useResendEmailMutation } from '@features/user/userApiSlice';

type Props = {
    emailCopy: string;
    resendEmailErr: string;
    setResendEmailErr: React.Dispatch<React.SetStateAction<string>>;
    block: 'options' | 'form' | 'success';
    signUpFormMounted: boolean;
    hadnleSignUpFormUnmounted: () => void;
};

const focusTrapOptions: Options = {
    checkCanFocusTrap: (trapContainers) => {
        return new Promise((resolve) => {
            const results = trapContainers.map((container) => {
                setTimeout(() => {
                    resolve();
                }, 500);
            })
            return Promise.all(results);
        });
    },
    initialFocus: false,
    returnFocusOnDeactivate: false,
    escapeDeactivates: false
};

const counterTime = 30;

const SignUpSuccess: FC<Props> = ({ emailCopy, resendEmailErr, setResendEmailErr, block, signUpFormMounted, hadnleSignUpFormUnmounted }: Props) => {

    const [resendEmail, resendEmailResult] = useResendEmailMutation();
    const counterRef = useRef<number>(counterTime);
    const [, setCoolDown] = useState<number>(counterTime);

    const handleresendEmail = async (): Promise<any> => {
        await resendEmail({
            email: emailCopy,
        });

        counterRef.current--;
        setCoolDown(prev => prev - 1);
        const counter = setInterval(() => {
            counterRef.current--;
            setCoolDown(prev => prev - 1);

            if (counterRef.current === 0) {
                clearInterval(counter);
                setCoolDown(counterTime);
                counterRef.current = counterTime;
            }
        }, 1000);
    }

    useEffect(() => {
        if (resendEmailResult.error && 'data' in resendEmailResult.error) {
            const { message } = resendEmailResult.error.data as { message: { error: string; code: number } };
            setResendEmailErr(message.error + '*');
        } else {
            setResendEmailErr('');
        }
    }, [resendEmailResult]);

    return (
        <FocusTrap active={signUpFormMounted && block === 'success'} focusTrapOptions={focusTrapOptions}>
            <section className='signupsuccess'
                style={{
                    left:
                        block === 'options' ? '200%' :
                            block === 'form' ? '100%' :
                                '0'
                }}
            >
                <button aria-label='close signup form' title='Close Signup Form' onClick={hadnleSignUpFormUnmounted}
                    className='authform__button authform__button--cross' style={{ display: block === 'success' ? 'block' : 'none' }}
                >
                    <IoMdClose aria-hidden={true} />
                </button>
                <p className='authform__text authform__text--green-alien-light'>Congratulation!</p>
                <p className='authform__text authform__text--white'>Your account has been successfully created. Verify your email address by checking the verification email we just delivered to your inbox</p>
                <p id='resend-email' className='authform__text authform__text--white'>If the email is not reaching you. To get another email, click {counterRef?.current === counterTime ?
                    (
                        <span role='button' aria-labelledby='resend' tabIndex={0} onClick={handleresendEmail} className='authform__text authform__text--green-alien-light authform__text--link'>here</span>
                    ) : (
                        <span className='authform__text authform__text--gray'>here ({counterRef?.current})</span>
                    )}</p>
                {resendEmailErr && <p className='authform__text authform__text--red' style={{ margin: '0 0 1rem 0' }}>{resendEmailErr}</p>}
                <p className='authform__text authform__text--red'>The account will be deleted in ten minutes if not verified*</p>
            </section>
        </FocusTrap>

    );
}

export default SignUpSuccess;