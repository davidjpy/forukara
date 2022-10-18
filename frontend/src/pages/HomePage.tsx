import { FaArrowRight } from 'react-icons/fa';

import '@pages/HomePage.css';

const HomePage = () => {
    return (
        <div className='homepage'>
            <div className='homepage__image'></div>
            <div className='homepage__slogan'>
                <p className='homepage__header homepage__header--large'>I'm a</p>
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