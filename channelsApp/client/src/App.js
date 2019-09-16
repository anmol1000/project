import React, {Component} from 'react';
import Login from './components/layout/Login';
import Home from './components/layout/Home';
import {Router, Route} from "react-router-dom";
import Provider from "react-redux/es/components/Provider";
import store from "./store/store";
import history from './history';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router  history={history}>
                    <Route exact path="/" component={Login} />
                    <Route path="/home" component={Home} />
                </Router>
            </Provider>
    );

    }
}

export default App;