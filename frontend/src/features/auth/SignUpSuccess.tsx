import { FC, useRef, useState, useEffect } from 'react';

import { useResendEmailMutation } from '@features/user/userApiSlice';

type Props = {
    emailCopy: string;
    resendEmailErr: string;
    setResendEmailErr: React.Dispatch<React.SetStateAction<string>>;
    successed: boolean;
}

const SignUpSuccess: FC<Props> = ({ emailCopy, resendEmailErr, setResendEmailErr, successed }: Props) => {

    const counterTime = 30;
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
        <section className='signupsuccess'
            style={{
                left: successed ? '0' : '100%',
                transitionDelay: successed ? '0s' : '0.5s'
            }}
        >
            <p className='form__text form__text--green-alien-light'>Congratulation!</p>
            <p className='form__text form__text--white'>Your account has been successfully created. Verify your email address by checking the verification email we just delivered to your inbox</p>
            <p id='resend-email' className='form__text form__text--white'>If the email is not reaching you. To get another email, click {counterRef?.current === counterTime ?
                (
                    <span role='button' aria-labelledby='resend-email' onClick={handleresendEmail} className='form__text form__text--green-alien-light form__text--link'>here</span>
                ) : (
                    <span className='form__text form__text--gray'>here ({counterRef?.current})</span>
                )}</p>
            {resendEmailErr && <p className='form__text form__text--red' style={{ margin: '0 0 1rem 0' }}>{resendEmailErr}</p>}
            <p className='form__text form__text--red'>The account will be deleted in ten minutes if not verified*</p>
        </section>
    );
}

export default SignUpSuccess;