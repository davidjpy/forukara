import { FC, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

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

    const { username } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { data: user, isLoading, isFetching } = useGetUserByUsernameQuery(`${username}`);
    const account = useAppSelector((state) => state.auth.user);

    // Send user to error page
    useEffect(() => {
        if (!isFetching && !user) {
            navigate('/error', { replace: true });
        }
    }, [isFetching, user]);

    useEffect(() => {
        console.log(user);
    }, [user])

    return (
        <div className='profile-page'>
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