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
        <div className='splashPage'>
            <div className='splashPage__overlay'>
                <div className='splashPage__slogan'>
                    <div className='splashPage__dynamic-txts-wrapper'>
                        <p className='splashPage__header splashPage__header--large'>I'm a</p>
                        <p className='splashPage__header splashPage__header--large splashPage__header--dynamic' ref={dynamicTxtRef}></p>
                    </div>
                    <p className='splashPage__header'>Share Your Wisdoms, Inspire The World, Reach The Impossibility</p>
                    <button onClick={handleNavigateHomepage} className='splashPage__button'>
                        Start Now
                        <FaArrowRight className='splashPage__icon' />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SplashPage;