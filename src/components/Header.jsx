import React from 'react';
import './Header.css'; 
import logo from '../img/logo.png';

export default ({black}) => {
    return(
        <header className={black ? 'black': ''}>
            <div className="header--logo">
                <a href="/">
                    <img src={logo} alt="netflix" />
                </a>
            </div>
            <div className="Header--user">
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="user" />
                </a>
            </div>
        </header>
    )
}