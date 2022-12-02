import { FC, useState, useEffect, PropsWithChildren } from 'react';

import ProfileDetails from '@features/user/ProfileDetails';
import { User } from '@common/utilities/types';
import default_background from '@media/images/default_background.webp';

type Props = {
    user: User
}

const ProfileImage: FC<PropsWithChildren<any>> = (props: Props) => {

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    return (
        <section className='profileimage'>
            <div className={isLoading ? 'profileimage__background' : 'profileimage__background profileimage__background--loaded'} 
                style={{ backgroundImage: `url(${!props.user?.background ? default_background : props.user?.background})` }} 
            />
            <ProfileDetails 
                user={props.user}
            />
        </section>
    );
}

export default ProfileImage;