import { FC } from 'react';

import { User } from '@common/utilities/types';

type Props = {
    user: User
}

const ProfileBio: FC<Props> = ({ user }: Props) => {
    return (
        <div className='profile-bio'>
            <section className='profile-bio__wrapper'>
                <header>
                    <h1>
                        About Me
                        <div className='profile-bio__divider'></div>
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