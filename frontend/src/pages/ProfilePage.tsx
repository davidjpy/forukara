import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IoMdReturnLeft } from 'react-icons/io';
import { AiFillHome } from 'react-icons/ai';
import { useNavigate, Navigate } from 'react-router-dom';

import '@pages/ProfilePage.css';
import ProfileBackground from '@features/user/ProfileBackground';
import ProfileBio from '@features/user/ProfileBio';
import ProfileDiscussions from '@features/user/ProfileDiscussions';
import ProfileConnections from '@features/user/ProfileConnections';
import { useGetUserByUsernameQuery } from '@features/user/userApiSlice';
import { useParams } from 'react-router-dom';
import { User } from '@common/utilities/types';
import { useAppSelector } from '@app/hooks';

const ProfilePage: FC = () => {

    const navigate = useNavigate();
    const { username } = useParams();
    const [searchParams] = useSearchParams();
    const { data: user, isLoading } = useGetUserByUsernameQuery(`${username}`);
    const account = useAppSelector((state) => state.auth.user);

    return (
        <div className='profilepage'>
            <header className='layout__header'>
                <button onClick={() => navigate(-1)} aria-label='Previous page' title='Navigate to previous page'>
                    <IoMdReturnLeft aria-hidden={true} size={20} style={{ verticalAlign: 'top' }} />
                </button>
                <h1>
                    <AiFillHome aria-hidden={true} style={{ verticalAlign: 'top' }} /> Home / Users / <span>{user?.username}</span>
                </h1>
            </header>
            <ProfileBackground
                user={user as User}
                isLoading={isLoading}
            />
            {
                searchParams.get('search') === 'discussions' ?
                    <ProfileDiscussions
                        user={user as User}
                        account={account}
                    /> :
                    searchParams.get('search') === 'connections' ?
                        <ProfileConnections
                            user={user as User}
                            account={account}
                        /> :
                        <ProfileBio user={user as User} />
            }
        </div>
    );
}

export default ProfilePage; 