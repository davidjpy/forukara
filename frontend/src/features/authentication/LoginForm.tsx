import { FC } from 'react';

import { useAppSelector, useAppDispatch } from '@app/hooks';
import { useClickOutside } from '@common/hooks/useClickOutside';
import { toggleLoginForm } from '@features/authentication/authenticationSlice';

const LoginForm: FC = () => {

    const dispatch = useAppDispatch();
    const loginFormMounted = useAppSelector((state) => state.authentication.loginFormMounted);

    const handleLoginFormUnmounted = (): void => {
        dispatch(toggleLoginForm(false));
    }

    const wrapperRef = useClickOutside(handleLoginFormUnmounted)

    return (
        <>
            <div className='layout__overlay'
                style={loginFormMounted 
                    ? { opacity: 1, pointerEvents: 'all' }
                    : { opacity: 0, pointerEvents: 'none' }}
            />
            <div ref={wrapperRef} className='layout__loginform'
                style={loginFormMounted
                    ? { opacity: 1, pointerEvents: 'all' }
                    : { opacity: 0, pointerEvents: 'none' }}>
                <h1 className='layout__header'>Login</h1>
            </div>
        </>
    );
}

export default LoginForm;