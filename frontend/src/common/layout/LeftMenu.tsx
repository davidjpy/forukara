import { FC } from 'react';
import { AiOutlineHome, AiOutlineSetting } from 'react-icons/ai';
import { FiUser, FiHelpCircle } from 'react-icons/fi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { MdOutlineFeedback, MdOutlinePermContactCalendar } from 'react-icons/md';

import { useAppSelector } from '@app/hooks';
import default_background from '@media/images/default_background.webp';
import default_avatar from '@media/images/default_avatar.webp';

const contentList = [
    { tab: 'home', icon: <AiOutlineHome style={{ marginBottom: '2px' }} /> }
];

const accountList = [
    { tab: 'user', icon: <FiUser style={{ marginBottom: '2px' }} /> },
    { tab: 'notifications', icon: <IoMdNotificationsOutline style={{ marginBottom: '2px' }} /> },
    { tab: 'settings', icon: <AiOutlineSetting style={{ marginBottom: '2px' }} /> }
];

const supportList = [
    { tab: 'get Help', icon: <FiHelpCircle style={{ marginBottom: '2px' }} /> },
    { tab: 'submit Feedback', icon: <MdOutlineFeedback style={{ marginBottom: '2px' }} /> },
    { tab: 'contact', icon: <MdOutlinePermContactCalendar style={{ marginBottom: '2px' }} /> }
]

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
                    <figcaption>{user?.username}</figcaption>
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
                                    <li role='tab' aria-controls={item.tab}>{item.icon}{item.tab}</li>
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
                                    <li role='tab' aria-controls={item.tab}>{item.icon}{item.tab}</li>
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
                                    <li role='tab' aria-controls={item.tab}>{item.icon}{item.tab}</li>
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