import React, { Component } from 'react';
import logo from '../images/logo.svg';
import './App.css';
import { handleInitialData } from '../actions/shared'
import {connect} from 'react-redux';
import Dashboard from "./Dashboard";
import {
  Drawer,
  DrawerHeader,
  DrawerContent
} from 'rmwc/Drawer';

import {
  List,
  ListItem,
  ListItemText
} from 'rmwc/List';
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
                            Navigation Bar
                        </DrawerHeader>
                        <DrawerContent>
                            <ListItem>
                              <ListItemText>Cookies</ListItemText>
                            </ListItem>
                            <ListItem>
                              <ListItemText>Pizza</ListItemText>
                            </ListItem>
                            <ListItem>
                              <ListItemText>Icecream</ListItemText>
                            </ListItem>
                        </DrawerContent>
                    </Drawer>
                </Col>
                <Col xs={7} md={7}>

                    <Dashboard />

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
