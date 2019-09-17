import React, {Component} from 'react';
import { Button } from "../containers/Button";
import {InputField} from "../containers/Input";
import { loginUser, signUpUser } from '../../actions/login';
import {connect} from "react-redux";
import { withRouter } from "react-router-dom";
import Modal from 'react-modal';
import './styles/Login.css'
import actionTypes from "../../constants/actionTypes";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signUpUser:'',
            signUpPassword:'',
            loginUser:'',
            loginPassword:''
        }
    }

    validateAndLoginUser(){
        this.props.dispatch(loginUser(this.state.loginUser, this.state.loginPassword));
    }
    showSignUpDialog() {
        this.props.dispatch(this.props.dispatch({
            type:actionTypes.SIGNUP_USER_SHOW_DIALOG
        }))
    }

    signingUpUser() {
        this.props.dispatch(signUpUser(this.state.signUpUser, this.state.signUpPassword));
    }
    hideSignUpDialog(){
        this.props.dispatch(this.props.dispatch({
            type:actionTypes.SIGNUP_USER_HIDE_DIALOG
        }))
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
                        className="loginButton"
                    />
                    <Button
                        btnText={"SignUp"}
                        onClick = {this.showSignUpDialog.bind(this)}
                        className="signUpButton"
                    />
                </div>
                { this.props.login.showSignUpPage &&

                    <div className="signUpContainer">
                        <Modal
                            isOpen={ this.props.login.showSignUpPage}
                            onRequestClose={this.hideSignUpDialog.bind(this)}
                            className="signUpModal"
                        >
                            <InputField
                                placeholder={"Username"}
                                onChange = { (event) => {
                                    this.setState({
                                        signUpUser: event.target.value
                                    })
                                }}
                                style="username"
                            />

                            <InputField
                                placeholder={"Password"}
                                type={"password"}
                                onChange = { (event) => {
                                    this.setState({
                                        signUpPassword : event.target.value
                                    })
                                }}
                                style="password"
                            />

                            <Button
                                btnText={"SignUp"}
                                onClick = {this.signingUpUser.bind(this)}
                            />
                        </Modal>
                    </div>
                }
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