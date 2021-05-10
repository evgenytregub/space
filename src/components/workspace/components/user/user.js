import React, { useState } from 'react';
import {Link} from "react-router-dom";
import { Collapse, Button, CardBody, Card } from 'reactstrap';

import './user.scss'

const User = () => {


    const height = {height: window.innerHeight - 50};

    return (
        <div className="rightMenu" style={height}>
            <div className='mt-2 row m-0 d-flex align-items-center'>
                <div className='circle_50'></div>
                <div className=''><p className='font_12 spacing_2'>Yevhenii Trehub</p></div>
            </div>

            <nav className="navbar">
                <ul className="navbar-nav font_12 spacing_2">
                    <li className="nav-item">
                        <Link className="nav-link " to="/dashboard"><span>Dashboard</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#"><span>Company</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Community"><span>Intercom</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/tasks"><span>Tasks</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Schedule"><span>Schedule</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/calendar"><span>Calendar</span></Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default User;