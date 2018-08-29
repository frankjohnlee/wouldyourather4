import React, { Component } from 'react';
import {connect} from 'react-redux';
import { handleAddAnswer } from "../actions/questions";

const CONST_UNANSWERED = "CONST_UNANSWERED";
const CONST_ANSWERED = "CONST_ANSWERED";

class QuestionCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentMode: CONST_UNANSWERED
        };

        const { currentUser, id } = this.props.currentUser;
        if (currentUser !== undefined){

            const alreadyVoted = currentUser.questions.indexOf(id) > -1;
            if (alreadyVoted){ this.state.currentMode = CONST_ANSWERED;}
            else { this.state.currentMode = CONST_UNANSWERED;}


        }

    }

  render() {
        const { currentMode } = this.state;
        return (
            <div className = "question">
                {
                    currentMode ===  CONST_UNANSWERED
                        ? this.Case1Answered() // CASE 1: The question is unanswered by the authorized user
                        : this.Case2UnAnswered() // CASE 2: The question is answered so just display the results
                }
            </div>

        );
  }

  Case1Answered(){
        /* returns the component parts for when a case is answered */
        const { id, question} = this.props;

        return (
            <form>
                <fieldset>
                        <legend>What would you rather do?</legend>

                        <div>
                            <input
                                type="radio"
                                id={`radio-button-choice-one-${id}`}
                                name={`radio-button-name-${id}`}
                                onChange = {() => this.handleSelection("optionOne")}
                            />
                            <label htmlFor="optionOne">{question.optionOne.text}</label>
                        </div>

                        <div>
                            <input
                                type="radio"
                                id={`radio-button-choice-two-${id}`}
                                name={`radio-button-name-${id}`}
                                onChange = {() => this.handleSelection("optionTwo")}/>
                            <label htmlFor="optionTwo">{question.optionTwo.text}</label>
                        </div>
                </fieldset>
            </form>
        )
  }

  Case2UnAnswered(){
        /* returns the component parts for when a case is not answered */
        const { id, currentUser, question, authedUser } = this.props;
        return (
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
        )
  }

  handleSelection(answer) {
      const {dispatch, id} = this.props;
      dispatch(handleAddAnswer(id, answer));
      this.setState({currentMode: CONST_ANSWERED});
  }
}

function mapStateToProps({ questions, users, authedUser}, {id}){
    return {
        question: questions[id],
        currentUser: users[authedUser]
            ? users[authedUser]
            : null,
        authedUser,

    }


}
export default connect(mapStateToProps)(QuestionCard);
