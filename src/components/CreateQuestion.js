import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from "react-router-dom";
import {Button} from 'rmwc/Button';
import {addNewQuestion} from "../actions/questions";
import TextField, {HelperText, Input} from '@material/react-text-field';
import {Snackbar} from "rmwc/Snackbar";

class CreateQuestion extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            optionOne: "",
            optionTwo: "",
            snackbarStartIsOpen: false,
            snackbarMessage: "Sorry you can't leave any option empty!"
        }

    }
    render(){
        const {  optionOne, optionTwo } = this.state;
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
                            <Button outlined
                             onClick = {(e) => this.handleSubmit(e)}>
                                Add Question
                            </Button>

                </div>
                </center>
                <Snackbar
                  show={this.state.snackbarStartIsOpen}
                  onHide={evt => this.setState({snackbarStartIsOpen: false})}
                  message={this.state.snackbarMessage}
                  actionText="Dismiss"
                  actionHandler={() => {}}
                  alignStart
                />

            </div>

        )
    }
    handleSubmit(e){
        e.preventDefault();
        if (this.state.optionOne === "" || this.state.optionTwo === ""){
            this.setState({snackbarStartIsOpen: true })
        }
        else {
            this.props.dispatch(addNewQuestion(this.state.optionOne, this.state.optionTwo));
            this.props.history.push("/")
        }

        this.setState({
            optionOne: "",
            optionTwo: "",
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