import React, { Component } from 'react';
import logo from '../images/logo.svg';
import './App.css';
import { handleInitialData } from '../actions/shared'
import {connect} from 'react-redux';
import Dashboard from "./Dashboard";
import { Drawer, DrawerHeader, DrawerContent } from 'rmwc/Drawer';
import { CONST_All_Questions, CONST_ANSWERED_ONLY, CONST_UNANSWERED_ONLY } from "./Dashboard";
import { List, ListItem, ListItemText } from 'rmwc/List';
import {Col, Grid, Row} from "react-flexbox-grid";

class App extends Component {



  componentDidMount(){
    /* When this component mounts get the data */
      this.props.dispatch(handleInitialData())
  }
  render() {
    return (
        <Grid fluid>
            <Row>
                <Col xs={3} md={3}>
                    <Drawer permanent>
                        <DrawerHeader>
                            Menu
                        </DrawerHeader>
                        <DrawerContent>
                            <ListItem>
                              <ListItemText>Home</ListItemText>
                            </ListItem>
                            <ListItem>
                              <ListItemText>Answered</ListItemText>
                            </ListItem>
                            <ListItem>
                              <ListItemText>Unanswered</ListItemText>
                            </ListItem>
                            <ListItem>
                              <ListItemText>All Questions</ListItemText>
                            </ListItem>
                        </DrawerContent>
                    </Drawer>
                </Col>
                <Col xs={7} md={7}>
                        {
                            this.props.loading === true
                                ? null
                                :  <Dashboard mode = {CONST_ANSWERED_ONLY}/>
                        }
                </Col>
            </Row>
        </Grid>

    );
  }
}

function mapStateToProps({authedUser}){
   return {
       loading: authedUser === null,
   }
}

export default connect(mapStateToProps)(App);
