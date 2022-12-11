import { FC } from 'react';
import { AiOutlineHome, AiOutlineSetting } from 'react-icons/ai';
import { FiUser, FiHelpCircle } from 'react-icons/fi';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { MdOutlineFeedback, MdOutlinePermContactCalendar } from 'react-icons/md';

import { useAppSelector } from '@app/hooks';
import default_background from '@media/images/default_background.webp';
import default_avatar from '@media/images/default_avatar.webp';
import List from '@common/generic/List';

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
                        <List
                            item={[
                                { tab: 'home', icon: <AiOutlineHome /> }
                            ]}
                            render={(item: { tab: string; icon: JSX.Element; }) => <>{item.icon}{item.tab}</>}
                            keyExtractor={({ tab }) => tab}
                            listRole='tablist'
                            listItemRole='tab'
                        />
                    </section>
                    <section>
                        <header>
                            <h1>Account</h1>
                        </header>
                        <div className='leftmenu__divider'></div>
                        <List
                            item={[
                                { tab: 'user', icon: <FiUser /> },
                                { tab: 'notifications', icon: <IoIosNotificationsOutline />},
                                { tab: 'settings', icon: <AiOutlineSetting />}
                            ]}
                            render={(item: { tab: string; icon: JSX.Element; }) => <>{item.icon}{item.tab}</>}
                            keyExtractor={({ tab }) => tab}
                            listRole='tablist'
                            listItemRole='tab'
                        />
                    </section>
                    <section>
                        <header>
                            <h1>Support</h1>
                        </header>
                        <div className='leftmenu__divider'></div>
                        <List
                            item={[
                                { tab: 'get Help', icon: <FiHelpCircle /> },
                                { tab: 'submit Feedback', icon: <MdOutlineFeedback /> },
                                { tab: 'contact', icon: <MdOutlinePermContactCalendar /> }
                            ]}
                            render={(item: { tab: string; icon: JSX.Element; }) => <>{item.icon}{item.tab}</>}
                            keyExtractor={({ tab }) => tab}
                            listRole='tablist'
                            listItemRole='tab'
                        />
                    </section>
                </div>
            </div>
        </section>
    );
}

export default LeftMenu;