import { useEffect, useRef, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

import '@pages/HomePage.css';

const HomePage = () => {

    const textOptions = ['Military Personnel', 'Software Developer', 'Construction Worker', 'Medical Professional'];
    const dynamicTxtRef = useRef<HTMLLIElement>(null);
    const [trigger, setTrigger] = useState<number>(0);
    const index = useRef<number>(0);

    useEffect(() => {
        const triggerer = setInterval(() => {
            setTrigger(prev => prev + 1);
        }, 2500);

        return () => {
            clearInterval(triggerer);
        }
    }, []);

    useEffect(() => {
        if (index.current < 3) {
            index.current++;
        } else {
            index.current = 0;
        }

        if (dynamicTxtRef.current) {
            dynamicTxtRef.current.textContent = textOptions[index.current];
        }
    }, [trigger]);

    return (
        <div className='homepage'>
            <div className='homepage__image'></div>
            <div className='homepage__slogan'>
                <div className='homepage__dynamic-txts-wrapper'>
                    <p className='homepage__header homepage__header--large'>I'm a</p>
                    <ul className='homepage__header homepage__header--large homepage__dynamic-txts'>
                        <li ref={dynamicTxtRef}></li>
                    </ul>
                </div>
                <p className='homepage__header'>Share Your Wisdoms, Inspire The World</p>
                <button className='homepage__button'>
                    Start Now
                    <FaArrowRight className='homepage__icon' />
                </button>
            </div>
        </div>
    );
}

export default HomePage;