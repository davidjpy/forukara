import { FC } from 'react';

import EditBio from './EditBio';
import EditAccount from './EditAccount';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '@app/hooks';

// Update user profile
const EditProfileForm: FC = () => {

    const account = useAppSelector((state) => state.auth.user);
    const [searchParams, setSearchParams] = useSearchParams();

    const handleSwitchTab = (tab: 'biography' | 'account'): void => {
        setSearchParams({ section: tab }, { replace: true });
    }

    return (
        <section>
            <header className='edt-form__header'>
                <div className='edt-form__header--wrapper'>
                    <h1>Edit Profile</h1>
                    <span>@{account.profile.username}</span>
                </div>
                <div className='edt-form__tablist'>
                    <p onClick={() => handleSwitchTab('account')}
                        className={!searchParams.get('section') || searchParams.get('section') === 'account'
                            ? 'edt-form__tab edt-form__tab--active'
                            : 'edt-form__tab'
                        }>
                        Account
                    </p>
                    <p onClick={() => handleSwitchTab('biography')} className={searchParams.get('section') === 'biography'
                        ? 'edt-form__tab edt-form__tab--active'
                        : 'edt-form__tab'
                    }>
                        Biography
                    </p>
                    <div className={
                        searchParams.get('section') === 'biography'
                            ? 'edt-form__divider edt-form__divider--right'
                            : 'edt-form__divider edt-form__divider--left'
                    }>
                    </div>
                </div>
            </header>

            {
                searchParams.get('section') === 'biography'
                    ? <EditBio
                        account={account}
                    />
                    : <EditAccount
                        account={account}
                    />
            }
        </section>
    );
}

export default EditProfileForm;  