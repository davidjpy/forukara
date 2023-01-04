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
        <section className={isLoading ? 'profiledetails' : 'profiledetails profiledetails--loaded'}>
            <div className={isLoading ? 'profiledetails__wrapper' : 'profiledetails__wrapper profiledetails__wrapper--loaded'}>
                {
                    account.id === user?.id &&
                    <button onClick={() => navigate('/settings/edit')} title='Edit your profile' aria-label='Edit Your Profile' className='profiledetails__button'>
                        <MdEdit aria-hidden={true} size={20} className='profiledetails__icon' />
                    </button>
                }
                <figure className={isLoading ? 'profiledetails__figure' : 'profiledetails__figure profiledetails__figure--loaded'}>
                    <div>
                        <img alt={!user?.avatar ? default_avatar : user?.avatar} src={!user?.avatar ? default_avatar : user?.avatar} />
                    </div>
                    <figcaption>{user?.username}</figcaption>
                    <p>
                        <ImLocation2 className='profiledetails__icon' />
                        Tokyo, Japan
                    </p>
                    <p>
                        <FaCalendarAlt className='profiledetails__icon' />
                        {user?.createdAt && moment(`${user.createdAt}`).format('Do MMMM, YYYY')}
                    </p>
                </figure>
                <ProfileTabBar />
            </div>
        </section>
    );
}

export default ProfileDetails;

