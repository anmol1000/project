import React, {Component} from 'react';
import { Button } from "../containers/Button";
import {InputField} from "../containers/Input";
import { loginUser, loginUserSuccess, loginUserFailure } from '../../actions/login';
import {connect} from "react-redux";
import { withRouter } from "react-router-dom";
import Dialog from 'react-dialog'
import './styles/Login.css'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginUser:'',
            loginPassword:'',
            isSignUpDialogOpen: false
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
                { this.state.isSignUpDialogOpen &&

                    <div className="signUpContainer">
                        <Dialog>

                        </Dialog>
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