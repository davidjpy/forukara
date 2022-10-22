import { FC } from 'react';

import { useClickOutside } from '@common/hooks/useClickOutside';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import { toggleSignUpForm } from '@features/authentication/authenticationSlice';

const SignUpForm: FC = () => {

    const dispatch = useAppDispatch();
    const signUpFormMounted = useAppSelector((state) => state.authentication.signUpFormMounted);

    const hadnleSignUpFormUnmounted = (): void => {
        dispatch(toggleSignUpForm(false))
    }

    const wrapperRef = useClickOutside(hadnleSignUpFormUnmounted);

    return (
        <>
            <div className='layout__overlay'
                style={{ opacity: signUpFormMounted ? 1 : 0 }}
            />
            <div ref={wrapperRef} className='layout__signupform'
                style={signUpFormMounted
                    ? { opacity: 1, pointerEvents: 'all' }
                    : { opacity: 0, pointerEvents: 'none' }}>
                <h1 className='layout__header'>Sign Up</h1>
            </div>
        </>
    );
}

export default SignUpForm;