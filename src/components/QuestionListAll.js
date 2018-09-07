import React, {Component} from 'react';
import {connect} from 'react-redux';
import QuestionCard, {CONST_NORMAL_MODE} from "./QuestionCard";


class QuestionListAll extends Component {

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

    return {
        questionIds: Object.keys(questions)
            .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
        currentUser: users[authedUser],
    }

}
export default connect(mapStateToProps)(QuestionListAll);
