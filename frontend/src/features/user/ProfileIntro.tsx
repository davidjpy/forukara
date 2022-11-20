import { FC } from 'react';
import { AiFillProfile } from 'react-icons/ai';

const ProfileIntro: FC = () => {
    return (
        <section className='profileintro'>
            <header>
                <AiFillProfile className='profileintro__icon' />
            </header>
            <div className='profileintro-wrapper'>
                <h1>
                    ABOUT ME
                    <div className='profileintro__divider'></div>
                </h1>
                <p>
                    An interview self-introduction is the first impression you make on a recruiter. It's the first question most recruiters ask and sets the tone for your entire interview. Thus, it's important to establish a healthy rapport from the start.
                </p>
            </div>
        </section>
    );
}

export default ProfileIntro;