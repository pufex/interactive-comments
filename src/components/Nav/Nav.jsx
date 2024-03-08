import React, { useState } from 'react'
import "./Nav.css"

const Nav = () => {
  
    const [rolled, setRolled] = useState(false);

    return <nav className='nav'>
        <div className="nav-container">
            <div className='logo'>
                D
            </div>
            <div className='nav-links'>
                <a href="#" className='nav-link'>
                    Home
                </a>
                <a href="#" className='nav-link'>
                    Profile
                </a>
                <a href="#" className='nav-link'>
                    Search
                </a>
            </div>
        </div>
    </nav>
}

export default Nav
