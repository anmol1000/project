import React, {Component} from 'react';
import {connect} from "react-redux";
import { withRouter } from "react-router-dom";



class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                // Divide Panels into two parts. First Part should return list of channels.
                //Right part should return messages to selected panels
                //
            </div>
        );

    }
}

const mapStateToProps = state => {
    return {
        login: state.login
    }
};

export default withRouter(connect(mapStateToProps)(Home));