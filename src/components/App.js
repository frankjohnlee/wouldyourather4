import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom'
import { List, ListItem, ListItemGraphic,  ListItemMeta, ListItemText,  ListGroup, ListDivider } from 'rmwc/List';
import { handleInitialData } from '../actions/shared'
import {connect} from 'react-redux';
import Dashboard from "./QuestionList";
import { Drawer, DrawerHeader, DrawerContent, DrawerTitle, DrawerSubtitle, DrawerAppContent} from 'rmwc/Drawer';
import {Col, Grid, Row} from "react-flexbox-grid";
import { CONST_All_Questions, CONST_ANSWERED_ONLY, CONST_UNANSWERED_ONLY } from "./QuestionList";
import './App.css';
import QuestionCard from "./QuestionCard"
import {Toolbar, ToolbarRow, ToolbarSection, ToolbarTitle, ToolbarMenuIcon, ToolbarIcon, ToolbarFixedAdjust} from 'rmwc/Toolbar';
import { Card } from 'rmwc/Card'
import MaterialIcon from '@material/react-material-icon';
import Login from './Login'
import CreateQuestion from './CreateQuestion'
class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            dismissibleOpen: true
        }
    }


  componentDidMount(){
    /* When this component mounts get the data */
      this.props.dispatch(handleInitialData())
  }
  render() {
    const { name, authedUser } = this.props;
    let loginText = "Logout";
    if (authedUser === null){
       loginText = "Login"
    }

    return (
        <Router>
            <div>
            <Toolbar >
                      <ToolbarRow>
                            <ToolbarSection alignStart>
                                  <ToolbarMenuIcon icon="comment"/>
                                <ToolbarTitle>Would You Rather</ToolbarTitle>
                             </ToolbarSection>
                             <ToolbarSection alignEnd>
                                   <ToolbarMenuIcon icon="how_to_reg"/>
                                 <ToolbarTitle>{ name } </ToolbarTitle>

                             </ToolbarSection>
                        </ToolbarRow>

                </Toolbar>
                <ToolbarFixedAdjust />
            <Grid fluid>
                <Row>
                    <Col xs={3} md={3}>
                        <Card>
                        <DrawerContent>
                                <ListDivider />
                                <NavLink to={'/'}  >
                                    <ListItem>
                                           <ListItemGraphic icon="home"/>
                                            Home
                                    </ListItem>
                                </NavLink>
                                <ListDivider />
                                <NavLink to={'answered'}  >
                                    <ListItem>
                                        <ListItemGraphic icon="favorite"/>
                                          Answered
                                    </ListItem>
                                </NavLink>
                                <ListDivider />
                                <NavLink to = {'/unanswered'}>
                                    <ListItem>
                                        <ListItemGraphic icon = "favorite_border"/>
                                        Unanswered
                                    </ListItem>
                                </NavLink>
                                <ListDivider />
                                <NavLink to={'/all'}>
                                    <ListItem>
                                        <ListItemGraphic icon = "group_work"/>
                                        All
                                    </ListItem>
                                </NavLink>
                                <ListDivider />
                                <NavLink to={'/create'}>
                                     <ListItem>
                                        <ListItemGraphic icon = "add"/>
                                        New Question
                                    </ListItem>
                                </NavLink>
                                <ListDivider />
                                <NavLink to={'/leaderboard'}>
                                    <ListItem>
                                        <ListItemGraphic icon = "bar_chart"/>
                                        Leaderboard
                                    </ListItem>
                                </NavLink>
                                <ListDivider />
                                <NavLink to={'/logout-login'}>
                                    <ListItem>
                                        <ListItemGraphic icon = "verified_user"/>
                                        { loginText }
                                    </ListItem>
                                </NavLink>
                                <ListDivider />


                            </DrawerContent>
                        </Card>

                    </Col>
                    <Col xs={7} md={7}>


                            {
                                this.props.loading === true
                                    ? <Login />
                                    :
                                        <div>
                                            <Route path = '/' exact render={()=><Dashboard mode = { CONST_UNANSWERED_ONLY }/>}/>
                                            <Route path = '/answered'  render={()=><Dashboard mode = { CONST_ANSWERED_ONLY }/>}/>
                                            <Route path = '/unanswered'  render={()=><Dashboard mode = { CONST_UNANSWERED_ONLY }/>}/>
                                            <Route path = '/all'  render={()=><Dashboard mode = {CONST_All_Questions}/>}/>
                                            <Route path = '/question/:id'  render={()=><QuestionCard mode = { CONST_ANSWERED_ONLY }/>}/>
                                            <Route path = '/logout-login'  render={()=><Login/>}/>
                                            <Route path = '/create'  render={()=><CreateQuestion/>}/>
                                        </div>
                            }
                    </Col>
                </Row>
            </Grid>
            </div>
        </Router>

    );
  }


}

function mapStateToProps({authedUser, users}){
    let name = "";
    if (users[authedUser] !== undefined){
        name = users[authedUser].name;
    }
   return {
       loading: authedUser === null,
       name: name,
       authedUser
   }
}

export default connect(mapStateToProps)(App);
