import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import {ListDivider, ListItem, ListItemGraphic} from 'rmwc/List';
import {handleInitialData} from '../actions/shared'
import {connect} from 'react-redux';
import Dashboard, {CONST_ANSWERED_ONLY, CONST_UNANSWERED_ONLY} from "./QuestionList";
import {DrawerContent} from 'rmwc/Drawer';
import {Col, Grid, Row} from "react-flexbox-grid";
import QuestionCard, {CONST_DETAILS_MODE} from "./QuestionCard"
import './App.css';
import {Toolbar, ToolbarFixedAdjust, ToolbarMenuIcon, ToolbarRow, ToolbarSection, ToolbarTitle} from 'rmwc/Toolbar';
import {Card} from 'rmwc/Card'
import Login from './Login'
import CreateQuestion from './CreateQuestion'
import AnsweredAndUnAnswered from "./AnsweredAndUnAnswered"
import {Snackbar} from "rmwc/Snackbar";
import Leaderboard from "./Leaderboard"

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			dismissibleOpen: true,
            snackbarStartIsOpen: false,
            snackbarMessage: "Your question was created!"
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
								<Link to={'/'}  >
									<ListItem>
										   <ListItemGraphic icon="home"/>
											Home
									</ListItem>
								</Link>
								<ListDivider />
								<Link to={'/answered'}  >
									<ListItem>
										<ListItemGraphic icon="favorite"/>
										  Answered
									</ListItem>
								</Link>
								<ListDivider />
								<Link to = {'/unanswered'}>
									<ListItem>
										<ListItemGraphic icon = "favorite_border"/>
										Unanswered
									</ListItem>
								</Link>
								<ListDivider />
								<Link to={'/all'}>
									<ListItem>
										<ListItemGraphic icon = "group_work"/>
										All
									</ListItem>
								</Link>
								<ListDivider />
								<Link to={'/create'}>
									 <ListItem>
										<ListItemGraphic icon = "add"/>
										New Question
									</ListItem>
								</Link>
								<ListDivider />
								<Link to={'/leaderboard'}>
									<ListItem>
										<ListItemGraphic icon = "bar_chart"/>
										Leaderboard
									</ListItem>
								</Link>
								<ListDivider />
								<Link to={'/logout-login'}>
									<ListItem>
										<ListItemGraphic icon = "verified_user"/>
										{ loginText }
									</ListItem>
								</Link>
								<ListDivider />


							</DrawerContent>
						</Card>

					</Col>
					<Col xs={7} md={7}>


							{
								this.props.loading === true
									? <Login />
									:
										<Switch>
												<Route path = '/' exact render={ () => <AnsweredAndUnAnswered /> }/>
												<Route path = '/answered'  render={()=><Dashboard mode = { CONST_ANSWERED_ONLY }/>}/>
												<Route path = '/unanswered'  render={()=><Dashboard mode = { CONST_UNANSWERED_ONLY }/>}/>
												<Route path = '/all'  render={()=><AnsweredAndUnAnswered /> }/>
												<Route path = '/question/:id'  render={()=><QuestionCard mode = { CONST_DETAILS_MODE }/>}/>
												<Route path = '/create'  render={()=><CreateQuestion reloadData = {this.updateAPP.bind(this)}/>}/>
												<Route path = '/logout-login'  render={()=><Login/>}/>
                                                <Route path = '/leaderboard'  render={()=><Leaderboard/>}/>
										</Switch>
							}
					</Col>
				</Row>
			</Grid>
           <Snackbar
                  show={this.state.snackbarStartIsOpen}
                  onHide={evt => this.setState({snackbarStartIsOpen: false})}
                  message={this.state.snackBarMessage}
                  actionText="Dismiss"
                  actionHandler={() => {}}
                  alignStart
                />
			</div>
		</Router>

	);
  }
	updateAPP(){
		this.forceUpdate()
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
