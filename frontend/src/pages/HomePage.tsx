import { FC, useState, MutableRefObject, useRef } from 'react';
import { HiPencilAlt } from 'react-icons/hi';
import { AiFillCaretDown } from 'react-icons/ai';
import { useSearchParams } from 'react-router-dom';

import '@pages/HomePage.css';
import { useAppSelector } from '@app/hooks';
import default_avatar from '@media/images/default_avatar.webp';
import { useClickOutside } from '@common/hooks/useClickOutside';

const HomePage: FC = () => {

    const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useSearchParams({ search: 'public' });
    const user = useAppSelector((state) => state.auth.user);

    const dropDownMenuBtnRef = useRef<HTMLSpanElement>(null);
    const dropDownMenuRef = useClickOutside(() => setIsMenuOpened(false), dropDownMenuBtnRef);

    const changeSearch = (section: 'public' | 'connection'): void => {
        setSearchParams({ search: section }, { replace: true });
        setIsMenuOpened(false);
    }

    return (
        <div className='home'>
            <section className='home__topbar'>
                <figure>
                    <img src={user.profile.avatar ?? default_avatar} alt={user.profile.avatar ?? 'avatar'} />
                </figure>
                <div>
                    <HiPencilAlt aria-hidden={true} size={18} style={{ marginRight: '6px' }} />
                    <p>
                        What's on your mind ?
                    </p>
                </div>
            </section>
            <div className='home__divider'>
                <div>
                    <p>Current Section:
                        <span ref={dropDownMenuBtnRef} onClick={() => setIsMenuOpened(!isMenuOpened)}>
                            {searchParams.get('search')} <AiFillCaretDown aria-hidden={true} style={{ verticalAlign: 'bottom' }} />
                        </span>
                    </p>
                    <ul ref={dropDownMenuRef as MutableRefObject<HTMLUListElement | null>}
                        className={isMenuOpened
                            ? 'home__dp-menu home__dp-menu--active'
                            : 'home__dp-menu'
                        }
                    >
                        <li onClick={() => changeSearch('public')}
                            className={searchParams.get('search') === 'public'
                                ? 'home__dp-li home__dp-li--active' : 'home__dp-li'
                            }
                        >
                            Public
                        </li>
                        <li onClick={() => changeSearch('connection')}
                            className={searchParams.get('search') === 'connection'
                                ? 'home__dp-li home__dp-li--active'
                                : 'home__dp-li'
                            }
                        >
                            Connection
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default HomePage;