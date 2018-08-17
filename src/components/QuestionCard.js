import React, { Component } from 'react';
import {connect} from 'react-redux';

class QuestionCard extends Component {



  render() {
    return (
        <div>
            <div> Question Card </div>
        </div>
    );
  }


}
function mapStateToProps({authUser, users, questions} , {id}){
    const tweet = tweets[id];
    const parentTweet = tweet ? tweets[tweet.replyingTo] : null; // if Tweet exists then get replyingTo otherwise just make it null
    return {
        authedUser,
        tweet: tweet // if tweet exists then return otherwise just return null
            ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
            : null
    }

}
export default connect()(QuestionCard);
