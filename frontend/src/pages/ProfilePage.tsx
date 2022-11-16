import { FC } from 'react';

import '@pages/ProfilePage.css';
import ProfileImage from '@features/user/ProfileImage';
import ProfileDetails from '@features/user/ProfileDetails';

const ProfilePage: FC = () => {
    return (
        <div className='profilepage'>
            <div className='profilepage__wrapper'>
                <ProfileImage />
                <ProfileDetails />
            </div>
        </div>
    );
}

export default ProfilePage;