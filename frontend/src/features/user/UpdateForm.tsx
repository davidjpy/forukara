import { FC, FormEvent, useRef } from 'react';

import { useInput } from '@common/hooks/useInput';

// Update user profile
const UpdateForm: FC = () => {

    const fileRef = useRef<HTMLInputElement>(null);
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('id', id);
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);

        if (fileRef.current?.files) {
            formData.append('avatar', fileRef.current.files[0])
        }


        await fetch('http://127.0.0.1:3500/users', {
            method: 'PATCH',
            mode: 'cors',
            body: formData
        }).then(res => {
            console.log(res)
        })

        
    }

    const [id, handleChangeId, resetId] = useInput('');
    const [username, handleChangeUsername, resetUsername] = useInput('');
    const [email, handleChangeEmail, resetEmail] = useInput('');
    const [password, handleChangePassword, resetPassword] = useInput('');
    
    return (
        <section className='updateform'>
            <header>
                <h1>Update User</h1>
            </header>
            <form onSubmit={handleSubmit} className='updateform__userform' >
                <div>
                    <label htmlFor='update-id'>Id</label>
                    <input id='update-id' type='text' value={id} onChange={handleChangeId} />
                </div>

                <div>
                    <label htmlFor='update-username'>Username</label>
                    <input id='update-username' type='text' value={username} onChange={handleChangeUsername} />
                </div>

                <div>
                    <label htmlFor='update-email'>email</label>
                    <input id='update-email' type='email' value={email} onChange={handleChangeEmail} />
                </div>


                <div>
                    <label htmlFor='update-password'>password</label>
                    <input id='update-password' type='password' value={password} onChange={handleChangePassword} />
                </div>

                <div>
                    <label htmlFor='update-avatar'>avatar</label>
                    <input id='update-avatar' ref={fileRef} type='file' name='avatar' />
                </div>

                <div>
                    <label htmlFor='update-background'>background</label>
                    <input id='update-background' type='file' name='background' />
                </div>

                <input type='submit' />
            </form>
        </section>
    );
}

export default UpdateForm;  