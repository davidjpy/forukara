import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

const ProfileTabBar: FC = () => {

    const [searchParams, setSearchParams] = useSearchParams({ search: 'biography' });

    const handleSwitchTab = (tab: 'biography' | 'discussions' | 'connections'): void => {
        setSearchParams({ search: tab }, { replace: true });
    }

    return (
        <section className='profiletabbar'>
            <ul role='tablist' className='profiletabbar__tablist'>
                <li role='tab' aria-controls='biography' onClick={() => handleSwitchTab('biography')}
                    className={searchParams.get('search') === 'biography' ?
                        'profiletabbar__tab profiletabbar__tab--active' :
                        'profiletabbar__tab'
                    }>
                    <h1>Biography</h1>
                </li>
                <li role='tab' aria-controls='discussions' onClick={() => handleSwitchTab('discussions')}
                    className={searchParams.get('search') === 'discussions' ?
                        'profiletabbar__tab profiletabbar__tab--active' :
                        'profiletabbar__tab'
                    }>
                    <h1>Discussions</h1>
                </li>
                <li role='tab' aria-controls='connections' onClick={() => handleSwitchTab('connections')}
                    className={searchParams.get('search') === 'connections' ?
                        'profiletabbar__tab profiletabbar__tab--active' :
                        'profiletabbar__tab'
                    }>
                    <h1>Connections</h1>
                </li>
                <div
                    className={
                        searchParams.get('search') === 'biography' ?
                            'profiletabbar__underline profiletabbar__underline--left' :
                            searchParams.get('search') === 'discussions' ?
                                'profiletabbar__underline profiletabbar__underline--center' :
                                'profiletabbar__underline profiletabbar__underline--right'
                    }>
                </div>
            </ul>
        </section>
    );
}

export default ProfileTabBar