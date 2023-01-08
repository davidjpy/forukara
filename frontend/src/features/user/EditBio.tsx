import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useEditBioMutation } from './userApiSlice';
import { User } from '@common/utilities/types';

type Props = {
    account: User
}

const EditBio: FC<Props> = ({ account }: Props) => {

    const navigate = useNavigate();
    const [editBio, editBioResult] = useEditBioMutation();
    const [about, setAbout] = useState('');

    const handleNavigate = (url: string): void => {
        navigate(url);
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setter: React.Dispatch<React.SetStateAction<string>>): void => {
        setter(e.target.value);
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
        console.log(about)
    }, [about])

    return (
        <form onSubmit={submitForm} className='edt-profile-form'>
            <section className='edt-profile-form__wrapper'>
                <header>
                    <h1>INTRODUCTION</h1>
                </header>
                <div className='edt-profile-form__inputs'>
                    <label style={{ width: '100%' }}>
                        About Me
                        <textarea value={about} onChange={(e) => onChange(e, setAbout)} placeholder='Introduce yourself here... '/>
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