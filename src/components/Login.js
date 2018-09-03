import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Card, CardMedia, CardPrimaryAction, CardMediaContent} from 'rmwc/Card';
import { Typography } from 'rmwc/Typography';
import {NavLink, withRouter} from "react-router-dom";
import { authedUser } from "../reducers/authedUser";
import { setAuthedUser } from "../actions/authedUser";


class Login extends React.Component {

    render(){

        const { users } = this.props;
        return (
            <div>
                <center><h3>Select User To Login</h3></center>
                {
                    Object.keys(users).map((userKey) => {
                        return (
                                <div key ={`login-user:${userKey}`}>
                                    { this.makeLoginCard(users[userKey]) }
                                </div>

                                 )
                    })
                }

            </div>
        )
    }
    makeLoginCard(user){
        return(
            <div
                to={'/'}
                value = {`${user}`}
                onClick = {(e) => this.handleSelection(user)}
                >
             <div className="loginCards">
                      <Card style={{ width: '12.5rem' }}>
                          <CardPrimaryAction>
                            <CardMedia
                              square
                              style={{
                                backgroundImage:
                                  `url(${user.avatarURL})`
                              }}
                            >
                      <CardMediaContent>
                        <Typography
                          use="subheading2"
                          tag="div"
                          theme="text-primary-on-dark"
                          style={{
                            padding: '0.5rem 1rem',
                            backgroundImage:
                              'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.5) 100%)',
                            bottom: '0',
                            left: '0',
                            right: '0',
                            position: 'absolute'
                          }}>
                          {user.name}
                        </Typography>
                      </CardMediaContent>
                    </CardMedia>
                  </CardPrimaryAction>
                </Card>
             </div>
            </div>
            )

    }

    handleSelection(user){
        const { dispatch } = this.props;
        const { id } = user;
        dispatch(setAuthedUser(id));
    }
};

function mapStateToProps({users}){
   return {
       users
   }
}
export default connect(mapStateToProps)(Login);