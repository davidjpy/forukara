import { FC, useEffect, useState, ChangeEvent } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { AiOutlineTwitter } from 'react-icons/ai';

import { User } from '@common/utilities/types';

type Props = {
    account: User;
}

const EditAccount: FC<Props> = ({ account }: Props) => {

    const [name, setName] = useState<string>('');
    const [pName, setPName] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [occupation, setOccupation] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [gender, setGender] = useState<string>('');

    useEffect(() => {
        if (account.username) {
            setName(account.username);
            setPName(account.preferredName || '');
            setLocation(account.location || '');
            setOccupation(account.occupation || '');
            setTitle(account.title || '');
            setGender(account.gender || '');
        }
    }, [account]);

    const onChange = (e: ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>): void => {
        setter(e.target.value);
    }

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
                    <label>
                        <p>Username <span>*</span></p>
                        <input value={name} onChange={(e) => onChange(e, setName)}
                            placeholder='Enter your name...' type='text'
                        />
                    </label>
                    <label>
                        Preferred Name
                        <input value={pName} onChange={(e) => onChange(e, setPName)}
                            placeholder='Enter your preferred name...' type='text'
                        />
                    </label>
                </div>
                <div className='profileform__inputs'>
                    <label>
                        <p>Title</p>
                        <input value={title} onChange={(e) => onChange(e, setTitle)}
                            placeholder='Enter your title...' type='text'
                        />
                    </label>
                    <label>
                        Gender
                        <input value={gender} onChange={(e) => onChange(e, setGender)}
                            placeholder='Enter your gender...' type='text'
                        />
                    </label>
                </div>
                <div className='profileform__inputs'>
                    <label>
                        Location
                        <input value={location} onChange={(e) => onChange(e, setLocation)}
                            placeholder='Enter your living city...' type='text'
                        />
                    </label>
                    <label>
                        Occupation
                        <input value={occupation} onChange={(e) => onChange(e, setOccupation)}
                            placeholder='Enter your occupation...' type='text'
                        />
                    </label>
                </div>
                <p className='profileform__reminder'><span>*</span> Indicates a required field</p>
            </section>
            <section className='profileform__wrapper'>
                <header>
                    <h1>
                        SOCIAL MEDIA
                    </h1>
                </header>
                <div className='profileform__inputs profileform__inputs--link'>
                    <label>
                        <p>Twitter</p>
                        <div style={{ position: 'relative' }}>
                            <input value={name} onChange={(e) => onChange(e, setName)}
                                placeholder='Enter your name...' type='text'
                            />
                            <div className='profileform__icon-wrapper' style={{ backgroundColor: '#00acee' }}>
                                <AiOutlineTwitter color='white' size={20} className='profileform__icon' />
                            </div>
                        </div>
                    </label>
                    <label>
                        <p>Twitter</p>
                        <div style={{ position: 'relative' }}>
                            <input value={name} onChange={(e) => onChange(e, setName)}
                                placeholder='Enter your name...' type='text'
                            />
                            <div className='profileform__icon-wrapper' style={{ backgroundColor: '#00acee' }}>
                                <AiOutlineTwitter color='white' size={20} className='profileform__icon' />
                            </div>
                        </div>
                    </label>
                </div>
                <div className='profileform__button-group'>
                    <button className='profileform__button profileform__button--gray'>Cancel</button>
                    <button className='profileform__button profileform__button--green'>Save</button>
                </div>
            </section>
        </form>
    );
}

export default EditAccount;