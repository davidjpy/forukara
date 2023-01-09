import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MultiValue, StylesConfig } from 'react-select';
import CreatableSelect from 'react-select/creatable';

import { useEditBioMutation } from './userApiSlice';
import { User } from '@common/utilities/types';
import { HASHTAG, LANGUAGES } from '@common/utilities/constants';


type Props = {
    account: User;
}

type SelectOption = {
    value: string;
    label: string;
}

const selectStyles: StylesConfig = {
    control: (styles) => ({
        ...styles,
        backgroundColor: 'white',
        marginTop: '0.4rem',
        padding: '0.2rem 0'
    }),
    multiValue: (styles) => ({
        ...styles,
        background: '#F5F5F5',
        padding: '0.2rem',
        margin: '0.2rem'
    }),
    multiValueRemove: (styles) => ({
        ...styles,
        ':hover': {
            backgroundColor: '#13515E',
            color: 'white'
        }
    })
}

const EditBio: FC<Props> = ({ account }: Props) => {

    const navigate = useNavigate();
    const [editBio, editBioResult] = useEditBioMutation();
    const [lang, setLang] = useState<Array<SelectOption>>([]);
    const [tag, setTag] = useState<Array<SelectOption>>([]);
    const [about, setAbout] = useState('');

    const handleNavigate = (url: string): void => {
        navigate(url);
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setter: React.Dispatch<React.SetStateAction<string>>): void => {
        setter(e.target.value);
    }

    const onSelectChange = (e: MultiValue<unknown>, setter: React.Dispatch<React.SetStateAction<SelectOption[]>>): void => {
        setter(e as unknown as Array<SelectOption>);
    }

    const submitForm = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        let formData = new FormData();

        formData.append('about', about);

        await editBio({
            id: account.id as string,
            data: {
                about: about
            }
        });

        navigate(`/profile/${account.profile.username}`);
    }

    useEffect(() => {
        if (account.profile.username) {
            setAbout(account.profile.biography.about || '');
        }
    }, [account]);


    useEffect(() => {
        console.log(lang)
    }, [lang])

    return (
        <form onSubmit={submitForm} className='edt-profile-form'>
            <section className='edt-profile-form__wrapper'>
                <header>
                    <h1>INTRODUCTION</h1>
                </header>
                <div className='edt-profile-form__inputs'>
                    <label style={{ width: '100%' }}>
                        About Me
                        <textarea value={about} onChange={(e) => onChange(e, setAbout)} placeholder='Introduce yourself here...' />
                    </label>
                </div>
                <div className='edt-profile-form__st' style={{ marginTop: '1rem' }}>
                    <label>
                        Hashtag
                        <CreatableSelect
                            isMulti
                            closeMenuOnSelect={false}
                            placeholder='Select or create a hashtag to better describe yourself...'
                            options={HASHTAG}
                            styles={selectStyles}
                            onChange={(e) => onSelectChange(e, setTag)}
                            value={tag}
                        />
                    </label>
                </div>
            </section>
            <section className='edt-profile-form__wrapper'>
                <header>
                    <h1>SKILLS</h1>
                </header>
                <div className='edt-profile-form__st'>
                    <label>
                        Languages
                        <CreatableSelect
                            isMulti
                            closeMenuOnSelect={false}
                            placeholder='Select Language...'
                            options={LANGUAGES}
                            styles={selectStyles}
                            onChange={(e) => onSelectChange(e, setLang)}
                            value={lang}
                        />
                    </label>
                </div>
                <div className='edt-profile-form__btn-grp' style={{ paddingTop: '2rem', marginLeft: 'auto' }}>
                    <button onClick={() => handleNavigate(`/profile/${account.profile.username}`)} className='edt-profile-form__btn edt-profile-form__btn--gray'>Cancel</button>
                    <input className='edt-profile-form__btn edt-profile-form__btn--green' type='submit' value='Save' />
                </div>
            </section>
        </form>
    );
}

export default EditBio;