import React, { Component } from 'react';
import User from "../user/user";

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userPanel: 'anInvisible'
        }
        this.onClickUserPanel = this.onClickUserPanel.bind(this);
    }

    onClickUserPanel() {
        let userPanel = this.state.userPanel
        if (userPanel === 'anInvisible') {
            userPanel = 'anVisible';
            this.setState({userPanel});
        } else {
            userPanel = 'anInvisible';
            this.setState({userPanel});
        }
    }

    render () {
        const userPanelVisible = this.state.userPanel;

        return (
            <div>
                <div>
                    <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top d-flex justify-content-end">
                        <a className="navbar-brand" href="#">Logo</a>
                        <ul className="navbar-nav">
                            <li className="nav-item headerCol">
                                <i className="bi bi-question-circle headerIcons"></i>
                            </li>
                            <li className="nav-item headerCol">
                                <i className="bi bi-gear headerIcons"></i>
                            </li>
                            <li className="nav-item headerCol">
                                <i className="bi bi-gear headerIcons"></i>
                            </li>
                            <li className="nav-item headerCol">
                                <i className="bi bi-globe2 headerIcons"></i>
                            </li>
                            <li
                                className="nav-item headerCol"
                                onClick={this.onClickUserPanel}
                            >
                                <i className="bi bi-person-circle headerIcons"></i>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className={userPanelVisible}>
                    <User className={userPanelVisible} />
                </div>

            </div>
        );
    }
}