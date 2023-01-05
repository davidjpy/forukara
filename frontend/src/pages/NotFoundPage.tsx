import { FC, useEffect, useState } from 'react'; 

import '@pages/HomePage.css';



const NotFoundPage: FC = () => {

    const [state, setState] = useState({ id: 'sss', name: 'ssssss'})

    useEffect(() => {
        console.log('runned');
    }, [state]);

    const handle = () => {
        setState({ id: 'sss', name: 'ssssss'})
    }

    return (
        <div className='homepage'>
            <button onClick={handle}>data</button>
            <button onClick={() => console.log(state)}>data</button>
        </div>
    );
}

export default NotFoundPage;