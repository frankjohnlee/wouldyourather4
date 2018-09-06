import React, { Component } from 'react';
import {Col, Grid, Row} from "react-flexbox-grid";
import QuestionList, {CONST_ANSWERED_ONLY, CONST_UNANSWERED_ONLY} from "./QuestionList";
import connect from "react-redux/es/connect/connect";

class AnsweredAndUnAnswered extends Component {

    render(){

         return (
             <Grid fluid>
                    <Row>
                        <Col xs={6} md={6}>
                            <center><h3>Unanswered Polls</h3></center>
                           <QuestionList mode = { CONST_UNANSWERED_ONLY }/>
                        </Col>
                        <Col xs={6} md={6}>
                            <center><h3>Answered Polls</h3></center>
                            <QuestionList mode = { CONST_ANSWERED_ONLY }/>
                        </Col>
                    </Row>
             </Grid>
        )
    }
}


export default connect()(AnsweredAndUnAnswered);