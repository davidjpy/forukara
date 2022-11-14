import { FC } from 'react';

import nav_background from '@media/images/nav_background.webp';


const ProfileImage: FC = () => {
    return (
        <section className='profileimage'>
            <div className='profileimage__background'  style={{ backgroundImage: `url(${nav_background})` }} />
            <header>
                <h1>Ho Chi Hang</h1>
            </header>
            <figure className='profileimage__icon-wrapper'>
                <img src={nav_background} alt='profile-image' className='profileimage__icon' />
            </figure>
        </section>
    );
}

export default ProfileImage;