import { FC, useState, useEffect } from 'react';

import nav_background from '@media/images/nav_background.webp';
import profile from '@media/images/profile.jpg';


const ProfileDetails: FC = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 0)
    }, []);

    return (
        <section className={isLoading ? 'profiledetails' : 'profiledetails profiledetails--loaded' }>
            <div className={isLoading ? 'profiledetails-wrapper' : 'profiledetails-wrapper profiledetails-wrapper--loaded'}> 
                <figure className={isLoading ? 'profiledetails__figure' : 'profiledetails__figure profiledetails__figure--loaded'}>
                    <img src={profile} alt='profile' />
                    <figcaption>Ho Chi Hang</figcaption>
                    <p>Tokyo, Japan</p>
                </figure>
                <ul role='tablist' className='profiledetails__tablist'>
                    <li role='tab'>
                        <h1>23</h1>
                        <p>DISCUSSIONS</p>
                    </li>
                    <div className='profiledetails__divider'></div>
                    <li role='tab'>
                        <h1>123</h1>
                        <p>FOLLOWERS</p>
                    </li>
                    <div className='profiledetails__divider'></div>
                    <li role='tab'>
                        <h1>223</h1>
                        <p>FOLLOWING</p>
                    </li>
                </ul>
            </div>
        </section>
    );
}

export default ProfileDetails;

