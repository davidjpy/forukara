const Nav = () => {
    return (
        <header className='nav'>
            <div className='nav__header'>
                <p className='nav__body' style={{ flex: 1 }}>Fun Fact: <span className='nav__body nav__body--gray'>A crocodile cannot stick its tongue out</span></p>
                <div className='nav__button-wrapper'>
                    <p className='nav__body'>Login</p>
                    <p className='nav__body'>Register</p>
                </div>
            </div>
        </header>
    );
}

export default Nav;