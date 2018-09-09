import React, { Component } from 'react';
import {connect} from 'react-redux';
import { handleAddAnswer } from "../actions/shared";
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Link, withRouter } from "react-router-dom"
import NoMatch from "./NoMatch"
const CONST_UNANSWERED = "CONST_UNANSWERED";
const CONST_ANSWERED = "CONST_ANSWERED";
export const CONST_DETAILS_MODE = "CONST_DETAILS_MODE";
export const CONST_NORMAL_MODE = "CONST_NORMAL_MODE";

class QuestionCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentMode: CONST_UNANSWERED
        };

        const { currentUser, id } = this.props;


        // If the current user has already answered the question then return answered
        // Another possibility is that this Question Card is in Details Mode
        if (this.props.mode === CONST_DETAILS_MODE ||
            Object.keys(currentUser.answers).indexOf(id) > -1){
            this.state.currentMode = CONST_ANSWERED;
        }

    }

  render() {
         // This occurs if the user requests a url with question id that does not make sense
        if (this.props.question === null){
            return <NoMatch/>
        }
        const { currentMode } = this.state;
        const { id, author } = this.props;
        const authorName = author.name;
        const authorURL = author.avatarURL;
        return (
            <Link
                className = "question"
                to = {`/questions/${id}`}>
                 <Grid fluid>
                    <Row>
                        <Col xs={4} md={4}>
                            { this.authorInfo(authorName, authorURL) }
                        </Col>
                        <Col xs={1} md={1}></Col>
                        <Col xs={7} md={7}>
                               <form>
                                    <fieldset>
                                        <legend>What would you rather do?</legend>
                                            {
                                                currentMode ===  CONST_UNANSWERED
                                                    ? this.Case2Unanswered() // CASE 1: The question is unanswered by the authorized user
                                                    :  this.Case1Answered()// CASE 2: The question is answered so just display the results
                                            }
                                    </fieldset>
                                </form>
                        </Col>
                    </Row>
                  </Grid>
            </Link>

        );
  }

  authorInfo(authorName, authorURL){
        /* Returns info of the author */

    return(
        <Grid fluid>
            <Row>
                {authorName}
            </Row>
            <Row>
                <img
                    src={authorURL}
                    alt={`Avatar of ${authorName}`}
                    className='avatar'
                />
            </Row>
        </Grid>
    )

  }

  Case2Unanswered(){
        /* returns the component parts for when a case is unanswered */
        const { id, question } = this.props;
        return (
            <div>
                <div className='pollVote'>
                    <input
                        type="radio"
                        id={`radio-button-choice-one-${id}`}
                        name={`radio-button-name-${id}`}
                        onChange = {() => this.handleSelection("optionOne")}
                    />
                    <label htmlFor="optionOne">{question.optionOne.text}</label>
                </div>
                <div className='pollVote'>
                    <input
                        type="radio"
                        id={`radio-button-choice-two-${id}`}
                        name={`radio-button-name-${id}`}
                        onChange = {() => this.handleSelection("optionTwo")}/>
                    <label htmlFor="optionTwo">{question.optionTwo.text}</label>
                </div>
            </div>
        )
  }

  Case1Answered(){
        /* returns the component parts for when a case is answered */
        const { question, currentUser, id } = this.props;

        // We need the number of people who answered for each option
        const optionOneCount = question.optionOne.votes.length;
        const optionTwoCount = question.optionTwo.votes.length;
        const totalCount = optionOneCount + optionTwoCount;
        // We need the percentage of people who voted for each option
        let optionOnePercent = 0;
        let optionTwoPercent = 0;
        if (totalCount !== 0){
            optionOnePercent = Math.round((optionOneCount/totalCount)*100);
            optionTwoPercent = Math.round((optionTwoCount/totalCount)*100);
        }

        let stringOneCount = optionOneCount + " friends voted for this option";
        if (optionOneCount === 1){stringOneCount = stringOneCount.replace("friends", "friend")}
        let stringTwoCount = optionTwoCount + " friends voted for this option";
        if (optionTwoCount === 1){stringTwoCount = stringTwoCount.replace("friends", "friend")}
        const stringOnePercent = optionOnePercent + "% voted for this option";
        const stringTwoPercent = optionTwoPercent + "% voted for this option";

        // Finally we need to indicate to the user which one he chose
        let stringChoseOne = "";
        let StringChosenTwo = "";
        const answerChosen =  currentUser["answers"][id];
        if (answerChosen !== undefined){
            const choseOptionOne = answerChosen === "optionOne";
            if (choseOptionOne){ stringChoseOne = "You chose this answer."}
            else {StringChosenTwo = "You chose this answer"}
        }


        return (
           <div>
               <div className='pollDetail'>
                <label htmlFor="optionOne">{question.optionOne.text}</label>
                 <br/>
                 <div className='pollDetailFont'> { stringOneCount }</div>
                 <div className='pollDetailFont'> { stringOnePercent }</div>
                 <div className='pollDetailFont'> { stringChoseOne }</div>
                </div>

                <div className='pollDetail'>
                    <label htmlFor="optionTwo">{question.optionTwo.text}</label>
                    <br/>
                    <div className='pollDetailFont'> { stringTwoCount }</div>
                    <div className='pollDetailFont'> { stringTwoPercent }</div>
                    <div className='pollDetailFont'> { StringChosenTwo }</div>
                </div>
           </div>
        )
  }

  handleSelection(answer) {
      const {dispatch, id} = this.props;
      dispatch(handleAddAnswer(id, answer));
      this.setState({currentMode: CONST_ANSWERED});
  }
}

function mapStateToProps({ questions, users, authedUser}, props){
    let verifiedID = props.id;
    // CASE 0: id is undefined then we are viewing one question only and the id needs to come from url
    if (verifiedID === undefined){
        verifiedID = props.match.params.id; // this gets the id from the url since it's formatted id:alksjdlskajd92j
    }
    let question;
    let author;
    if (questions[verifiedID] == undefined){ question = null; author = null; }
    else {
        question = questions[verifiedID];
        author = users[question.author];
    }


    return {
        question: question,
        currentUser: users[authedUser]
            ? users[authedUser]
            : null,
        authedUser,
        author: author,
        id: verifiedID

    }


}
export default withRouter(connect(mapStateToProps)(QuestionCard));
