import { useEffect, useRef } from 'react'; 

import '@pages/HomePage.css';

const ForumPage = () => {

    const pageRef = useRef<HTMLDivElement>(null);

    const handleResize = (): void => {
        if (pageRef.current) {
            pageRef.current.style.height = `${window.innerHeight}px`;
        }
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    });

    return (
        <div ref={pageRef} className='homepage'>
            heee
        </div>
    );
}

export default ForumPage;