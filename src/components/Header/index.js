import React from 'react';
import { NavLink } from 'react-router-dom'; // Adjust if using React Router
import './index.css'; // Import your styles if you have them

const Header = () => {
    return (
        <header className="header">
            <div className="header-inner">
                <div className="logo">
                    <span className="material-icons">Apsona</span>
                    <span className="logo-text">Note</span>
                </div>
                <nav className="nav-links">
                    <NavLink to="/update" activeClassName="active">Notes</NavLink>
                    <NavLink to="/update" activeClassName="active">Reminders</NavLink>
                    <NavLink to="/archive" activeClassName="active">Archive</NavLink>
                    <NavLink to="/deleted" activeClassName="active">Deleted</NavLink>
                    <NavLink to="/update" activeClassName="active">Settings</NavLink>
                    <NavLink to="/update" activeClassName="active">Help & Feedback</NavLink>
                </nav>
            </div>
        </header>
    );
};

export default Header;
