import { FC } from 'react';

import '@pages/ProfilePage.css';
import ProfileImage from '@features/user/ProfileImage';

const ProfilePage: FC = () => {
    return (
        <div className='profilepage'>
            <div className='profilepage__wrapper'>
                <ProfileImage />
            </div>
        </div>
    );
}

export default ProfilePage;