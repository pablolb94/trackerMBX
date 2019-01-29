import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class ObjectProfileSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return(
        <div className="objectProfileSearch">
            <div className="imageProfileSearch">
                {
                    this.props.account.image ?
                        (<img src={this.props.account.image} />)
                    :
                        (<img src="images/profile1.jpg" />)
                }
            </div>
            <div className="describeProfileSearch">
                <Link to={"/profile/"+this.props.account.username}>
                    {this.props.account.username}
                </Link>
            </div>
            <div className="followBtnSearch">
                {
                    this.props.following ?
                        (<input type="submit" onClick={() => this.props.updateFollow(this.props.account.id, false)} className="btn btn-warning btnFollowSearch" id="test" value="Dejar de seguir"></input>)
                    :
                        (<input type="submit" onClick={() => this.props.updateFollow(this.props.account.id, true)} className="btn btn-success btnFollowSearch" value="Comenzar a seguir"></input>)
                }                           
            </div>
        </div>
    ) 
  }
}

export default ObjectProfileSearch;
