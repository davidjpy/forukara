import { FC } from 'react';
import { FaBlog } from 'react-icons/fa';

const Nav: FC = () => {
    return (
        <header className='layout__nav'>
            <div className='layout__container'>
                <div className='splashlayout__logo-wrapper'>
                    <FaBlog />
                    <p>Forukara</p>
                </div>
                <div className='splashlayout__button-wrapper'>
                    <button className='splashlayout__button splashlayout__button--text'>Login</button>
                    <button className='splashlayout__button splashlayout__button--slide'>&nbsp;</button>
                </div>
            </div>
        </header>
    );
}

export default Nav;