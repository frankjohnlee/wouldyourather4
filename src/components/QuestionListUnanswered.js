import React, {Component} from 'react';
import {connect} from 'react-redux';
import QuestionCard, {CONST_NORMAL_MODE} from "./QuestionCard";


class QuestionListUnanswered extends Component {

    render() {
        return (
            <div>
                <ul className= 'dashboard-list'>
                    {
                        this.props.questionIds.map((id) =>
                            <li key = {id}>
                                <QuestionCard
                                    mode = { CONST_NORMAL_MODE}
                                    key = {`QuestionCard ${id}`}
                                    id = {id}/>
                            </li>
                        )
                    }
                </ul>
            </div>
        );
  }


}
function mapStateToProps({ questions, users, authedUser }){
    const currentUser = users[authedUser];
    const answeredObject = currentUser.answers;
    const answeredListKeys = Object.keys(answeredObject);
    const questionIdsList =  Object.keys(questions)
        .filter((id) => (answeredListKeys.indexOf(id) === -1))
        .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

    return {
        questionIds: questionIdsList
    }

}
export default connect(mapStateToProps)(QuestionListUnanswered);
