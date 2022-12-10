import { FC } from 'react';

import { useAppSelector } from '@app/hooks';
import default_background from '@media/images/default_background.webp';
import default_avatar from '@media/images/default_avatar.webp';

const LeftMenu: FC = () => {

    const user = useAppSelector((state) => state.auth.user);

    return (
        <section className='leftmenu'>
            <div className='leftmenu__wrapper'>
                <div role='img' aria-label='background image' title='background image'
                    className='leftmenu__background' style={{ backgroundImage: `url(${!user?.background ? default_background : user?.background})` }} 
                />
                <figure>
                    <img alt='profile avatar' src={!user?.avatar ? default_avatar : user?.avatar} />
                </figure>
            </div>  
        </section>
    );
}

export default LeftMenu;