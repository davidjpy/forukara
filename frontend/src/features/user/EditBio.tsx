import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MultiValue, StylesConfig } from 'react-select';
import CreatableSelect from 'react-select/creatable';

import { useEditBioMutation } from '@features/user/userApiSlice';
import { User } from '@common/utilities/types';
import { HASHTAG, LANGUAGES, INTERESTS, SKILLS } from '@common/utilities/constants';

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
        padding: '0.2rem 0',
        ':hover': {
            borderColor: '#2684FF'
        }
    }),
    multiValue: (styles) => ({
        ...styles,
        background: '#F5F5F5',
        margin: '0.2rem',
        fontSize: '1rem'
    }),
    multiValueRemove: (styles) => ({
        ...styles,
        ':hover': {
            backgroundColor: '#13515E',
            color: 'white',
            cursor: 'pointer'
        }
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
}

const EditBio: FC<Props> = ({ account }: Props) => {

    const navigate = useNavigate();
    const [editBio, editBioResult] = useEditBioMutation();
    const [tag, setTag] = useState<Array<SelectOption>>([]);
    const [topics, setTopics] = useState<Array<SelectOption>>([]);
    const [skill, setSkill] = useState<Array<SelectOption>>([]);
    const [lang, setLang] = useState<Array<SelectOption>>([]);
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


    return (
        <form onSubmit={submitForm} className='edt-profile-form' style={{ height: 'calc(1200px)' }}>
            <section className='edt-profile-form__wrapper'>
                <header>
                    <h1>INTRODUCTION</h1>
                </header>
                <div className='edt-profile-form__inputs'>
                    <label style={{ width: '100%' }}>
                        Sumary
                        <input
                            placeholder='Summarize yourself in one sentence....' type='text'
                        />
                    </label>
                </div>
                <div className='edt-profile-form__inputs'>
                    <label style={{ width: '100%' }}>
                        About Me
                        <textarea value={about} onChange={(e) => onChange(e, setAbout)} placeholder='Introduce yourself here...' />
                    </label>
                </div>
                <div className='edt-profile-form__st'>
                    <label>
                        Hashtag
                        <CreatableSelect
                            isMulti
                            closeMenuOnSelect={false}
                            placeholder='Select or create hashtag to better describe yourself...'
                            options={HASHTAG}
                            styles={selectStyles}
                            onChange={(e) => onSelectChange(e, setTag)}
                            value={tag}
                            menuShouldScrollIntoView={false}
                        />
                    </label>
                </div>
                <div className='edt-profile-form__st'>
                    <label>
                        Interested Topics
                        <CreatableSelect
                            isMulti
                            closeMenuOnSelect={false}
                            placeholder='Select or create topics that interest you...'
                            options={INTERESTS}
                            styles={selectStyles}
                            onChange={(e) => onSelectChange(e, setTopics)}
                            value={topics}
                            menuShouldScrollIntoView={false}
                        />
                    </label>
                </div>
            </section>
            <section className='edt-profile-form__wrapper'>
                <header>
                    <h1>EXPERTISE</h1>
                </header>
                <div className='edt-profile-form__st' style={{ marginTop: 0 }}>
                    <label>
                        Skills
                        <CreatableSelect
                            isMulti
                            closeMenuOnSelect={false}
                            placeholder='Select or create skills that you have...'
                            options={SKILLS}
                            styles={selectStyles}
                            onChange={(e) => onSelectChange(e, setSkill)}
                            value={skill}
                            menuShouldScrollIntoView={false}
                        />
                    </label>
                </div>
                <div className='edt-profile-form__st'>
                    <label>
                        Languages
                        <CreatableSelect
                            isMulti
                            closeMenuOnSelect={false}
                            placeholder='Selector or create languages that you are familiar with...'
                            options={LANGUAGES}
                            styles={selectStyles}
                            onChange={(e) => onSelectChange(e, setLang)}
                            value={lang}
                            menuShouldScrollIntoView={false}
                        />
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

export default EditBio;