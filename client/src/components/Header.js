import React from 'react'
import { Link } from 'react-router-dom'


const Header = () => 
   (<nav>
    <div className="nav-wrapper orange accent-2">
        <Link to={"/"} className="brand-logo">BC Children's Hospital</Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to={"/Research"}>Research</Link></li>
            <li><Link to={"/Support"}>Support</Link></li>
            <li><Link to={"/Technologies"}>Technologies</Link></li>
            <li><Link to={"/Our Team"}>Our Team</Link></li>
        </ul>
    </div>
    </nav>)


export default Header