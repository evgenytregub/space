import React, { useState } from 'react';
import {Link} from "react-router-dom";
import { Collapse, Button, CardBody, Card } from 'reactstrap';

import './leftmenu.scss'

const LeftMenu = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const height = {height: window.innerHeight - 50};

    return (
        <div className="leftMenu" style={height}>
            <nav className="navbar">
                <ul className="navbar-nav font_12 spacing_2">
                    <li className="nav-item">
                        <Link className="nav-link " to="/dashboard"><i className="bi bi-columns-gap"></i><span>Dashboard</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#" onClick={toggle}><i className="bi bi-puzzle"></i><span>Company</span></Link>
                    </li>
                    <Collapse isOpen={isOpen}>
                        <ul className="navbar-nav font_12 spacing_2 ml-4">
                            <li className="nav-item">
                                <Link className="nav-link" to="/company" ><span>Structure</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="#" ><span>Staff</span></Link>
                            </li>
                        </ul>
                    </Collapse>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Community"><i className="bi bi-book"></i><span>Intercom</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/tasks"><i className="bi bi-clipboard-check"></i><span>Tasks</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Schedule"><i className="bi bi-file-earmark-bar-graph"></i><span>Schedule</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/calendar"><i className="bi bi-calendar2-check"></i><span>Calendar</span></Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default LeftMenu;