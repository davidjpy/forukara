import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

import '@pages/ProfilePage.css';
import ProfileBackground from '@features/user/ProfileBackground';
import ProfileBio from '@features/user/ProfileBio';
import ProfileDiscussions from '@features/user/ProfileDiscussions';
import ProfileConnections from '@features/user/ProfileConnections';
import { useGetUserByUsernameQuery } from '@features/user/userApiSlice';
import { useParams } from 'react-router-dom';

const ProfilePage: FC = () => {

    const { username } = useParams();
    const { data: user } = useGetUserByUsernameQuery(`${username}`);
    const [searchParams] = useSearchParams();

    return (
        <div className='profilepage'>
            <div className='profilepage__wrapper'>
                <ProfileBackground
                    user={user!}
                />
                {
                    searchParams.get('search') === 'discussions' ?
                        <ProfileDiscussions /> :
                        searchParams.get('search') === 'connections' ?
                            <ProfileConnections /> :
                            <ProfileBio user={user!} />
                }
            </div>
        </div>
    );
}

export default ProfilePage; 