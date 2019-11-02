import React from 'react';
import '../Layouts/Header.css'
import {Link,NavLink} from 'react-router-dom';
const Header = () => {
    return(
    <header>
        <nav className="navbar navbar-dark bg-dark">
            <div className="container">
                <Link to="/" className="navbar-brand">
                Auth App
                </Link>
                
                       <NavLink  to="/register" className="nav-links">Register</NavLink>     
                   
                     
                       <NavLink  to="/login" className="nav-link">Login</NavLink>     
                   
            </div>
        </nav>
    </header>
    );
};

export default Header;