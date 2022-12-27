import { FC, useEffect } from 'react';
import { AiOutlineHome, AiOutlineSetting } from 'react-icons/ai';
import { FiUser, FiHelpCircle } from 'react-icons/fi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { MdOutlineFeedback, MdOutlinePermContactCalendar } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '@app/hooks';
import { toggleLoginForm } from '@features/auth/authSlice';
import { switchPage } from '@features/generic/genericSlice';
import default_background from '@media/images/default_background.webp';
import default_avatar from '@media/images/default_avatar.webp';
import { Pages } from '@common/utilities/types';

const contentList = [
    { tab: 'home', icon: <AiOutlineHome style={{ marginBottom: '2px' }} />, navigate: 'home' }
];

const accountList = [
    { tab: 'user', icon: <FiUser style={{ marginBottom: '2px' }} />, navigate: 'profile' },
    { tab: 'notifications', icon: <IoMdNotificationsOutline style={{ marginBottom: '2px' }} />, navigate: 'notifications' },
    { tab: 'settings', icon: <AiOutlineSetting style={{ marginBottom: '2px' }} />, navigate: 'settings' }
];

const supportList = [
    { tab: 'get help', icon: <FiHelpCircle style={{ marginBottom: '2px' }} />, navigate: 'help' },
    { tab: 'submit feedback', icon: <MdOutlineFeedback style={{ marginBottom: '2px' }} />, navigate: 'feedback' },
    { tab: 'contact', icon: <MdOutlinePermContactCalendar style={{ marginBottom: '2px' }} />, navigate: 'contact' }
];

const LeftMenu: FC = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const user = useAppSelector((state) => state.auth.user);
    const page = useAppSelector((state) => state.generic.page);

    const handleNavigatePage = (page: string, type: 'content' | 'account' | 'support'): void => {
        if (type === 'account' && !user.id) {
            handleToggleLoginForm(true);
        } else {
            if (page === 'profile') {
                navigate(`profile/${user.username}`);
            } else {
                navigate(`${page}`);
            }
        }
    }

    const handleToggleLoginForm = (state: boolean): void => {
        dispatch(toggleLoginForm(state));
    }

    useEffect(() => {
        const currPage = location.pathname.split('/')[1] as Pages;
        dispatch(switchPage(currPage));
    }, [location]);

    return (
        <section className='leftmenu'>
            <div className='leftmenu__wrapper'>
                <div role='img' aria-label='background image' title='background image'
                    className='leftmenu__background' style={{ backgroundImage: `url(${!user?.background ? default_background : user?.background})` }}
                />
                <figure>
                    <div>
                        <img alt='profile avatar' src={!user?.avatar ? default_avatar : user?.avatar} />
                    </div>
                    {user.id ? (
                        <figcaption>
                            {user?.username}
                        </figcaption>
                    ) : (
                        <figcaption>
                            <button onClick={() => handleToggleLoginForm(true)}>
                                Login
                            </button>
                        </figcaption>
                    )}
                </figure>
                <div className='leftmenu__tablist'>
                    <section>
                        <header style={{ marginTop: 0 }}>
                            <h1>Content</h1>
                        </header>
                        <div className='leftmenu__divider'></div>
                        <ul role='tablist'>
                            {contentList.map((item) => {
                                return (
                                    <li key={item.tab} role='tab' aria-controls={item.tab}
                                        onClick={() => handleNavigatePage(item.navigate, 'content')}
                                        className={page === item.navigate ? 'leftmenu__listitem leftmenu__listitem leftmenu__listitem--active' : 'leftmenu__listitem'}
                                    >
                                        {item.icon}{item.tab}
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                    <section>
                        <header>
                            <h1>Account</h1>
                        </header>
                        <div className='leftmenu__divider'></div>
                        <ul role='tablist'>
                            {accountList.map((item) => {
                                return (
                                    <li key={item.tab} role='tab' aria-controls={item.tab}
                                        onClick={() => handleNavigatePage(item.navigate, 'account')}
                                        className={page === item.navigate ? 'leftmenu__listitem leftmenu__listitem leftmenu__listitem--active' : 'leftmenu__listitem'}
                                    >
                                        {item.icon}{item.tab}
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                    <section>
                        <header>
                            <h1>Support</h1>
                        </header>
                        <div className='leftmenu__divider'></div>
                        <ul role='tablist'>
                            {supportList.map((item) => {
                                return (
                                    <li key={item.tab} role='tab' aria-controls={item.tab}
                                        onClick={() => handleNavigatePage(item.navigate, 'support')}
                                        className={page === item.navigate ? 'leftmenu__listitem leftmenu__listitem leftmenu__listitem--active' : 'leftmenu__listitem'}
                                    >
                                        {item.icon}{item.tab}
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                </div>
            </div>
        </section>
    );
}

export default LeftMenu;