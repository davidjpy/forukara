import { FC } from 'react';

import { User } from '@common/utilities/types';

type Props = {
    user: User
}

const ProfileBio: FC<Props> = ({ user }: Props) => {
    return (
        <div className='profile-bio'>
            <section className='profile-bio__wrapper'>
                <header>
                    <h1>About Me</h1>
                </header>
                {user?.profile.biography.summary && <p className='profile-bio__header'>{user?.profile.biography.summary}</p>}
                <div>
                    {user?.profile.biography.about
                        ? (
                            <>
                                <p className='profile-bio__pg'>{user?.profile.biography.about}</p>
                            </>
                        ) : (
                            <p style={{ color: 'gray', marginTop: '1rem' }}>Write something about yourself...</p>
                        )
                    }
                    {!user?.profile.biography.hashtag?.length ||
                        <div className='profile-bio__tags' style={{ marginTop: '2rem' }}>
                            {user.profile.biography.hashtag.map((item) =>
                                <div key={item}>
                                    #{item}
                                </div>
                            )}
                        </div>
                    }
                    <p className='profile-bio__ed' >
                        — {user?.profile.title} {
                            user?.profile.preferredName
                                ? `${user?.profile.username}, ${user?.profile.preferredName}`
                                : user?.profile.username
                        }
                    </p>
                </div>
            </section>
            <section className='profile-bio__wrapper'>
                <header>
                    <h1>Interested Topics</h1>
                </header>
                <div>
                    {user?.profile.biography.topics?.length ? (
                        <div className='profile-bio__tags'>
                            {user.profile.biography.topics.map((item) =>
                                <div key={item}>
                                    {item}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className='profile-bio__tags'>
                            <p>Add topics that interest you...</p>
                        </div>
                    )}
                </div>
            </section>
            <section className='profile-bio__wrapper'>
                <header>
                    <h1>Skills</h1>
                </header>
                <div>
                    {user?.profile.biography.skills?.length ? (
                        <div className='profile-bio__tags'>
                            {user.profile.biography.skills.map((item) =>
                                <div key={item}>
                                    {item}
                                </div>
                            )}
                        </div>

                    ) : (
                        <div className='profile-bio__tags'>
                            <p>Add skills that you have acquired...</p>
                        </div>
                    )}
                </div>
            </section>
            <section className='profile-bio__wrapper'>
                <header>
                    <h1>Languages</h1>
                </header>
                <div>
                    {user?.profile.biography.languages?.length ? (
                        <div className='profile-bio__tags'>
                            {user.profile.biography.languages.map((item) =>
                                <div key={item}>
                                    {item}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className='profile-bio__tags'>
                            <p>Add languages you are familiar with...</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default ProfileBio;