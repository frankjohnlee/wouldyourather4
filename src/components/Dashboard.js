import React, { Component } from 'react';
import {connect} from 'react-redux';
import QuestionCard from "./QuestionCard";
import { CONST_DETAILS_MODE, CONST_NORMAL_MODE } from "./QuestionCard";
import { Grid, Row, Col } from 'react-flexbox-grid';
class Dashboard extends Component {



  render() {
    return (
        <div>
            <h3 className = 'center'> Would You Rather </h3>
            <ul className= 'dashboard-list'>
                {
                    this.props.questionIds.map((id) =>
                        <li key = {id}>
                            <QuestionCard
                                mode = { CONST_NORMAL_MODE}
                                key = {`QuestionCard ${id}`} id = {id}/>
                        </li>
                    )
                }
            </ul>
        </div>
    );
  }


}
function mapStateToProps({ questions }){
    return {
        questionIds: Object.keys(questions)
            .sort((a,b) => questions[a].timestamp - questions[b].timestamp)
    }

}
export default connect(mapStateToProps)(Dashboard);
