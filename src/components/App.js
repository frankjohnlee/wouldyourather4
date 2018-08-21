import React, { Component } from 'react';
import logo from '../images/logo.svg';
import './App.css';
import { handleInitialData } from '../actions/shared'
import {connect} from 'react-redux';
import Dashboard from "./Dashboard";

class App extends Component {


  componentDidMount(){
    /* When this component mounts get the data */
      this.props.dispatch(handleInitialData())
  }
  render() {
    return (
        <div>
            {
                this.props.loading === true
                    ? null
                    :  <Dashboard />
            }
        </div>
    );
  }
}

function mapStateToProps({authedUser}){
   return {
       loading: authedUser === null,
   }
}

export default connect(mapStateToProps)(App);
