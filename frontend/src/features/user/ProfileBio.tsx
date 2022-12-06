import { FC } from 'react';
import { AiFillProfile } from 'react-icons/ai';

import { User } from '@common/utilities/types';

type Props = {
    user: User
}

const ProfileBio: FC<Props> = ({ user }: Props) => {
    return (
        <section className='profilebio'>
            <header>
                <AiFillProfile className='profilebio__icon' />
            </header>
            <div className='profilebio__wrapper'>
                <h1>
                    BIOGRAPHY
                    <div className='profilebio__divider'></div>
                </h1>

                {user?.about ? (
                    <p>{user?.about}</p>
                ) : (
                    <p style={{ color: 'gray' }}>Write something about yourself...</p>
                )}

            </div>
        </section>
    );
}

export default ProfileBio;