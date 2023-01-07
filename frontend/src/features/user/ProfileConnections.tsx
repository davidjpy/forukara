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
        <section className='profile-soc'>
            <div className='profile-soc__wrapper'>
                <header>
                    <h1>
                        Connections - <span>Results {user?.discussions?.length} </span>
                        <div className='profile-soc__divider'></div>
                    </h1>
                </header>
            </div>
            {!user?.connections?.length &&
                <div className='profile-soc__svg profile-soc__svg--end'>
                    <Connect width='67%' height='90%' style={{ margin: '2.6rem 1.6rem 3rem 0' }} />
                    <header className='profile-soc__svg-header profile-soc__svg-header--connections'>
                        <h1>Oh no!</h1>
                    </header>
                    <div className='profile-soc__txt profile-soc__txt--connections'>
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
                                <p>{user?.profile.username} does not appear to have made any connections yet.</p>
                            </>
                        )}
                    </div>
                </div>
            }
        </section>
    );
}


export default ProfileConnections;