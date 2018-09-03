import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Card, CardMedia, CardPrimaryAction, CardMediaContent} from 'rmwc/Card';
import { Typography } from 'rmwc/Typography';
import {Link, NavLink, withRouter} from "react-router-dom";
import { authedUser } from "../reducers/authedUser";
import { setAuthedUser } from "../actions/authedUser";
import {Col, Grid, Row} from "react-flexbox-grid";
import { Button, ButtonIcon } from 'rmwc/Button';
import { addNewQuestion } from "../actions/questions";

class CreateQuestion extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            question: "",
            optionOne: "",
            optionTwo: ""
        }

    }
    render(){
        const { question, optionOne, optionTwo } = this.state;
        return (
            <div>
                <center>
                <div>

                 <h3> Create Question in the format of would you rather </h3>
                 <textarea
                    placeholder= "The first option here"
                    value = {optionOne}
                    onChange = {this.handleOptionOneChange}
                    className = 'textarea'
                />
                                 <textarea
                    placeholder= "The second option here"
                    value = {optionTwo}
                    onChange = {this.handleOptionTwoChange}
                    className = 'textarea'
                />


                </div>
                <div>
                    <br/><br/>
                    <Button outlined
                     onClick = {() => this.handleSubmit()}>
                        Add Question
                    </Button>
                </div>
                </center>
            </div>

        )
    }
    handleSubmit(){
        addNewQuestion(this.state.optionOne, this.state.optionTwo);
    }


    handleOptionOneChange = (e) => {
        const text = e.target.value;
        this.setState({optionOne: text})
    };
    handleOptionTwoChange = (e) => {
        const text = e.target.value;
        this.setState({optionTwo: text})
    }


};

function mapStateToProps({users, authedUser}){
   return {
       users, authedUser
   }
}
export default connect(mapStateToProps)(CreateQuestion);