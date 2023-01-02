import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IoMdReturnLeft } from 'react-icons/io';
import { AiFillHome } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import '@pages/ProfilePage.css';
import ProfileBackground from '@features/user/ProfileBackground';
import ProfileTabBar from '@features/user/ProfileTabBar';
import ProfileBio from '@features/user/ProfileBio';
import ProfileDiscussions from '@features/user/ProfileDiscussions';
import ProfileConnections from '@features/user/ProfileConnections';
import { useGetUserByUsernameQuery } from '@features/user/userApiSlice';
import { useParams } from 'react-router-dom';
import { User } from '@common/utilities/types';

const ProfilePage: FC = () => {

    const navigate = useNavigate();
    const { username } = useParams();
    const [searchParams] = useSearchParams();
    const { data: user, isLoading } = useGetUserByUsernameQuery(`${username}`);

    return (
        <div className='profilepage'>
            <header className='profilepage__header'>
                <button onClick={() => navigate(-1)} aria-label='Previous page' title='Navigate to previous page'>
                    <IoMdReturnLeft aria-hidden={true} size={20} style={{ verticalAlign: 'top' }} />
                </button>
                <h1>
                    <AiFillHome aria-hidden={true} style={{ verticalAlign: 'top' }} /> Home / Profiles / <span>{user?.username}</span>
                </h1>
            </header>
            <ProfileBackground
                user={user as User}
                isLoading={isLoading}
            />
            {
                searchParams.get('search') === 'discussions' ?
                    <ProfileDiscussions user={user as User} /> :
                    searchParams.get('search') === 'connections' ?
                        <ProfileConnections /> :
                        <ProfileBio user={user as User} />
            }
        </div>
    );
}

export default ProfilePage; 