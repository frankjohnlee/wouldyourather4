import React, { Component } from 'react';
import {Col, Grid, Row} from "react-flexbox-grid";
import QuestionListAnswered from "./QuestionListAnswered";
import QuestionListUnanswered from "./QuestionListUnanswered"
import connect from "react-redux/es/connect/connect";

class AnsweredAndUnAnswered extends Component {

    render(){

         return (
             <Grid fluid>
                    <Row>
                        <Col xs={6} md={6}>
                            <center><h3>Unanswered Polls</h3></center>
                           <QuestionListUnanswered/>
                        </Col>
                        <Col xs={6} md={6}>
                            <center><h3>Answered Polls</h3></center>
                            <QuestionListAnswered/>
                        </Col>
                    </Row>
             </Grid>
        )
    }
}


export default connect()(AnsweredAndUnAnswered);