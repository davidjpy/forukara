import { FC } from 'react'; 

import '@pages/HomePage.css';

const HomePage: FC = () => {

    // const pageRef = useRef<HTMLDivElement>(null);

    // const handleResize = (): void => {
    //     if (pageRef.current) {
    //         pageRef.current.style.height = `${window.innerHeight}px`;
    //     }
    // }

    // useEffect(() => {
    //     window.addEventListener('resize', handleResize);

    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     }
    // });

    return (
        <div className='homepage'>
        </div>
    );
}

export default HomePage;