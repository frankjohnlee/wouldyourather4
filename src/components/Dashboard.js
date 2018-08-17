import React, { Component } from 'react';
import {connect} from 'react-redux';

class Dashboard extends Component {



  render() {
      console.log("Dashboard props", this.props);
    return (
        <div>
            <div> Dashboard Component </div>
        </div>
    );
  }


}
function mapStateToProps({ questions }){
    return {
        questionids: Object.keys(questions)
            .sort((a,b) => questions[a].timestamp - questions[b].timestamp)
    }

}
export default connect(mapStateToProps)(Dashboard);
