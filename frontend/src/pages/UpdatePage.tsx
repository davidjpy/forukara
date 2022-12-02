import { FC } from 'react';

import '@pages/UpdatePage.css';
import UpdateForm from '@features/user/UpdateForm';

const UpdatePage: FC = () => {
    return (
        <div className='updatepage'>
            <div className='updatepage__wrapper'>
                <UpdateForm />
            </div>
        </div>
    )
}

export default UpdatePage;