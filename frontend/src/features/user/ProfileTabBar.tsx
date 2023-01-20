import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

const ProfileTabBar: FC = () => {

    const [searchParams, setSearchParams] = useSearchParams({ search: 'biography' });

    const handleSwitchTab = (tab: 'biography' | 'discussions' | 'connections'): void => {
        setSearchParams({ search: tab }, { replace: true });
    }

    return (
        <section className='profile-bar'>
            <ul role='tablist' className='profile-bar__tablist'>
                <li role='tab' aria-controls='biography' onClick={() => handleSwitchTab('biography')}
                    className={searchParams.get('search') === 'biography' ?
                        'profile-bar__tab profile-bar__tab--active' :
                        'profile-bar__tab'
                    }>
                    <p>Biography</p>
                </li>
                <li role='tab' aria-controls='discussions' onClick={() => handleSwitchTab('discussions')}
                    className={searchParams.get('search') === 'discussions' ?
                        'profile-bar__tab profile-bar__tab--active' :
                        'profile-bar__tab'
                    }>
                    <p>Discussions</p>
                </li>
                <li role='tab' aria-controls='connections' onClick={() => handleSwitchTab('connections')}
                    className={searchParams.get('search') === 'connections' ?
                        'profile-bar__tab profile-bar__tab--active' :
                        'profile-bar__tab'
                    }>
                    <p>Connections</p>
                </li>
                <div
                    className={
                        searchParams.get('search') === 'biography' ?
                            'profile-bar__underline profile-bar__underline--left' :
                            searchParams.get('search') === 'discussions' ?
                                'profile-bar__underline profile-bar__underline--center' :
                                'profile-bar__underline profile-bar__underline--right'
                    }>
                </div>
            </ul>
        </section>
    );
}

export default ProfileTabBar