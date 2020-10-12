import React from 'react';
import {Link} from 'react-router-dom'

const NavBar = () => {

    const logout = () => {
        localStorage.setItem('jwt', "null");
    }

    return (
      <nav className="topLevelNav">
        <Link to="/D2D" className="D2DNav navItem">
            Day 2 Day
        </Link>
        <Link onClick={logout} to="/login" className="logout navItem">
          Logout
        </Link>
        <Link to="/floaters" className="floatingTasksNav navItem">
          Floating Tasks
        </Link>
      </nav>
    );
}

export default NavBar;
