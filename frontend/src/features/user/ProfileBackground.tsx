import { FC } from 'react';

import ProfileDetails from '@features/user/ProfileDetails';
import { User } from '@common/utilities/types';
import default_background from '@media/images/default_background.webp';

type Props = {
    user: User;
    isLoading: boolean;
}

const ProfileBackground: FC<Props> = ({ user, isLoading }: Props) => {
    return (
        <section className='profile-bg'>
            <div role='img' aria-label='background image' title='background image'
                className='profile-bg__bg'
                style={{ backgroundImage: `url(${!user?.background ? default_background : user?.background})` }}
            />
            <ProfileDetails
                user={user}
                isLoading={isLoading}
            />
        </section>
    );
}

export default ProfileBackground;