import { FC } from 'react';

import '@pages/ProfilePage.css';
import ProfileImage from '@features/user/ProfileImage';
import ProfileIntro from '@features/user/ProfileIntro';

const ProfilePage: FC = () => {
    return (
        <div className='profilepage'>
            <div className='profilepage__wrapper'>
                <ProfileImage />
                <ProfileIntro />
            </div>
        </div>
    );
}

export default ProfilePage; 