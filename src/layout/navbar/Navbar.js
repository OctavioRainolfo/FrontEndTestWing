import React from 'react'
import shortlogo from '../../images/shortlogo.png'
import './Navbar.css'


function Navbar() {

    return (
        <header className='headerMovieDB'>
            <div className='subMedia'>

                <div className='logoDiv'>
                    <img src={shortlogo} alt='logo' />
                </div>

            </div>
        </header>
    )
}

export default Navbar