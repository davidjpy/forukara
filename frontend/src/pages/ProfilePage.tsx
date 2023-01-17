import { FC, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

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
    const { data: user, isLoading: isUserLoading, isFetching: isUserFetching } = useGetUserByUsernameQuery(`${username}`);
    const account = useAppSelector((state) => state.auth.user);

    // Send user to error page
    useEffect(() => {
        if (!isUserFetching && !user) {
            navigate('/error', { replace: true });
        }
    }, [isUserFetching, user]);

    const isLoading = Boolean(isUserLoading || isUserFetching);

    return (
        <div className='profile-page'>
            {isLoading ? (
                <>
                    <div className='profile-bg-sk'>
                        <Skeleton
                            baseColor='#D3DCE2'
                            height='100%'
                            borderRadius={0}
                        />
                        <div className='profile-dls-sk'>
                            <Skeleton
                                circle
                                width={150}
                                height={150}
                                baseColor='#E3E3E3'
                            />
                            <Skeleton
                                baseColor='#E3E3E3'
                                width={200}
                                height={30}
                                style={{
                                    margin: '1.6rem 0 1rem 0'
                                }}
                            />
                            <Skeleton
                                baseColor='#E3E3E3'
                                width={120}
                                height={20}
                                count={3}
                                style={{
                                    margin: '0.4rem 0'
                                }}
                            />
                        </div>
                    </div>
                    <div className='profile-dls-info'>
                        {Array.from(Array(4).keys()).map((key) => (
                            <div key={key}>
                                <Skeleton
                                    baseColor='#E3E3E3'
                                    height={30}
                                    width='60%'
                                    style={{
                                        marginBottom: '1rem'
                                    }}
                                />
                                <Skeleton
                                    baseColor='#E3E3E3'
                                    height={20}
                                    count={2}
                                    style={{
                                        margin: '0.4rem 0'
                                    }}
                                />
                                <Skeleton
                                    baseColor='#E3E3E3'
                                    height={20}
                                    width='80%'
                                    style={{
                                        marginTop: '0.4rem'
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <ProfileBackground
                        user={user as User}
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
                </>
            )}
        </div>
    );
}



export default ProfilePage; 