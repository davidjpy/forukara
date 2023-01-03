import { FC } from 'react';
import { FaUserFriends } from 'react-icons/fa';

import { User } from '@common/utilities/types';
import { ReactComponent as Connect } from '@media/images/connect.svg';

type Props = {
    user: User;
    account: User;
}

const ProfileConnections: FC<Props> = ({ user, account }: Props) => {
    return (
        <section className='profilesocial'>
            {user?.discussions?.length ? (
                <div className='profilesocial__wrapper'>
                    <header>
                        <h1>
                            CONNECTIONS - <span>Results {user?.discussions?.length} </span>
                            <div className='profilesocial__divider'></div>
                        </h1>
                    </header>
                </div>
            ) : (
                <div className='profilesocial__svg profilesocial__svg--end'>
                    <Connect width='67%' height='90%' style={{ margin: '2.6rem 1.6rem 3rem 0' }} />
                    <header className='profilesocial__svg-header profilesocial__svg-header--connections'>
                        <h1>Oh no!</h1>
                    </header>
                    <div className='profilesocial__text profilesocial__text--connections'>
                        {user?.id === account.id ? (
                            <>
                                <p>You don't seem to have made any connections yet. To find people who share your interests, click the button below.</p>
                                <button style={{ margin: '1.4rem 0' }}>
                                    <FaUserFriends aria-hidden={true} size={18} style={{ marginRight: '8px', verticalAlign: 'top' }} />
                                    Ready to Meet New Friend
                                </button>
                            </>
                        ) : (
                            <>
                                <p>{user?.username} does not appear to have made any connections yet.</p>
                            </>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}


export default ProfileConnections;