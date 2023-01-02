import { FC } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { ImLocation2 } from 'react-icons/im'
import moment from 'moment';

import { User } from '@common/utilities/types';
import default_avatar from '@media/images/default_avatar.webp';
import ProfileTabBar from './ProfileTabBar';

type Props = {
    user: User;
    isLoading: boolean;
};

const ProfileDetails: FC<Props> = ({ user, isLoading }: Props) => {
    return (
        <section className={isLoading ? 'profiledetails' : 'profiledetails profiledetails--loaded'}>
            <div className={isLoading ? 'profiledetails__wrapper' : 'profiledetails__wrapper profiledetails__wrapper--loaded'}>
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

