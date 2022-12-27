import { FC } from 'react';
import { MdSpeakerNotes } from 'react-icons/md';
import { BsFillFileEarmarkPersonFill } from 'react-icons/bs';
import { FaTools } from 'react-icons/fa';

import { User } from '@common/utilities/types';

type Props = {
    user: User
}

const ProfileBio: FC<Props> = ({ user }: Props) => {
    return (
        <div className='profilebio'>
            <section className='profilebio__wrapper'>
                <header>
                    <BsFillFileEarmarkPersonFill size={26} />
                </header>
                <div className='profilebio__content'>
                    <h1>
                        ABOUT ME
                        <div className='profilebio__divider'></div>
                    </h1>
                    {user?.about ? (
                        <p>{user?.about}</p>
                    ) : (
                        <p style={{ color: 'gray' }}>Write something about yourself...</p>
                    )}
                </div>
            </section>
            <section className='profilebio__wrapper'>
                <header>
                    <MdSpeakerNotes size={26} />
                </header>
                <div className='profilebio__content'>
                    <h1>
                        INTERESTED TOPICS
                        <div className='profilebio__divider'></div>
                    </h1>
                    {user?.about ? (
                        <p>{user?.about}</p>
                    ) : (
                        <p style={{ color: 'gray' }}>Introduce topics that you interested in...</p>
                    )}
                </div>
            </section>
            <section className='profilebio__wrapper'>
                <header>
                    <FaTools size={23} />
                </header>
                <div className='profilebio__content'>
                    <h1>
                        SKILLS
                        <div className='profilebio__divider'></div>
                    </h1>
                    {user?.about ? (
                        <p>{user?.about}</p>
                    ) : (
                        <p style={{ color: 'gray' }}>List down skills that you equipped with...</p>
                    )}
                </div>
            </section>
        </div>
    );
}

export default ProfileBio;