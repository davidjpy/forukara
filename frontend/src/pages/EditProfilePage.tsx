import { FC } from 'react';
import { IoMdReturnLeft } from 'react-icons/io';
import { AiFillHome } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import '@pages/EditProfilePage.css';
import UpdateForm from '@features/user/UpdateForm';
import { useAppSelector } from '@app/hooks';


const EditProfilePage: FC = () => {

    const navigate = useNavigate();
    const account = useAppSelector((state) => state.auth.user);

    return (
        <div className='editprofilepage'>
            <header className='layout__header'>
                <button onClick={() => navigate(-1)} aria-label='Previous page' title='Navigate to previous page'>
                    <IoMdReturnLeft aria-hidden={true} size={20} style={{ verticalAlign: 'top' }} />
                </button>
                <h1>
                    <AiFillHome aria-hidden={true} style={{ verticalAlign: 'top' }} /> Home / Users / {account?.username} / <span>Edit Profile</span>
                </h1>
            </header>
            <UpdateForm />
        </div>
    )
}

export default EditProfilePage;