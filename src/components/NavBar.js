import React from 'react';
import {Link} from 'react-router-dom'

const NavBar = () => {
    const logout = () => {
        localStorage.setItem('jwt', "null");
    } 
    
    const determineAuthText = () => {
      if(localStorage.getItem("jwt") === "null"){
        return "Login"
      }else{
        return "Logout"
      }
    }

    return (
      <nav className="topLevelNav">
        <Link to="/D2D" className="D2DNav navItem">
            Day 2 Day
        </Link>
        <Link onClick={logout} to="/login" className="logout navItem">
          {determineAuthText()}
        </Link>
        <Link to="/floaters" className="floatingTasksNav navItem">
          Floating Tasks
        </Link>
      </nav>
    );
}

export default NavBar;
