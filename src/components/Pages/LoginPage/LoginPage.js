import React, {Component} from 'react';
import axios from 'axios';
import {eraseCookie, getCookie, setCookie} from '../../../utils/cookie';
import './loginStyle.css';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
          username: '',
          password: ''
        };
    }

    login = async (e) => {
        e.preventDefault();
        let {username, password} = this.state;
        const axiosInstance = axios.create({
            baseURL: 'https://mis-422.herokuapp.com',
            headers: {"Content-Type": "application/json"},
            timeout: 60000,
        });
        let response = await axiosInstance.post('https://mis-422.herokuapp.com/api/authenticate', {"username": username, 'password': password});

        if (response.status === 200) {
            setCookie('token', response.data.id_token, {});
            window.location.assign("/");
        }
    };

    render() {
        return (
            <div className="container h-100">
                <div className="d-flex justify-content-center h-100">
                    <div className="user_card">
                        <div className="d-flex justify-content-center">
                            <div className="brand_logo_container">
                                {/*<img*/}
                                {/*    src="https://cdn.freebiesupply.com/logos/large/2x/pinterest-circle-logo-png-transparent.png"*/}
                                {/*    className="brand_logo" alt="Logo" />*/}
                            </div>
                        </div>
                        <div className="d-flex justify-content-center form_container">
                            <form onSubmit={(e) => this.login(e)}>
                                <div className="input-group mb-3">
                                    <div className="input-group-append">
                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                    </div>
                                    <input type="text" name="" className="form-control input_user"
                                           onChange={(e) => this.setState({username: e.target.value}) }
                                           value={this.state.username}
                                           placeholder="username" />
                                </div>
                                <div className="input-group mb-2">
                                    <div className="input-group-append">
                                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                                    </div>
                                    <input type="password" name="" className="form-control input_pass"
                                           onChange={(e) => this.setState({password: e.target.value}) }
                                           value={this.state.password}
                                           placeholder="password" />
                                </div>
                                <div className="form-group">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input"
                                               id="customControlInline" />
                                            <label className="custom-control-label" htmlFor="customControlInline">Remember
                                                me</label>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center mt-3 login_container">
                                    <input type="submit" name="button" className="btn login_btn" value="login"/>
                                </div>
                            </form>
                        </div>

                        <div className="mt-4">
                            <div className="d-flex justify-content-center links">
                                Don't have an account? <a href="#" className="ml-2">Sign Up</a>
                            </div>
                            {/*<div className="d-flex justify-content-center links">*/}
                            {/*    <a href="#">Forgot your password?</a>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;
