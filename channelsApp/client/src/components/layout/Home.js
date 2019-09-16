import React, {Component} from 'react';
import { InputField } from "../containers/Input";
import {connect} from "react-redux";
import { withRouter } from "react-router-dom";
import {channelSelectedOnClick, fetchJoinedChannels, userCommented} from '../../actions/channel';
import './styles/Home.css'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentText:''
        }
    }

    UNSAFE_componentWillMount(){
        this.props.dispatch(fetchJoinedChannels(this.props.login.loggedInUser))
    }
    selectChannel(selectedChannel) {
        this.props.dispatch(channelSelectedOnClick(selectedChannel))
    }
    userAddedComment(){
        var commentText = this.state.commentText;
        this.setState({ commentText:'' }, () => {
            this.props.dispatch(
                userCommented(commentText, this.props.channel.selectedChannel, this.props.login.loggedInUser));
        });

    }
    render() {
        const { login, channel } = this.props;
        const userChannels = channel.joinedChannels.map((joinedChannel) => {
            return(
                <div onClick={this.selectChannel.bind(this, joinedChannel)} className="channelBox">
                    {joinedChannel.name}
                </div>
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
            <div className="channelBody">
                <div className="channelContainer">
                    <div className="channelLabel">
                        Joined Channels
                    </div>
                    <div className="channelListContainer">
                        {userChannels}
                    </div>
                </div>
                <div className="commentContainer">
                    {this.props.channel.selectedChannel &&
                        <div className="commentLabel">
                            {this.props.channel.selectedChannel.name}
                        </div>
                    }
                    <div>
                        {userComments}
                    </div>

                    <InputField
                        placeholder={"Type your text here"}
                        onChange = { (event) => {
                            this.setState({
                                commentText: event.target.value
                            })
                        }}
                        onKeyPress={event => {
                            if (event.key === 'Enter'){
                                this.userAddedComment();
                            }
                        }}
                        style="username"
                    />

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