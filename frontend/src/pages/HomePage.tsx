import { useEffect, useRef, FC } from 'react';
import { FaArrowRight } from 'react-icons/fa';

import '@pages/HomePage.css';

const textOptions: Array<string> = [
    'Construction Worker',
    'Social Worker',
    'Business Owner',
    'Veterinarian',
    'Photographer',
    'Equipment Operator',
    'Videographer',
    'Firefighter',
    'Mathematician',
    'Computer Scientist',
    'Hair Stylist',
    'Executive Manager',
    'Surveyor',
    'Software Developer',
    'Hospitality Worker',
    'Medical Professional',
    'Mechanic',
];

const HomePage: FC = () => {

    const dynamicTxtRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        function changeText() {
            let optionIndex: number = 0;
            let charIndex: number = 0;
            let increment: boolean = true;

            setInterval(() => {
                if (dynamicTxtRef.current) {
                    dynamicTxtRef.current.textContent = textOptions[optionIndex].slice(0, charIndex);

                    if (charIndex === textOptions[optionIndex].length) {
                        setTimeout(() => {
                            increment = false;
                        }, 400);
                    } else if (charIndex === 0 && !increment) {
                        optionIndex++;
                        increment = true;
                    }

                    if (increment) {
                        charIndex++;
                    } else {
                        charIndex--;
                    }

                    if (optionIndex > textOptions.length - 1) {
                        optionIndex = 0;
                    }
                }
            }, 80);
        }
        changeText();
    }, []);

    return (
        <div className='homepage'>
            <div className='homepage__image'></div>
            <div className='homepage__slogan'>
                <div className='homepage__dynamic-txts-wrapper'>
                    <p className='homepage__header homepage__header--large'>I'm a</p>
                    <p className='homepage__header homepage__header--large homepage__header--dynamic' ref={dynamicTxtRef}></p>
                </div>
                <p className='homepage__header'>Share Your Wisdoms, Inspire The World, Reach The Impossibility</p>
                <button className='homepage__button'>
                    Start Now
                    <FaArrowRight className='homepage__icon' />
                </button>
            </div>
        </div>
    );
}

export default HomePage;