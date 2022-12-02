import { FC, PropsWithChildren } from 'react';
import { AiFillProfile } from 'react-icons/ai';

import { User } from '@common/utilities/types';

type props = {
    user: User
}

const ProfileIntro: FC<PropsWithChildren<any>> = (props: props) => {
    return (
        <section className='profileintro'>
            <header>
                <AiFillProfile className='profileintro__icon' />
            </header>
            <div className='profileintro-wrapper'>
                <h1>
                    ABOUT ME
                    <div className='profileintro__divider'></div>
                </h1>

                {props.user?.about ? (
                    <p>{props.user?.about}</p>
                ) : (
                    <p style={{ color: 'gray' }}>Write something about yourself...</p>
                )}

            </div>
        </section>
    );
}

export default ProfileIntro;