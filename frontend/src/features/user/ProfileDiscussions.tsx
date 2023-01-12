import { FC } from 'react';
import { FaPen } from 'react-icons/fa';

import { User } from '@common/utilities/types';
import { ReactComponent as Publish } from '@media/images/publish.svg';

type Props = {
    user: User;
    account: User;
};

const ProfileDiscussions: FC<Props> = ({ user, account }: Props) => {
    return (
        <section className='profile-soc'>
            <div className='profile-soc__wrapper'>
                <header>
                    <h1>
                        Discussions - <span>Results {user?.discussions?.length} </span>
                        <div className='profile-soc__divider'></div>
                    </h1>
                </header>
            </div>
            {!user?.discussions?.length &&
                <div className='profile-soc__svg'>
                    <Publish width='50%' height='90%' style={{ margin: '3rem 4rem' }} />
                    <header className='profile-soc__svg-header profile-soc__svg-header--discussions'>
                        <h1>Oops!</h1>
                    </header>
                    <div className='profile-soc__txt profile-soc__txt--discussions'>
                        {user?.id === account.id ? (
                            <>
                                <p>You don't appear to have started any discussions yet. Click the button below to start your first discussion.</p>
                                <button>
                                    <FaPen aria-hidden={true} size={14} style={{ marginRight: '8px' }} />
                                    Start New Discussions
                                </button>
                            </>
                        ) : (
                            <p>{user?.profile.username} does not appear to have started any discussions yet.</p>
                        )}
                    </div>
                </div>
            }
        </section>
    );
}

export default ProfileDiscussions;