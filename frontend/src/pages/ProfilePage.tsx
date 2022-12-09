import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

import '@pages/ProfilePage.css';
import ProfileBackground from '@features/user/ProfileBackground';
import ProfileBio from '@features/user/ProfileBio';
import ProfileDiscussions from '@features/user/ProfileDiscussions';
import ProfileConnections from '@features/user/ProfileConnections';
import { useGetUserByUsernameQuery } from '@features/user/userApiSlice';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '@app/hooks';

const ProfilePage: FC = () => {

    const { username } = useParams();
    useGetUserByUsernameQuery(`${username}`);
    const user = useAppSelector((state) => state.user.userProfile);
    const [searchParams] = useSearchParams();

    return (
        <div className='profilepage'>
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
    );
}

export default ProfilePage; 