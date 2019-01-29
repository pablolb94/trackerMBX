import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HeaderProfileOwn extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <div className="headerProfile">
            <div className="profileImg">
                <img src={this.props.account.image} />
            </div>
            <div className="profileDesc">
                <p>{this.props.account.username}</p>
                <Link to="/configprofile"><div className="btn btn-info configUserBtn">Configuración</div></Link>
                <Link to="/logout"><div className="btn btn-info closeSessionBtn"><img src="icons/general/closeSessionIcon.png" /></div></Link>
            </div>
        </div>
    )
  }
}

export default HeaderProfileOwn;
