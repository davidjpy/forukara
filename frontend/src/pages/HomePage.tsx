import { FC, useState } from 'react';
import { HiPencilAlt } from 'react-icons/hi';
import { AiFillCaretDown } from 'react-icons/ai';

import '@pages/HomePage.css';
import { useAppSelector } from '@app/hooks';
import default_avatar from '@media/images/default_avatar.webp';

const HomePage: FC = () => {

    const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
    const user = useAppSelector((state) => state.auth.user);

    return (
        <div className='home'>
            <section className='home__topbar'>
                <figure>
                    <img src={user.profile.avatar ?? default_avatar} alt={user.profile.avatar ?? 'avatar'} />
                </figure>
                <div>
                    <HiPencilAlt aria-hidden={true} size={18} style={{ marginRight: '6px' }} />
                    <p>
                        What's on your mind ? {String(isMenuOpened)}
                    </p>
                </div>
            </section>
            <div className='home__divider'>
                <div onMouseEnter={() => setIsMenuOpened(true)} onMouseLeave={() => setIsMenuOpened(false)}>
                    <p> Selected By: <span>Public Article <AiFillCaretDown aria-hidden={true} style={{ verticalAlign: 'bottom' }} /></span></p>
                    {isMenuOpened &&
                        <ul className='home__dp-menu'>
                            <li>Public Article</li>
                            <li>Connection Only</li>
                        </ul>
                    }
                </div>
            </div>
        </div>
    );
}

export default HomePage;