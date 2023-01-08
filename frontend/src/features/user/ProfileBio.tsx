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
                <div className='profile-bio__content'>
                    {user?.profile.biography.about ? (
                        <p>{user?.profile.biography.about}</p>
                    ) : (
                        <p style={{ color: 'gray' }}>Write something about yourself...</p>
                    )}
                </div>
            </section>
            {/* <section className='profile-bio__wrapper'>
                <header>
                    <h1>
                        About Me
                        <div className='profile-bio__divider'></div>
                    </h1>
                </header>
            </section> */}
        </div>
    );
}

export default ProfileBio;