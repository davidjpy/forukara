import { FC } from 'react';

import '@pages/ProfilePage.css';
import ProfileImage from '@features/user/ProfileImage';
import ProfileBio from '@features/user/ProfileBio';
import { useGetUserByUsernameQuery } from '@features/user/userSlice';
import { useParams } from 'react-router-dom';

const ProfilePage: FC = () => {

    const { username } = useParams();
    const { data: user } = useGetUserByUsernameQuery(`${username}`);

    return (
        <div className='profilepage'>
            <div className='profilepage__wrapper'>
                <ProfileImage
                    user={user}
                />
                <ProfileBio
                    user={user}
                />
            </div>
        </div>
    );
}

export default ProfilePage; 