import { FC } from 'react';

import '@pages/EditProfilePage.css';
import EditProfileForm from '@features/user/EditProfileForm';
import { useAppSelector } from '@app/hooks';


const EditProfilePage: FC = () => {
    const account = useAppSelector((state) => state.auth.user);

    return (
        <div className='edt-profile'>
            <EditProfileForm 
                account={account}
            />
        </div>
    )
}

export default EditProfilePage;