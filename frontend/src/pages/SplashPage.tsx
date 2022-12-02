import { useEffect, useRef, FC } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import '@pages/SplashPage.css';
import { useWindowResize } from '@common/hooks/useWindowResize';

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
    const imageRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    useWindowResize(imageRef);
    useWindowResize(overlayRef);
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
        <div ref={imageRef} className='splashpage'>
            <div ref={overlayRef} className='splashpage__overlay'>
                <div className='splashpage__slogan'>
                    <header>
                        <p className='splashpage__header splashpage__header--large'>I'm a</p>
                        <p className='splashpage__header splashpage__header--large splashpage__header--dynamic' ref={dynamicTxtRef}></p>
                    </header>
                    <p className='splashpage__header'>Share Your Wisdoms, Inspire The World, Reach The Impossibility</p>
                    <button onClick={handleNavigateHomepage}>
                        Start Now
                        <FaArrowRight className='splashpage__icon' />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SplashPage;