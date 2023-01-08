import { FC } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { ImLocation2 } from 'react-icons/im'
import { MdEdit } from 'react-icons/md';
import moment from 'moment';

import { User } from '@common/utilities/types';
import default_avatar from '@media/images/default_avatar.webp';
import ProfileTabBar from './ProfileTabBar';
import { useAppSelector } from '@app/hooks';
import { useNavigate } from 'react-router-dom';

type Props = {
    user: User;
    isLoading: boolean;
};

const ProfileDetails: FC<Props> = ({ user, isLoading }: Props) => {

    const account = useAppSelector((state) => state.auth.user);
    const navigate = useNavigate();

    return (
        <section className={isLoading ? 'profile-dls' : 'profile-dls profile-dls--loaded'}>
            <div className={isLoading ? 'profile-dls__wrapper' : 'profile-dls__wrapper profile-dls__wrapper--loaded'}>
                {
                    account.id === user?.id &&
                    <button onClick={() => navigate('/settings/edit')} title='Edit your profile' aria-label='Edit Your Profile' className='profile-dls__btn'>
                        <MdEdit aria-hidden={true} size={20} className='profile-dls__icon' />
                    </button>
                }
                <figure className={isLoading ? 'profile-dls__figure' : 'profile-dls__figure profile-dls__figure--loaded'}>
                    <div>
                        <img alt={!user?.profile.avatar ? default_avatar : user?.profile.avatar} src={!user?.profile.avatar ? default_avatar : user?.profile.avatar} />
                    </div>
                    <figcaption>{user?.profile.username}</figcaption>
                    <p>
                        <ImLocation2 className='profile-dls__icon' />
                        Tokyo, Japan
                    </p>
                    <p>
                        <FaCalendarAlt className='profile-dls__icon' />
                        {user?.createdAt && moment(`${user.createdAt}`).format('Do MMMM, YYYY')}
                    </p>
                </figure>
                <ProfileTabBar />
            </div>
        </section>
    );
}

export default ProfileDetails;

