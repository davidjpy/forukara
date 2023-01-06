import { FC, useRef, useState, useEffect } from 'react';
import { Options } from 'focus-trap';
import FocusTrap from 'focus-trap-react';
import { IoMdClose } from 'react-icons/io';

import { useResendEmailMutation } from '@features/user/userApiSlice';
import { onkeyDownHandler } from '@common/utilities/onKeyDownHandler';

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
    escapeDeactivates: false,
    allowOutsideClick: true
};

const counterTime = 30;

const SignUpSuccess: FC<Props> = ({ emailCopy, resendEmailErr, setResendEmailErr, block, signUpFormMounted, hadnleSignUpFormUnmounted }: Props) => {

    const [resendEmail, resendEmailResult] = useResendEmailMutation();
    const counterRef = useRef<number>(counterTime);
    const [, setCoolDown] = useState<number>(counterTime);

    const handleResendEmail = async (): Promise<any> => {
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

        await resendEmail({
            email: emailCopy,
        });
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
            <section className='sign-succ'
                style={{
                    left:
                        block === 'options' ? '200%' :
                            block === 'form' ? '100%' :
                                '0'
                }}
            >
                <button aria-label='close signup form' title='Close Signup Form' onClick={hadnleSignUpFormUnmounted}
                    className='auth__btn auth__btn--cross' style={{ display: block === 'success' ? 'block' : 'none' }}
                >
                    <IoMdClose aria-hidden={true} />
                </button>
                <p className='auth__txt auth__txt--green-alien-light'>Congratulation!</p>
                <p className='auth__txt auth__txt--white'>Your account has been successfully created. Verify your email address by checking the verification email we just delivered to your inbox</p>
                <p id='resend-email' className='auth__txt auth__txt--white'>If the email is not reaching you. To get another email, click {counterRef?.current === counterTime ?
                    (
                        <span role='button' title='Get Another Verification Email' aria-label='get another verification email' tabIndex={0} 
                            onClick={handleResendEmail} onKeyDown={(e) => onkeyDownHandler(e, 'Enter', handleResendEmail)}
                            className='auth__txt auth__txt--green-alien-light auth__txt--link'>here</span>
                    ) : (
                        <span className='auth__txt auth__txt--gray'>here ({counterRef?.current})</span>
                    )}</p>
                {resendEmailErr && <p className='auth__txt auth__txt--red' style={{ margin: '0 0 1rem 0' }}>{resendEmailErr}</p>}
                <p className='auth__txt auth__txt--red'>The account will be deleted in ten minutes if not verified*</p>
            </section>
        </FocusTrap>

    );
}

export default SignUpSuccess;