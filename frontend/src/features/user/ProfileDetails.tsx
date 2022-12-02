import { FC, useState, useEffect, PropsWithChildren } from 'react';

import { User } from '@common/utilities/types';
import { baseUrl } from '@app/apiSlice';
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

    console.log(props.user)

    return (
        <section className={isLoading ? 'profiledetails' : 'profiledetails profiledetails--loaded' }>
            <div className={isLoading ? 'profiledetails-wrapper' : 'profiledetails-wrapper profiledetails-wrapper--loaded'}> 
                <figure className={isLoading ? 'profiledetails__figure' : 'profiledetails__figure profiledetails__figure--loaded'}>
                    <img src={!props.user?.avatar ? default_avatar : props.user?.avatar} alt='profile' />
                    <figcaption>{props.user?.username}</figcaption>
                    <p>Tokyo, Japan</p>
                    <p>{props.user?.createdAt}</p>
                </figure>
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

