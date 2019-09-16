import React, {Component} from 'react';
import { Button } from "../containers/Button";
import {InputField} from "../containers/Input";
import { loginUser, loginUserSuccess, loginUserFailure } from '../../actions/login';
import {connect} from "react-redux";
import { withRouter } from "react-router-dom";
import './styles/Login.css'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginUser:'',
            loginPassword:''
        }
    }

    validateAndLoginUser(){
        this.props.dispatch(loginUser(this.state.loginUser, this.state.loginPassword));
    }


    render() {
        return (
            <div className="loginBodyContainer" >
                <div className="loginContainer">

                    <InputField
                        placeholder={"Username"}
                        onChange = { (event) => {
                            this.setState({
                                loginUser: event.target.value
                            })
                        }}
                        style="username"
                    />

                    <InputField
                        placeholder={"Password"}
                        type={"password"}
                        onChange = { (event) => {
                            this.setState({
                                loginPassword : event.target.value
                            })
                        }}
                        style="password"
                    />
                    <Button
                        btnText={"Login"}
                        onClick = {this.validateAndLoginUser.bind(this)}
                    />
                </div>
            </div>
        );

    }
}

const mapStateToProps = state => {
    return {
        login: state.login
    }
};

export default withRouter(connect(mapStateToProps)(Login));