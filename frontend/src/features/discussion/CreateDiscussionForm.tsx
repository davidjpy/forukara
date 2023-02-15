import { FC, useState } from 'react';

import { User } from '@common/utilities/types';
import defaultAvatar from '@media/images/default_avatar.webp';

type Props = {
    account: User
}

const CreateDiscussionForm: FC<Props> = ({ account }: Props) => {

    const [isDropMenuOpened, setIsDropMenuOpened] = useState<boolean>(false);
    const [section, setSection] = useState<'public' | 'connection'>('public');

    return (
        <form className='create-dis-form'>
            <header style={{ marginRight: 'auto' }}>
                <h1>
                    CONTENT
                </h1>
            </header>
            <div className='create-dis-form__title'>
                <div onClick={() => setIsDropMenuOpened(true)}
                    className='create-dis-form__dp-menu'
                >
                    <p></p>
                </div>
                {/* <label>
                    Title
                    <input placeholder='Enter a title to summarize the discussion' />
                </label> */}
            </div>
        </form>
    );
}

export default CreateDiscussionForm;    