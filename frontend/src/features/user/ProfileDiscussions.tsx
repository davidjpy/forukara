import { FC } from 'react';

import { User } from '@common/utilities/types';
// import { ReactComponent as Svg } from '../../media/images/s.svg';

type Props = {
    user: User;
};

const ProfileDiscussions: FC<Props> = ({ user }: Props) => {

    console.log(user)

    return (
        <section className='profilediscussions'>
            <header>
                <h1>Discussions</h1>
                <p>{user.discussions?.length} Results</p>
            </header>
            {user.discussions?.length ? (
                <div></div>
            ) : (
                <div></div>
            )}
        </section>
    );
}

export default ProfileDiscussions;