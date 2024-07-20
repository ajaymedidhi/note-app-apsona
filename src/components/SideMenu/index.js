import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css'; // Import your styles if you have them

const SideMenu = () => {
    return (
        <div className="sidemenu">
            <NavLink to="/notes" activeClassName="active">
                Notes
            </NavLink>
            <NavLink to="/reminders" activeClassName="active">
                Reminders
            </NavLink>
            <NavLink to="/create-label" activeClassName="active">
                Create New Label
            </NavLink>
            <NavLink to="/archive" activeClassName="active">
                Archive
            </NavLink>
            <NavLink to="/deleted" activeClassName="active">
                Deleted
            </NavLink>
            <NavLink to="/settings" activeClassName="active">
                Settings
            </NavLink>
            <NavLink to="/help-feedback" activeClassName="active">
                Help & Feedback
            </NavLink>
        </div>
    );
};

export default SideMenu;
