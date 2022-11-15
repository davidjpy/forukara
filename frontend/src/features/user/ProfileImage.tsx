import { FC, useState, useEffect } from 'react';

import nav_background from '@media/images/nav_background.webp';
import coast from '@media/images/coast.jpg';


const ProfileImage: FC = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(false);
    });

    return (
        <section className='profileimage'>
            <div className={isLoading ? 'profileimage__background' : 'profileimage__background profileimage__background--loaded'} style={{ backgroundImage: `url(${coast})` }} />
            <figure className={isLoading ? 'profileimage__icon-wrapper' : 'profileimage__icon-wrapper profileimage__icon-wrapper--loaded'} >
                <img src={nav_background} alt='profile' className={isLoading ? 'profileimage__icon' : 'profileimage__icon profileimage__icon--loaded'} />
            </figure>
            <header className='profileimage__username'>
                <h1>Ho Chi Hang</h1>
            </header>
        </section>
    );
}

export default ProfileImage;