import { FC } from 'react';

import { User } from '@common/utilities/types';

type Props = {
    user: User
}

const ProfileBio: FC<Props> = ({ user }: Props) => {
    return (
        <div className='profilebio'>
            <section className='profilebio__wrapper'>
                <header>
                    <h1>
                        ABOUT ME
                        <div className='profilebio__divider'></div>
                    </h1>
                </header>
                {user?.about ? (
                    <p>{user?.about}</p>
                ) : (
                    <p style={{ color: 'gray' }}>Write something about yourself...</p>
                )}
            </section>
        </div>
    );
}

export default ProfileBio;