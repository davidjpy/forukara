import { FC } from 'react';

import '@pages/ProfilePage.css';
import ProfileImage from '@features/user/ProfileImage';
import ProfileIntro from '@features/user/ProfileIntro';
import { useAppSelector } from '@app/hooks';

const ProfilePage: FC = () => {

    const user = useAppSelector(state => state.auth.user);
    
    return (
        <div className='profilepage'>
            <div className='profilepage-wrapper'>
                <ProfileImage 
                    user={user}
                />
                <ProfileIntro 
                    user={user}
                />
            </div>
        </div>
    );
}

export default ProfilePage; 