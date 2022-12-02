import { FC, useState, useEffect, PropsWithChildren } from 'react';
import moment from 'moment';
import { FaCalendarAlt } from 'react-icons/fa';
import { ImLocation2 } from 'react-icons/im'

import { User } from '@common/utilities/types';
import default_avatar from '@media/images/default_avatar.webp';

type Props = {
    user: User
}

const ProfileDetails: FC<PropsWithChildren<any>> = (props: Props) => {

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 0)
    }, []);

    return (
        <section className={isLoading ? 'profiledetails' : 'profiledetails profiledetails--loaded'}>
            <div className={isLoading ? 'profiledetails__wrapper' : 'profiledetails__wrapper profiledetails__wrapper--loaded'}>
                <figure className={isLoading ? 'profiledetails__figure' : 'profiledetails__figure profiledetails__figure--loaded'}>
                    <div>
                        <img src={!props.user?.avatar ? default_avatar : props.user?.avatar} alt='profile' />
                    </div>
                    <figcaption>{props.user?.username}</figcaption>
                    <p>
                        <ImLocation2 className='profiledetails__icon' />
                        Tokyo, Japan
                    </p>
                    <p>
                        <FaCalendarAlt className='profiledetails__icon' />
                        {moment(`${props.user?.createdAt}`).format('Do MMMM, YYYY')}
                    </p>
                </figure>
                <div className='profiledetails__info'>
                </div>
                <ul role='tablist' className='profiledetails__tablist'>
                    <li role='tab'>
                        <h1>{props.user?.discussion?.length}</h1>
                        <p>DISCUSSIONS</p>
                    </li>
                    <div className='profiledetails__divider'></div>
                    <li role='tab'>
                        <h1>{props.user?.followers?.length}</h1>
                        <p>FOLLOWERS</p>
                    </li>
                    <div className='profiledetails__divider'></div>
                    <li role='tab'>
                        <h1>{props.user?.following?.length}</h1>
                        <p>FOLLOWING</p>
                    </li>
                </ul>
            </div>
        </section>
    );
}

export default ProfileDetails;

