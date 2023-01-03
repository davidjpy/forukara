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
        <section className='profilesocial'>
            {user?.discussions?.length ? (
                <div className='profilesocial__wrapper'>
                    <header>
                        <h1>
                            DISCUSSIONS - <span>Results {user?.discussions?.length} </span>
                            <div className='profilesocial__divider'></div>
                        </h1>
                    </header>
                </div>
            ) : (
                <div className='profilesocial__svg'>
                    <Publish width='50%' height='90%' style={{ margin: '3rem 4rem' }} />
                    <header className='profilesocial__svg-header profilesocial__svg-header--discussions'>
                        <h1>Oops!</h1>
                    </header>
                    <div className='profilesocial__text profilesocial__text--discussions'>
                        {user?.id === account.id ? (
                            <>
                                <p>You don't appear to have started any discussions yet. Click the button below to start your first discussion.</p>
                                <button>
                                    <FaPen aria-hidden={true} size={14} style={{ marginRight: '8px' }} />
                                    Start New Discussions
                                </button>
                            </>
                        ) : (
                            <p>{user?.username} does not appear to have started any discussions yet.</p>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}

export default ProfileDiscussions;