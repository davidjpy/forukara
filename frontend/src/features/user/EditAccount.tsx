import { FC, useEffect, useState, useRef, ChangeEvent } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { AiOutlineTwitter, AiFillFacebook, AiOutlineInstagram } from 'react-icons/ai';
import { FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { ImUpload } from 'react-icons/im';
import Select, { StylesConfig } from 'react-select';
import CreatableSelect from 'react-select/creatable';

import { User, ProfileSocialMedia } from '@common/utilities/types';
import default_background from '@media/images/default_background.webp';
import default_avatar from '@media/images/default_avatar.webp';
import { useEditAccountMutation } from './userApiSlice';
import { useNavigate } from 'react-router-dom';
import { GENDER, HONORIFICS } from '@common/utilities/constants';

type Props = {
    account: User;
};

type Image = {
    name: string;
    url: string;
};

type SelectOption = {
    value: string;
    label: string;
};

const selectStyles: StylesConfig = {
    control: (styles) => ({
        ...styles,
        backgroundColor: 'white',
        marginTop: '0.4rem',
        height: '38px',
        ':hover': {
            borderColor: '#2684FF'
        }
    }),
    valueContainer: (styles) => ({
        ...styles,
        padding: '0 4px',
        height: '36px',
    }),
    input: (styles) => ({
        ...styles,
        padding: 0,
        margin: 0,
        height: '36px',
        color: 'black'
    }),
    option: (styles) => ({
        ...styles,
        ':hover': {
            cursor: 'pointer'
        }
    }),
    clearIndicator: (styles) => ({
        ...styles,
        padding: '0.1rem',
        marginRight: '0.3rem',
        ':hover': {
            cursor: 'pointer',
            backgroundColor: 'rgb(230, 230, 230)',
            color: 'black',
            borderRadius: '6px'
        }
    }),
    dropdownIndicator: (styles) => ({
        ...styles,
        padding: '0.1rem',
        margin: '0.3rem',
        ':hover': {
            cursor: 'pointer',
            backgroundColor: 'rgb(230, 230, 230)',
            color: 'black',
            borderRadius: '6px'
        }
    })
};

const EditAccount: FC<Props> = ({ account }: Props) => {

    const avatarRef = useRef<HTMLInputElement>(null);
    const bgRef = useRef<HTMLInputElement>(null);
    const [editInfo, editInfoResult] = useEditAccountMutation();
    const navigate = useNavigate();

    // Input states
    const [name, setName] = useState<string>('');
    const [pName, setPName] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [occupation, setOccupation] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [avatar, setAvatar] = useState<Image>({
        name: '',
        url: ''
    });
    const [bg, setBg] = useState<Image>({
        name: '',
        url: ''
    });
    const [twitter, setTwitter] = useState<string>('');
    const [linkedin, setLinkedin] = useState<string>('');
    const [facebook, setFacebook] = useState<string>('');
    const [instagram, setInstagram] = useState<string>('');
    const [youtube, setYoutube] = useState<string>('');

    useEffect(() => {
        if (account.profile.username) {
            const { profile } = account;

            setName(profile.username as string);
            setPName(profile.preferredName || '');
            setLocation(profile.location || '');
            setOccupation(profile.occupation || '');
            setTitle(profile.title || '');
            setGender(profile.gender || '');
            setTwitter(profile.socialMedia.twitter || '');
            setLinkedin(profile.socialMedia.linkedin || '');
            setFacebook(profile.socialMedia.facebook || '');
            setInstagram(profile.socialMedia.instagram || '');
            setYoutube(profile.socialMedia.youtube || '');

            if (profile.avatar) {
                setAvatar({ name: profile.avatar, url: profile.avatar });
            }

            if (profile.background) {
                setBg({ name: profile.background, url: profile.background });
            }
        }
        console.log(account)
    }, [account]);

    const handleNavigate = (url: string): void => {
        navigate(url);
    }

    const onChange = (e: ChangeEvent<HTMLInputElement> | SelectOption, setter: React.Dispatch<React.SetStateAction<string>>): void => {
        if (e === null) {
            setter('');
        }
        else if ('value' in e) {
            setter(e.value);
        }
        else {
            setter(e.target.value);
        }
    }

    const setFile = (ref: React.RefObject<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<Image>>): void => {
        if (ref.current && ref.current.files?.length) {
            const name = ref.current.files[0].name
            const img = URL.createObjectURL(ref.current.files[0]);
            setter({ name: name, url: img });
        }
    }

    const deleteFile = (e: React.MouseEvent<HTMLElement>, setter: React.Dispatch<React.SetStateAction<Image>>): void => {
        e.preventDefault();
        setter({ name: '', url: '' });
    }

    const submitForm = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        let formData = new FormData();

        const socialMedia: ProfileSocialMedia = {
            twitter: twitter,
            linkedin: linkedin,
            facebook: facebook,
            instagram: instagram,
            youtube: youtube
        };

        formData.append('username', name);
        formData.append('preferredName', pName);
        formData.append('location', location);
        formData.append('title', title);
        formData.append('gender', gender);
        formData.append('occupation', occupation);
        formData.append('socialMedia', JSON.stringify(socialMedia));

        // If user upload a new picture, attach the avatar as file
        // Else attach the avatar as string url
        if (avatarRef.current && avatarRef.current.files?.length && avatar.name) {
            formData.append('avatarFile', avatarRef.current.files[0]);
        } else if (avatar.url) {
            formData.append('avatar', avatar.url)
        }

        if (bgRef.current && bgRef.current.files?.length && bg.name) {
            formData.append('backgroundFile', bgRef.current.files[0]);
        } else if (bg.url) {
            formData.append('background', bg.url)
        }

        await editInfo({
            id: account.id as string,
            data: formData
        });

        handleNavigate(`/profile/${account.profile.username}`);
    }

    return (
        <form onSubmit={submitForm} className='edt-profile-form'>
            <figure aria-label='profile image' className='edt-profile-form__wrapper'>
                <section>
                    <header style={{ marginRight: 'auto' }}>
                        <h1>
                            AVATAR
                        </h1>
                    </header>
                    <div className='edt-profile-form__avatar'>
                        <img src={avatar.url || default_avatar} alt='avatar' />
                        <button onClick={(e) => deleteFile(e, setAvatar)} aria-label='delete profile avatar' title='Delete profile avatar' className='edt-profile-form__btn'>
                            <MdDeleteForever aria-hidden={true} size={20} />
                        </button>
                    </div>
                    {avatar.name && <a href={avatar.url} target='_blank' rel='noreferrer'>{avatar.name.length > 40 ? avatar.name.slice(0, 40) + '...' : avatar.name}</a>}
                    <input type='file' id='upload-avatar-img' accept='image/png, image/gif, image/jpeg' ref={avatarRef} name='avatarFile' onChange={() => setFile(avatarRef, setAvatar)} className='edt-profile-form__upload' />
                    <label htmlFor='upload-avatar-img'><ImUpload aria-hidden={true} style={{ marginRight: '6px' }} />Upload Avatar</label>
                </section>
                <section style={{ marginBottom: '0' }}>
                    <header style={{ marginRight: 'auto' }}>
                        <h1>
                            BACKGROUND PICTURE
                        </h1>
                    </header>
                    <div className='edt-profile-form__bg' style={{ backgroundImage: `url(${!bg.url ? default_background : bg.url})` }}>
                        <button onClick={(e) => deleteFile(e, setBg)} aria-label='delete profile background image' title='Delete profile background image' className='edt-profile-form__btn'
                            style={{ right: '5px', top: '5px', backgroundColor: 'var(--black-opacity-light)' }}
                        >
                            <MdDeleteForever aria-hidden={true} color='rgb(200, 200, 200)' size={20} />
                        </button>
                    </div>
                    <div className='edt-profile-form__caption'>
                        {bg.name && <a href={bg.url} target='_blank' rel='noreferrer'>{bg.name.length > 40 ? bg.name.slice(0, 40) + '...' : bg.name}</a>}
                        <input type='file' id='upload-bg-img' accept='image/png, image/gif, image/jpeg' ref={bgRef} name='backgroundFile' onChange={() => setFile(bgRef, setBg)} className='edt-profile-form__upload edt-profile-form__upload--long' />
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
                            placeholder='Enter your name...' type='text' required
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
                <div className='edt-profile-form__inputs'>
                    <label>
                        <p>Title</p>
                        <Select
                            styles={selectStyles}
                            options={HONORIFICS}
                            value={{ label: title, value: title }}
                            onChange={(e) => onChange(e as SelectOption, setTitle)}
                            isClearable={true}
                            placeholder='Select your title...'
                            menuShouldScrollIntoView={false}
                        />
                    </label>
                    <label>
                        Gender
                        <CreatableSelect
                            styles={selectStyles}
                            options={GENDER}
                            value={{ label: gender, value: gender }}
                            onChange={(e) => onChange(e as SelectOption, setGender)}
                            isClearable={true}
                            placeholder='Select or create your gender...'
                            menuShouldScrollIntoView={false}
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
                                placeholder='Enter your Twitter profile...' type='url'
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
                                placeholder='Enter your Linkedin profile...' type='url'
                            />
                            <div className='edt-profile-form__icon-wrapper' style={{ backgroundColor: '#0A66C2' }}>
                                <FaLinkedinIn aria-hidden={true} color='white' size={20} className='edt-profile-form__icon' />
                            </div>
                        </div>
                    </label>
                    <label>
                        <p>Youtube Channel</p>
                        <div style={{ position: 'relative' }}>
                            <input value={youtube} onChange={(e) => onChange(e, setYoutube)}
                                placeholder='Enter your Facebook profile...' type='url'
                            />
                            <div className='edt-profile-form__icon-wrapper' style={{ backgroundColor: '#FF0000' }}>
                                <FaYoutube aria-hidden={true} color='white' size={24} className='edt-profile-form__icon' />
                            </div>
                        </div>
                    </label>
                    <label>
                        <p>Facebook Profile</p>
                        <div style={{ position: 'relative' }}>
                            <input value={facebook} onChange={(e) => onChange(e, setFacebook)}
                                placeholder='Enter your Facebook profile...' type='url'
                            />
                            <div className='edt-profile-form__icon-wrapper' style={{ backgroundColor: '#3b5998' }}>
                                <AiFillFacebook aria-hidden={true} color='white' size={26} className='edt-profile-form__icon' />
                            </div>
                        </div>
                    </label>
                    <label>
                        <p>Instagram Profile</p>
                        <div style={{ position: 'relative' }}>
                            <input value={instagram} onChange={(e) => onChange(e, setInstagram)}
                                placeholder='Enter your Facebook profile...' type='url'
                            />
                            <div className='edt-profile-form__icon-wrapper edt-profile-form__icon-wrapper--ig' style={{ backgroundColor: '#3b5998' }}>
                                <AiOutlineInstagram aria-hidden={true} color='white' size={28} className='edt-profile-form__icon' />
                            </div>
                        </div>
                    </label>
                </div>
                <div className='edt-profile-form__btn-grp' style={{ marginTop: '3rem', marginLeft: 'auto' }}>
                    <button onClick={() => handleNavigate(`/profile/${account.profile.username}`)} className='edt-profile-form__btn edt-profile-form__btn--gray'>Cancel</button>
                    <input className='edt-profile-form__btn edt-profile-form__btn--green' type='submit' value='Save' />
                </div>
            </section>
        </form>
    );
}

export default EditAccount;