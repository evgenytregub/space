import React, {Component} from 'react';
import {Link} from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 'log'
        }
        this.forgotView = this.forgotView.bind(this);
        this.logView = this.logView.bind(this);
    }

    log() {
        return (
            <div>
                <Form>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email" name="email" id="exampleEmail" placeholder="Enter your Email" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" name="password" id="examplePassword" placeholder="Enter your Password" />
                    </FormGroup>
                    <Button className='col-12'>Submit</Button>
                </Form>
                <div className='row d-flex justify-content-center mt-2'>
                    <Link to="#"
                        onClick={this.forgotView}
                    >Forgot your password?</Link>
                </div>
                <div className='row d-flex justify-content-center mt-2'>
                    <p>or log in with</p>
                </div>
                <div className='row d-flex justify-content-center'>
                    <div className='col-3'><img src="../logoGoogle.png" className='col-12'/></div>
                    <div className='col-3'><img src="../logoOffice.png" className='col-12'/></div>
                </div>
            </div>
        )
    }

    forgot() {
        return (
            <div>
                <div className='row d-flex justify-content-center'>
                    <h1>Password recovery</h1>
                    <p>Enter your email for further instructions</p>
                </div>
                <Form>
                    <FormGroup>
                        <Input type="email" name="email" id="exampleEmail" placeholder="Enter your Email" />
                    </FormGroup>
                    <Button className='col-12'>Submit</Button>
                </Form>
                <div className='row d-flex justify-content-center mt-2'>
                    <Link to="#" onClick={this.logView}><i className="bi bi-chevron-left">Back to</i></Link>
                </div>
            </div>
        )
    }

    forgotView() {
        this.setState({view: 'forgot'});
    }
    logView() {
        this.setState({view: 'log'});
    }

    render () {
        const positionTop = {top: window.innerWidth / 8};
        const view = this.state.view;
        let block = '';
        if (view === 'log') {
            block = this.log();
        } else if (view === 'forgot') {
            block = this.forgot();
        }

        return(
            <div className='login box' style={positionTop}>
                <div className='row d-flex justify-content-center'>
                    <img src="../logo.png" className='col-3'/>
                </div>
                {block}
            </div>
        )
    }

}