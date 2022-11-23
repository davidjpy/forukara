import { FC } from 'react';

import '@pages/ProfilePage.css';
import ProfileImage from '@features/user/ProfileImage';
import ProfileIntro from '@features/user/ProfileIntro';
import { useGetUserByUsernameQuery } from '@features/user/userSlice';
import { useParams } from 'react-router-dom';

const ProfilePage: FC = () => {

    const { username } = useParams();
    const { data: user } = useGetUserByUsernameQuery(`${username}`);

    return (
        <div className='profilepage'>
            <div className='profilepage-wrapper'>
                <ProfileImage 
                    user={user}
                />
                <ProfileIntro 
                    user={user}
                />
            </div>
        </div>
    );
}

export default ProfilePage; 