import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import AppHeader from "../workspace/components/header";
import LeftMenu from "../workspace/components/leftmenu/leftmenu";
import Schedule from "../workspace/scheduler/scheduler";
import Company from "../workspace/company/company";
import Community from "../workspace/community/module/community";
import Home from "../workspace/home/module/home";
import Login from "../login/login"
import './app.css';
import './app.scss';
//import style from './App.module.css';
import styled from 'styled-components';

const AppBlock = styled.div`
    background-color: #ffffff;
`;

class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api'
    }
    async getResource (url) {
        const res = await fetch(`${this._apiBase}${url}`);
        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }

    getAllCharacters() {
        return this.getResource('/characters?page=5&pageSize=10');
    }

    getCharacters(id) {
        return this.getResource(`/characters/${id}`);
    }
}

const got = new GotService();
got.getAllCharacters()
    .then(res => {
        res.forEach(item => console.log(item.name));
    });
got.getCharacters(130)
    .then(res => console.log(res));

const App = () => {
    return (
        <Router>
            <AppBlock>
                <div className="container-fluid">
                        <Route path='/schedule' exact component={AppHeader}/>
                        <Route path='/company' exact component={AppHeader}/>
                        <Route path='/community' exact component={AppHeader}/>
                        <Route path='/' exact component={AppHeader}/>

                    <div className="row">
                        <div className="col-lg-1">

                            <Route path='/schedule' exact component={LeftMenu}/>
                            <Route path='/company' exact component={LeftMenu}/>
                            <Route path='/community' exact component={LeftMenu}/>
                            <Route path='/' exact component={LeftMenu}/>
                        </div>
                        <div className="col-lg-11 wrapper">
                            <Route path='/schedule' exact component={Schedule}/>
                            <Route path='/company' exact component={Company}/>
                            <Route path='/community' exact component={Community}/>
                            <Route path='/login' exact component={Login}/>
                            <Route path='/' exact component={Home}/>
                        </div>
                    </div>
                </div>
            </AppBlock>
        </Router>

    )
}

export default App;