import { FC } from 'react';

import '@pages/EditProfilePage.css';
import EditProfileForm from '@features/user/EditProfileForm';


const EditProfilePage: FC = () => {
    return (
        <div className='edt-profile'>
            <EditProfileForm />
        </div>
    )
}

export default EditProfilePage;