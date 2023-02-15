import { FC } from 'react';

import '@pages/CreateDiscussionPage.css'
import { useAppSelector } from '@app/hooks';
import CreateDiscussionForm from '@features/discussion/CreateDiscussionForm';

const CreateDiscussionPage: FC = () => {

    const account = useAppSelector((state) => state.auth.user);

    return (
        <div className='create-dis'>
            <section className='create-dis__header'>
                <header>
                    <h1>Discussion</h1>
                    <span>@{account.profile.username}</span>
                </header>
            </section>
            <section className='create-dis__form'>
                <CreateDiscussionForm 
                    account={account}
                />
            </section>
        </div>
    );
}

export default CreateDiscussionPage;