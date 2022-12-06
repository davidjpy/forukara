import { FC, useState, useEffect } from 'react';

import ProfileDetails from '@features/user/ProfileDetails';
import { User } from '@common/utilities/types';
import default_background from '@media/images/default_background.webp';

type Props = {
    user: User
}

const ProfileImage: FC<Props> = ({ user }: Props) => {

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    return (
        <section className={isLoading ? 'profileimage' : 'profileimage profileimage--loaded'}>
            <div className={isLoading ? 'profileimage__background' : 'profileimage__background profileimage__background--loaded'} 
                style={{ backgroundImage: `url(${!user?.background ? default_background : user?.background})` }} 
            />
            <ProfileDetails 
                user={user}
            />
        </section>
    );
}

export default ProfileImage;