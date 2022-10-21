import { FC } from 'react';
import { FaBlog } from 'react-icons/fa';

const Nav: FC = () => {
    return (
        <header className='layout__nav'>
            <div className='layout__container'>
                <div className='layout__logo-wrapper'>
                    <FaBlog />
                    <p>Forukara</p>
                </div>
                <div className='layout__button-wrapper'>
                    <button className='layout__button layout__button--text'>Login</button>
                    <button className='layout__button layout__button--slide'>&nbsp;</button>
                </div>
            </div>
        </header>
    );
}   

export default Nav; 