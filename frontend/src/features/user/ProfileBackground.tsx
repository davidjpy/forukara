import { FC } from 'react';

import ProfileDetails from '@features/user/ProfileDetails';
import { User } from '@common/utilities/types';
import default_background from '@media/images/default_background.webp';

type Props = {
    user: User;
}

const ProfileBackground: FC<Props> = ({ user }: Props) => {
    return (
        <section className='profile-bg'>
            <div role='img' aria-label='background image' title='background image'
                className='profile-bg__bg'
                style={{ backgroundImage: `url(${!user?.profile.background ? default_background : user?.profile.background})` }}
            />
            <ProfileDetails
                user={user}
            />
        </section>
    );
}

export default ProfileBackground;