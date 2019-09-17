import React, {Component} from 'react';
import { InputField } from "../containers/Input";
import {connect} from "react-redux";
import { withRouter } from "react-router-dom";
import Modal from 'react-modal';
import {
    channelSelectedOnClick,
    fetchJoinedChannels,
    userCommented,
    fetchUnjoinedChannels,
    fetchAddChannel,
    postJoinChannel
} from '../../actions/channel';
import './styles/Home.css'
import {Button} from "../containers/Button";
import actionTypes from "../../constants/actionTypes";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentText:'',
            channelName:''
        }
    }

    UNSAFE_componentWillMount(){
        this.props.dispatch(fetchJoinedChannels(this.props.login.loggedInUser))
    }

    selectChannel(selectedChannel) {
        this.props.dispatch(channelSelectedOnClick(selectedChannel))
    }

    joinChannelOnClick(selectedChannel){
        this.props.dispatch(postJoinChannel({
            userName: this.props.login.loggedInUser.username,
            channelName: selectedChannel.name
        }))

    }
    showAddChannelDialog(){
        this.props.dispatch({
            type:actionTypes.SHOW_ADD_CHANNEL_DIALOG
        })
    }

    userAddedComment() {
        var commentText = this.state.commentText;
        this.setState({ commentText:"" }, () => {
            this.props.dispatch(
                userCommented(commentText, this.props.channel.selectedChannel, this.props.login.loggedInUser));
        });
    }

    joinChannel() {
        this.props.dispatch(fetchUnjoinedChannels(this.props.login.loggedInUser));
    }

    addChannel(channelName) {
        this.props.dispatch(fetchAddChannel(this.props.login.loggedInUser, channelName));
    }

    render() {
        const { login, channel } = this.props;
        console.log("This.props", this.props);
        const userChannels = channel.joinedChannels.map((joinedChannel) => {
            var styleName = "channelBox";
            if (joinedChannel.name === channel.selectedChannel.name){
                styleName = "channelBoxSelected"
            }
            return(
                <div onClick={this.selectChannel.bind(this, joinedChannel)} className={styleName}>
                    {joinedChannel.name}
                </div>
            );
        });
        const notJoinedUserChannels = channel.unjoinedChannels.map((unjoinedChannel) => {
            return(
                <div onClick={this.joinChannelOnClick.bind(this, unjoinedChannel)} className="channelBox">
                    {unjoinedChannel.name}
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
                    <div className="channelLabelContainer">
                        <div className="channelLabel">
                            Channels
                        </div>
                        <div className="joinChannelLabel" onClick={this.joinChannel.bind(this)}>
                            Join Channel
                        </div>
                        <div className="joinChannelLabel" onClick={this.showAddChannelDialog.bind(this)}>
                            Add Channel
                        </div>
                        { this.props.channel.openCreateChannelDialog &&
                            <div className="addChannelContainer">
                                <Modal
                                    isOpen={ this.props.channel.openCreateChannelDialog}
                                    className="signUpModal"
                                >
                                    <InputField
                                        placeholder={"Channel Name"}
                                        onChange = { (event) => {
                                            this.setState({
                                                channelName: event.target.value
                                            })
                                        }}
                                        style="username"
                                    />

                                    <Button
                                        btnText={"Add Channel"}
                                        onClick = {this.addChannel.bind(this, this.state.channelName)}
                                    />
                                </Modal>
                            </div>
                        }
                        { this.props.channel.openJoinChannelDialog &&
                            <Modal
                                isOpen={ this.props.channel.openJoinChannelDialog}
                                className="signUpModal">
                                {notJoinedUserChannels}
                            </Modal>
                        }
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
                        value={this.state.commentText}
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