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
    const imageRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const handleNavigateHomepage = () => {
        navigate('/home');
    }

    const handleResize = (): void => {
        if (imageRef.current) {
            imageRef.current.style.height = `${window.innerHeight}px`;
        }
    }

    useEffect(() => {
        handleResize();
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

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    })

    return (
        <div ref={imageRef} className='splashpage'>
            <div className='splashpage__overlay'>
                <div className='splashpage__slogan'>
                    <div className='splashpage__dynamic-txts-wrapper'>
                        <p className='splashpage__header splashpage__header--large'>I'm a</p>
                        <p className='splashpage__header splashpage__header--large splashpage__header--dynamic' ref={dynamicTxtRef}></p>
                    </div>
                    <p className='splashpage__header'>Share Your Wisdoms, Inspire The World, Reach The Impossibility</p>
                    <button onClick={handleNavigateHomepage} className='splashpage__button'>
                        Start Now
                        <FaArrowRight className='splashpage__icon' />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SplashPage;