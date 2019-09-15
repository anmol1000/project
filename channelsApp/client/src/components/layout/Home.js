import React, {Component} from 'react';
import {connect} from "react-redux";
import { withRouter } from "react-router-dom";
import {channelSelectedOnClick, fetchJoinedChannels} from '../../actions/channel';
import './styles/Home.css'

class Home extends Component {
    constructor(props) {
        super(props);
    }

    UNSAFE_componentWillMount(){
        this.props.dispatch(fetchJoinedChannels(this.props.login.loggedInUser))
    }
    selectChannel(selectedChannel) {
        this.props.dispatch(channelSelectedOnClick(selectedChannel))
    }
    render() {
        const { login, channel } = this.props;
        const userChannels = channel.joinedChannels.map((joinedChannel) => {
            return(
                <li onClick={this.selectChannel.bind(this, joinedChannel)} className="channelBox">
                    {joinedChannel.name}
                </li>
            );
        });
        const userComments = channel.commentsForSelectedChannel.map((channelComment) => {
            return(
                <li className="channelBox">
                    {channelComment.text}
                </li>
            );
        });
        return (
            <div className="body">
                <div className="channelContainer">
                    <ol >
                        {userChannels}
                    </ol>
                </div>
                <div className="commentContainer">
                    {userComments}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        login: state.login,
        channel: state.channel
    }
};

export default withRouter(connect(mapStateToProps)(Home));