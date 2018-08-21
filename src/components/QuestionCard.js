import React, { Component } from 'react';
import {connect} from 'react-redux';

const CONST_UNANSWERED = "CONST_UNANSWERED";
const CONST_ANSWERED = "CONST_ANSWERED";

class QuestionCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentMode: CONST_UNANSWERED
        }
    }

  render() {
      console.log("QuesitonCard this.props", this.props);
      console.log("QuestionCard this.state", this.state);
      const { id, currentUser, question, authedUser } = this.props;
      if (currentUser === null){
         this.state.currentMode = CONST_UNANSWERED;
      }
      else {

          const alreadyVoted = currentUser["questions"].indexOf(id) > -1;
          if (alreadyVoted){
              this.state.currentMode = CONST_ANSWERED;
          }
          else {
              this.state.currentMode = "CONST_UNANSWERED";
          }
      }

      const { currentMode } = this.state;
    return (
        <container className = "question">
            {
                currentMode ===  "CONST_UNANSWERED"
                    ? // CASE 1: The question is unaswered by the authorized user
                    <form>
                        <fieldset>
                            <legend>What would you rather do?</legend>

                            <div>
                                <input
                                    type="radio"
                                    id={`radio-button-choice-one-${id}`}
                                    name={`radio-button-name-${id}`}
                                    onChange = {() => this.handleSelection(1)}
                                />
                                <label htmlFor="optionOne">{question.optionOne.text}</label>
                            </div>

                            <div>
                                <input
                                    type="radio"
                                    id={`radio-button-choice-two-${id}`}
                                    name={`radio-button-name-${id}`}
                                    onChange = {() => this.handleSelection(2)}/>
                                <label htmlFor="optionTwo">{question.optionTwo.text}</label>
                            </div>

                        </fieldset>
                    </form>


                    : // CASE 2: The question is answered so just display the results
                         <form>
                        <fieldset>
                            <legend>What would you rather do?</legend>

                            <div>
                                <label htmlFor="optionOne">{question.optionOne.text}</label>
                            </div>

                            <div>
                                <label htmlFor="optionTwo">{question.optionTwo.text}</label>
                            </div>

                        </fieldset>
                    </form>
            }
        </container>

    );
  }

  handleSelection(optionInt){
        // console.log("handle selection", optionInt);
  }

}

function mapStateToProps({ questions, users, authedUser}, {id}){
    console.log("mapStateToProps id", id);
    return {
        question: questions[id],
        currentUser: users[authedUser]
            ? users[authedUser]
            : null,
        authedUser,

    }


}
export default connect(mapStateToProps)(QuestionCard);
