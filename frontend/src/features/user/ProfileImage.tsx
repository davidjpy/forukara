import { FC, useState, useEffect, PropsWithChildren } from 'react';

import ProfileDetails from '@features/user/ProfileDetails';
import { User } from '@common/utilities/types';
import { baseUrl } from '@app/apiSlice';
import default_background from '@media/images/default_background.jpg';

type Props = {
    user: User
}

const ProfileImage: FC<PropsWithChildren<any>> = (props: Props) => {

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    return (
        <section className={isLoading ? 'profileimage' : 'profileimage profileimage--loaded'}>
            <div className={isLoading ? 'profileimage__background' : 'profileimage__background profileimage__background--loaded'} style={{ backgroundImage: `url(${!props.user?.background ? default_background : baseUrl + props.user?.background})` }} />
            <ProfileDetails 
                user={props.user}
            />
        </section>
    );
}

export default ProfileImage;