import React, {Component} from 'react';
import './App.css';
import Login from './components/layout/Login';
import Home from './components/layout/Home';
import {BrowserRouter, Route} from "react-router-dom";
import Provider from "react-redux/es/components/Provider";
import store from "./store/store";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div>
                        <Route exact path="/" component={Login} />
                        <Route path="/home" component={Home} />
                    </div>
                </BrowserRouter>
            </Provider>
    );

    }
}

export default App;