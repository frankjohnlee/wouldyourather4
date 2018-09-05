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
import { Snackbar } from 'rmwc/Snackbar';
import TextField, {HelperText, Input} from '@material/react-text-field';

class CreateQuestion extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            question: "",
            optionOne: "",
            optionTwo: "",
            snackbarStartIsOpen: false
        }

    }
    render(){
        const { question, optionOne, optionTwo } = this.state;
        return (
            <div>
                <center>
                <div>

                 <h3> Create Question in the format of would you rather </h3>
                <TextField
                  label='Option 1'
                  helperText={<HelperText>Type something for the first option</HelperText>}>
                  <Input
                    value = {optionOne}
                     onChange = {this.handleOptionOneChange}/>
                </TextField>
                 <TextField
                  label='Option 2'
                  helperText={<HelperText>Type something for the second option</HelperText>}>
                  <Input
                    value = {optionTwo}
                      onChange = {this.handleOptionTwoChange}/>
                </TextField>

                </div>
                <div>
                    <br/><br/>
                        <NavLink to={"/"}>
                            <Button outlined
                             onClick = {() => this.handleSubmit()}>
                                Add Question
                            </Button>
                        </NavLink>
                </div>
                </center>
                <Snackbar
                  show={this.state.snackbarStartIsOpen}
                  onHide={evt => this.setState({snackbarStartIsOpen: false})}
                  message="Your question was successfully created!"
                  actionText="Dismiss"
                  actionHandler={() => {}}
                  alignStart
                />
            </div>

        )
    }
    handleSubmit(){
        this.props.dispatch(addNewQuestion(this.state.optionOne, this.state.optionTwo));
        this.props.reloadData();
        this.setState({
            question: "",
            optionOne: "",
            optionTwo: "",
            snackbarStartIsOpen: true
        })
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