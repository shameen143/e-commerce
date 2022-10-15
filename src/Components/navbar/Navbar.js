import React from "react";
import './navbar.css';
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";



const Navbar=()=>{

    const {user} = useContext(AuthContext);

    const navigate=useNavigate()

    const handleClick=()=>{
        localStorage.clear();
        navigate('/login')
        
    }

    return(
        <div className="navbar">
            <div className="navContainer">
                <Link to="/" style={{color:"inherit", textDecoration:"none"}}>
                <span className="logo">Lamabooking</span>
                </Link>

                {user ? user.username : (<div className="navItems">
                    <button className="navButton">Register</button>
                    <button className="navButton">Login</button>
                

                </div>)}
                {!user ? user.username:(<div className="navItems">
                <button onClick={handleClick} className="navButton">Logout</button>
                </div>)}

            </div>

            </div>

    );
};
export default Navbar;