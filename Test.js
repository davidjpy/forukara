import { useEffect, useRef, useState } from 'react';
import './Test.css'

const Test = () => {

    const textOptions = ['YouTuber', 'Programmer', 'Student', 'Construction Worker'];
    const dynamicTxtRef = useRef();
    const [trigger, setTrigger] = useState(0);
    const index = useRef(0);

    useEffect(() => {
        const test = setInterval(() => {
            console.log('Counted')
            setTrigger(prev => prev + 1);
        }, 2500);

        return () => {
            clearInterval(test);
        }
    }, []);

    useEffect(() => {
        if (index.current < 3) {
            index.current++;
        } else {
            index.current = 0;
        }

        console.log(`The current index is ${index.current}`)
        dynamicTxtRef.current.textContent = textOptions[index.current];
    }, [trigger]);

    return (
        <div className='test'>
            <ul className='dynamic-txts'>
                <li><span ref={dynamicTxtRef}></span></li>
            </ul>
        </div>
    );
}

export default Test;