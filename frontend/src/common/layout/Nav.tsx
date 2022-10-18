import { FaBlog } from 'react-icons/fa';

const Nav = () => {
    return (
        <header className='nav'>
            <div className='nav__bar'>
                <div className='nav__logo-wrapper'>
                    <FaBlog />
                    <p>Forukara</p>
                </div>
                <div className='nav__button-wrapper'>
                    <button className='nav__button nav__button--text'>Login</button>
                    <button className='nav__button nav__button--slide'>&nbsp;</button>
                </div>
            </div>
        </header>
    );
}   

export default Nav; 