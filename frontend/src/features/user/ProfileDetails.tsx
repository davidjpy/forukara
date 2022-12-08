import { FC, useState, useEffect } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { ImLocation2 } from 'react-icons/im'
import { useSearchParams } from "react-router-dom";
import moment from 'moment';

import { User } from '@common/utilities/types';
import default_avatar from '@media/images/default_avatar.webp';

type Props = {
    user: User;
}

const ProfileDetails: FC<Props> = ({ user }: Props) => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [searchParams, setSearchParams] = useSearchParams({ search: 'biography' });

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 0)
    }, []);

    const handleSwitchTab = (tab: 'biography' | 'discussions' | 'connections'): void => {
        setSearchParams({ search: tab }, { replace: true });
    }

    return (
        <section className={isLoading ? 'profiledetails' : 'profiledetails profiledetails--loaded'}>
            <div className={isLoading ? 'profiledetails__wrapper' : 'profiledetails__wrapper profiledetails__wrapper--loaded'}>
                <figure className={isLoading ? 'profiledetails__figure' : 'profiledetails__figure profiledetails__figure--loaded'}>
                    <div>
                        <img src={!user?.avatar ? default_avatar : user?.avatar} alt='profile' />
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
                <ul role='tablist' className='profiledetails__tablist'>
                    <li role='tab' aria-controls='biography' onClick={() => handleSwitchTab('biography')}
                        className={searchParams.get('search') === 'biography' ?
                            'profiledetails__tab profiledetails__tab--active' :
                            'profiledetails__tab'
                        }>
                        <h1>BIOGRAPHY</h1>
                    </li>
                    <li role='tab' aria-controls='discussions' onClick={() => handleSwitchTab('discussions')}
                        className={searchParams.get('search') === 'discussions' ?
                            'profiledetails__tab profiledetails__tab--active' :
                            'profiledetails__tab'
                        }>
                        <h1>DISCUSSIONS</h1>
                    </li>
                    <li role='tab' aria-controls='connections' onClick={() => handleSwitchTab('connections')}
                        className={searchParams.get('search') === 'connections' ?
                            'profiledetails__tab profiledetails__tab--active' :
                            'profiledetails__tab'
                        }>
                        <h1>CONNECTIONS</h1>
                    </li>
                    <div
                        className={
                            searchParams.get('search') === 'biography' ?
                                'profiledetails__underline profiledetails__underline--left' :
                                searchParams.get('search') === 'discussions' ?
                                    'profiledetails__underline profiledetails__underline--center' :
                                    'profiledetails__underline profiledetails__underline--right'
                        }>
                    </div>
                </ul>
            </div>
        </section>
    );
}

export default ProfileDetails;

