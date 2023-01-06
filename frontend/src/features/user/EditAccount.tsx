import { FC, useEffect, useState, ChangeEvent } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { AiOutlineTwitter, AiFillFacebook } from 'react-icons/ai';
import { FaLinkedinIn } from 'react-icons/fa';
import { ImUpload } from 'react-icons/im';

import { User } from '@common/utilities/types';
import default_background from '@media/images/default_background.webp';

type Props = {
    account: User;
}

const EditAccount: FC<Props> = ({ account }: Props) => {

    // Input states
    const [name, setName] = useState<string>('');
    const [pName, setPName] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [occupation, setOccupation] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [twitter, setTwitter] = useState<string>('');
    const [linkedin, setLinkedin] = useState<string>('');
    const [facebook, setFacebook] = useState<string>('');

    // Util states
    const [hideAvatar, setHideAvatar] = useState<boolean>(false);

    useEffect(() => {
        if (account.username) {
            setName(account.username);
            setPName(account.preferredName || '');
            setLocation(account.location || '');
            setOccupation(account.occupation || '');
            setTitle(account.title || '');
            setGender(account.gender || '');
            setTwitter(account.twitter || '');
            setLinkedin(account.linkedin || '');
            setFacebook(account.facebook || '');
        }
    }, [account]);

    const onChange = (e: ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>): void => {
        setter(e.target.value);
    }

    return (
        <form className='edt-profile-form'>
            <figure aria-label='profile image' className='edt-profile-form__wrapper'>
                <section>
                    <header style={{ marginRight: 'auto' }}>
                        <h1>
                            AVATAR
                        </h1>
                    </header>
                    <div className='edt-profile-form__avatar'>
                        <img src={account.avatar as string | undefined} alt='avatar' />
                        <button aria-label='delete profile avatar' title='Delete profile avatar' className='edt-profile-form__btn'>
                            <MdDeleteForever aria-hidden={true} size={20} />
                        </button>
                    </div>
                    <input type='file' id='upload-bg-img' className='edt-profile-form__upload' />
                    <label htmlFor='upload-bg-img'><ImUpload aria-hidden={true} style={{ marginRight: '6px' }} />Upload Avatar</label>
                </section>
                <section style={{ marginBottom: '0' }}>
                    <header style={{ marginRight: 'auto' }}>
                        <h1>
                            BACKGROUND PICTURE
                        </h1>
                    </header>
                    <div className='edt-profile-form__bg' style={{ backgroundImage: `url(${!account.background ? default_background : account.background})` }}>
                        <button aria-label='delete profile background image' title='Delete profile background image' className='edt-profile-form__btn'
                            style={{ right: '5px', top: '5px', backgroundColor: 'var(--black-opacity-light)' }}
                        >
                            <MdDeleteForever aria-hidden={true} color='rgb(200, 200, 200)' size={20} />
                        </button>
                    </div>
                    <div className='edt-profile-form__caption'>
                        <input type='file' id='upload-bg-img' className='edt-profile-form__upload edt-profile-form__upload--long' />
                        <label htmlFor='upload-bg-img'><ImUpload aria-hidden={true} style={{ marginRight: '6px' }} />Upload Background</label>
                        <p>
                            Even though the uploaded images will be resized and scaled automatically, please do keep the file size minimal.
                        </p>
                    </div>
                </section>
            </figure>
            <section className='edt-profile-form__wrapper'>
                <header>
                    <h1>
                        PERSONAL INFORMATION
                    </h1>
                </header>
                <div className='edt-profile-form__inputs'>
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
                <div className='edt-profile-form__inputs'>
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
                <div className='edt-profile-form__inputs'>
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
                <p className='edt-profile-form__reminder'><span>*</span> Indicates a required field</p>
            </section>
            <section className='edt-profile-form__wrapper'>
                <header>
                    <h1>
                        SOCIAL MEDIA
                    </h1>
                </header>
                <div className='edt-profile-form__inputs edt-profile-form__inputs--link'>
                    <label>
                        <p>Twitter Profile</p>
                        <div style={{ position: 'relative' }}>
                            <input value={twitter} onChange={(e) => onChange(e, setTwitter)}
                                placeholder='Enter your Twitter profile...' type='text'
                            />
                            <div className='edt-profile-form__icon-wrapper' style={{ backgroundColor: '#00acee' }}>
                                <AiOutlineTwitter aria-hidden={true} color='white' size={20} className='edt-profile-form__icon' />
                            </div>
                        </div>
                    </label>
                    <label>
                        <p>Linkedin Profile</p>
                        <div style={{ position: 'relative' }}>
                            <input value={linkedin} onChange={(e) => onChange(e, setLinkedin)}
                                placeholder='Enter your Linkedin profile...' type='text'
                            />
                            <div className='edt-profile-form__icon-wrapper' style={{ backgroundColor: '#0A66C2' }}>
                                <FaLinkedinIn aria-hidden={true} color='white' size={20} className='edt-profile-form__icon' />
                            </div>
                        </div>
                    </label>
                    <label>
                        <p>Facebook Profile</p>
                        <div style={{ position: 'relative' }}>
                            <input value={facebook} onChange={(e) => onChange(e, setFacebook)}
                                placeholder='Enter your Facebook profile...' type='text'
                            />
                            <div className='edt-profile-form__icon-wrapper' style={{ backgroundColor: '#3b5998' }}>
                                <AiFillFacebook aria-hidden={true} color='white' size={26} className='edt-profile-form__icon' />
                            </div>
                        </div>
                    </label>
                </div>
                <div className='edt-profile-form__btn-grp' style={{ paddingTop: '2rem', marginLeft: 'auto' }}>
                    <button className='edt-profile-form__btn edt-profile-form__btn--gray'>Cancel</button>
                    <button className='edt-profile-form__btn edt-profile-form__btn--green'>Save</button>
                </div>
            </section>
        </form>
    );
}

export default EditAccount;