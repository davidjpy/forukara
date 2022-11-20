import { FC, useState, useEffect } from 'react';

import coast from '@media/images/coast.jpg';
import ProfileDetails from '@features/user/ProfileDetails';


const ProfileImage: FC = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    return (
        <section className={isLoading ? 'profileimage' : 'profileimage profileimage--loaded'}>
            <div className={isLoading ? 'profileimage__background' : 'profileimage__background profileimage__background--loaded'} style={{ backgroundImage: `url(${coast})` }} />
            <ProfileDetails />
        </section>
    );
}

export default ProfileImage;