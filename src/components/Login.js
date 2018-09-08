import React from 'react';
import {connect} from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import {Card, CardMedia, CardMediaContent, CardPrimaryAction} from 'rmwc/Card';
import {Typography} from 'rmwc/Typography';
import {NavLink} from "react-router-dom";
import {setAuthedUser} from "../actions/authedUser";


class Login extends React.Component {

    render(){

        const { users, authUser } = this.props;
        let from = '/';
        if (this.props.location.pathname !== undefined){
            from = this.props.location.pathname;
        }
        console.log("authUser", authUser);
        console.log("from", from);
        if (authUser !== undefined) {
          return (
            <Redirect to={from} />
          );
        }
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

             <div className="loginCards"
                value = {`${user}`}
                onClick = {(e) => this.handleSelection(user)}>
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
            )

    }

    handleSelection(user){
        const { dispatch } = this.props;
        const { id } = user;
        dispatch(setAuthedUser(id));
        this.props.history.push(this.props.location.pathname);
    }
};

function mapStateToProps({users, authUser}){
   return {
       users, authUser
   }
}
export default withRouter(connect(mapStateToProps)(Login));