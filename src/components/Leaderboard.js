import React, { Component } from "react"
import { connect } from 'react-redux';
import {Col, Grid, Row} from "react-flexbox-grid";

import { Card } from 'rmwc/Card'
class Leaderboard extends Component {

    render(){
        const { userDetails } = this.props;
        return (
            <ul className= 'leaderboard-list'>

                {
                    userDetails.map((user) =>
                        { return(
                            this.leaderBoardCard(
                            user.userName,
                            user.imageURL,
                            user.questionsPosted,
                            user.questionsAnswered
                        ))}
                    )
                }
            </ul>

        )
    }

    leaderBoardCard(userName, userURL, questionsAsked, questionsAnswered){
        return (
            <Card key = {`leaderboardCardKey:$(userName)`}>
                <br/>
                <Grid fluid>
                        <Row>
                            <Col xs={4} md={4}>
                                { this.userInfo(userName, userURL) }
                            </Col>
                            <Col xs={7} md={7}>
                                   <form>
                                        <fieldset>
                                            <legend>User's Stats</legend>
                                                { this.userStats(questionsAsked, questionsAnswered)}
                                        </fieldset>
                                    </form>
                            </Col>
                        </Row>
                  </Grid>
                </Card>
        )
    }
    userInfo(userName, userURL){
        /* Returns info of the user */
            return(
                <Grid fluid>
                    <Row>
                        {userName}
                    </Row>
                    <Row>
                        <img
                            src={userURL}
                            alt={`Avatar of ${userName}`}
                            className='avatar'
                        />
                    </Row>
                </Grid>
            )
    }
    userStats(questionsAsked, questionsAnswered){
        return (
             <div>
                 <div>{ `Questions Asked ${questionsAsked}` }</div>
                 <div>{ `Questions Answered ${questionsAnswered}` }</div>
            </div>
            )

    }

}
    function mapStateToProps({users}){
    const userDetails = Object.keys(users)
        .map((user) => {
          const tempUserDetails = {
            imageURL: users[user].avatarURL,
            userName: users[user].name,
            questionsAnswered: Object.keys(users[user].answers).length,
            questionsPosted: users[user].questions.length,
          };
          const rank = tempUserDetails.questionsAnswered + tempUserDetails.questionsPosted;
          tempUserDetails.userRank = rank;
          return (tempUserDetails);
        })
         .sort((a, b) => ( b.userRank - a.userRank ));
        return { userDetails };
    }

export default connect(mapStateToProps)(Leaderboard)