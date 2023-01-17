import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import '@pages/EditProfilePage.css';
import { useAppSelector } from '@app/hooks';
import EditBio from '@features/user/EditBio';
import EditAccount from '@features/user/EditAccount';

const EditProfilePage: FC = () => {

    const account = useAppSelector((state) => state.auth.user);
    const [searchParams, setSearchParams] = useSearchParams();

    const isLoading = useAppSelector((state) => {
        return Object.values(state.api.queries).find((item) => item?.endpointName === 'getAccountById')?.status !== 'fulfilled'
    });

    const handleSwitchTab = (tab: 'biography' | 'account'): void => {
        setSearchParams({ section: tab }, { replace: true });
    }

    return (
        <div className='edt-profile'>
            <header className='edt-form__header'>
                {isLoading ? (
                    <div style={{ padding: '2rem' }}>
                        <Skeleton
                            height={30}
                            width='35%'
                            baseColor='#E3E3E3'
                        />
                        <Skeleton
                            height={20}
                            width='60%'
                            baseColor='#E3E3E3'
                            style={{ marginTop: '0.8rem' }}
                        />
                    </div>
                ) : (
                    <>
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
                    </>
                )}
            </header>

            {isLoading ? (
                <>
                    <div className='edt-profile-form__wrapper'>
                        <Skeleton
                            height={30}
                            width='35%'
                            baseColor='#E3E3E3'
                        />
                    </div>
                </>
            ) : (
                <div style={{ padding: '2rem' }}>
                    <div className='edt-profile-form__wrapper' style={{ display: 'block', textAlign: 'center' }}>
                        <Skeleton
                            height={150}
                            width={150}
                            circle
                            baseColor='#E3E3E3'
                            style={{
                                marginBottom: '1rem',
                            }}
                        />
                        <div style={{ textAlign: 'start' }}>
                            <Skeleton
                                height={20}
                                baseColor='#E3E3E3'
                                count={4}   
                                style={{
                                    margin: '0.4rem 0'
                                }}
                            />
                            <Skeleton
                                height={20}
                                baseColor='#E3E3E3'
                                width='65%'
                                style={{
                                    margin: '0.4rem 0'

                                }}
                            />
                        </div>
                    </div>
                </div>
                // searchParams.get('section') === 'biography'
                //     ? <EditBio
                //         account={account}
                //     />
                //     : <EditAccount
                //         account={account}
                //     />
            )}
        </div>
    )
}

export default EditProfilePage;