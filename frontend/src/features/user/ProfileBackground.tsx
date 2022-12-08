import { FC, useState, useEffect } from 'react';

import ProfileDetails from '@features/user/ProfileDetails';
import { User } from '@common/utilities/types';
import default_background from '@media/images/default_background.webp';

type Props = {
    user: User
}

const ProfileBackground: FC<Props> = ({ user }: Props) => {

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    return (
        <section className={isLoading ? 'profilebackground' : 'profilebackground profilebackground--loaded'}>
            <div className={isLoading ? 'profilebackground__background' : 'profilebackground__background profilebackground__background--loaded'} 
                style={{ backgroundImage: `url(${!user?.background ? default_background : user?.background})` }} 
            />
            <ProfileDetails 
                user={user}
            />
        </section>
    );
}

export default ProfileBackground;