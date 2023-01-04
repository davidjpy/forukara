import { FC } from 'react';
import { MdDeleteForever } from 'react-icons/md';

import { User } from '@common/utilities/types';
import { useInput } from '@common/hooks/useInput';

type Props = {
    account: User;
}

const EditAccount: FC<Props> = ({ account }: Props) => {

    const [name, nameOnChange, resetName] = useInput(account.username as string);
    const [pName, pNameOnChange, resetPName] = useInput(account.preferredName as string);
    const [location, locationOnChange, resetLocation] = useInput(account.location as string);
    const [occupation, occupationOnChange, resetOccupation] = useInput(account.occupation as string);
    const [email, emailOnChange, resetEmail] = useInput(account.email as string);
    const [gender, genderOnChange, resetGender] = useInput(account.gender as string);

    return (
        <form className='profileform'>
            <figure aria-label='profile image' className='profileform__wrapper'>
                <header style={{ marginRight: 'auto' }}>
                    <h1>
                        PICTURES
                    </h1>
                </header>
                <div className='profileform__avatar'>
                    <img src={account.avatar as string | undefined} alt='avatar' />
                    <button aria-label='delete profile image' title='Delete profile image' className='profileform__button'>
                        <MdDeleteForever aria-hidden={true} size={20} />
                    </button>
                </div>
                <div className='profileform__caption'>
                    <button className='profileform__button profileform__button--flat'>
                        Upload Image
                    </button>
                    <p>
                        Even though the uploaded avatar will be resized and scaled automatically, please keep the file size minimal.
                    </p>
                </div>
            </figure>
            <section className='profileform__wrapper'>
                <header>
                    <h1>
                        PERSONAL INFORMATION
                    </h1>
                </header>
                <div className='profileform__inputs'>
                    <label htmlFor='edit-name'>
                        Full Name
                        <input id='edit-name' placeholder='Enter your name...' type='text' />
                    </label>
                    <label htmlFor='edit-preferred-name'>
                        Preferred Name
                        <input id='edit-preferred-name' placeholder='Enter your preferred name...' type='text' />
                    </label>
                </div>
                <div className='profileform__inputs'>
                    <label>
                        Location
                        <input placeholder='Enter your living city...' type='text' />
                    </label>
                    <label>
                        Occupation
                        <input placeholder='Enter your occupation...' type='text' />
                    </label>
                </div>
                <div className='profileform__inputs'>
                    <label>
                        Email
                        <input placeholder='Enter your email...' type='text' />
                    </label>
                    <label>
                        Gender
                        <input placeholder='Enter your gender...' type='text' />
                    </label>
                </div>
            </section>
        </form>
    );
}

export default EditAccount;