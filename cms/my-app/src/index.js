import React from 'react';
import {Helmet} from 'react-helmet';
import ReactDOM from 'react-dom';
import './index.css'

class UserName extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        };
    }
    render() {
        return(
            <input className="username" type = "email" placeholder="Email Address" value={this.state.value} />
        );
    }
}
class Password extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }
    render(){
        return(
            <input className="password" type = "password" placeholder="Password" value={this.state.value} />
        );
    }
}

class SubmitButton extends React.Component{
    constructor(props){
        super(props)
    }
    submitLoginCredentials(){
        alert("submitting details")
    }
    render(){
        return(
            <button className="submitButton" onClick={this.submitLoginCredentials.bind(this)}>
                Log In
            </button>
        );
    }
}

class LoginPage extends  React.Component {
    renderUsername(){
        return <UserName />
    }
    renderPassword(){
        return <Password />
    }
    renderSubmitBox(){
        return <SubmitButton/>
    }
    render(){
        return (
            <main>
                <section id="login-step-wrapper">
                    <div className="login-step-login-form">
                        <div class = "login-step-header">
                            <div className="login-callout-wrapper">
                                <h1 id="login-callout"> Log In To Test  System</h1>
                            </div>
                        </div>
                    </div>

                    <div className="login-form-wrapper">
                        <div className="loginBody">
                            <Helmet>
                                <style>{'body { background-color: #0d83dd; }'}</style>
                            </Helmet>
                            {this.renderUsername()}
                            {this.renderPassword()}
                            {this.renderSubmitBox()}
                        </div>
                    </div>
                </section>

            </main>

        );
    }
}



// render(){
//     return (
//         <div>
//             <p className="username" > Username</p>
//             < input
//                 type = "text" value={this.state.value} onChange={this.handleChange.bind(this)}/>
//         </div>
//     );
// }
ReactDOM.render(
    <LoginPage />,
    document.getElementById('root')
);
