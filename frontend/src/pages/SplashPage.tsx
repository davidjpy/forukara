import { useEffect, useRef, FC } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import '@pages/SplashPage.css';

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

const SplashPage: FC = () => {

    const dynamicTxtRef = useRef<HTMLParagraphElement>(null);
    const navigate = useNavigate();

    const handleNavigateHomepage = () => {
        navigate('/home');
    }

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
        <div className='SplashPage'>
            <div className='SplashPage__image'></div>
            <div className='SplashPage__slogan'>
                <div className='SplashPage__dynamic-txts-wrapper'>
                    <p className='SplashPage__header SplashPage__header--large'>I'm a</p>
                    <p className='SplashPage__header SplashPage__header--large SplashPage__header--dynamic' ref={dynamicTxtRef}></p>
                </div>
                <p className='SplashPage__header'>Share Your Wisdoms, Inspire The World, Reach The Impossibility</p>
                <button onClick={handleNavigateHomepage} className='SplashPage__button'>
                    Start Now
                    <FaArrowRight className='SplashPage__icon' />
                </button>
            </div>
        </div>
    );
}

export default SplashPage;