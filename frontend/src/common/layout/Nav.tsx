const Nav = () => {
    return (
        <header className='nav'>
            <div className='nav__image'></div>
            <div className='nav__header'>
                <p className='nav__body' style={{ flex: 1 }}>Fun Fact: <span className='nav__body nav__body--gray'>A crocodile cannot stick its tongue out</span></p>
                <div className='nav__button-wrapper'>
                    <button className='nav__button nav__button--login'>&nbsp;</button>
                    <button className='nav__button nav__button--register'>&nbsp;</button>
                </div>
            </div>
            <div className='nav__tabs'>
            </div>
        </header>
    );
}

export default Nav; 