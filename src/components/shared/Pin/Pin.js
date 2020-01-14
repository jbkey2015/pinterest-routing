import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import pinShape from '../../../helpers/propz/pinShape';
import './Pin.scss';

class Pin extends React.Component {
  static propTypes = {
    pin: pinShape.pinShape,
    deletePinEvent: PropTypes.func,
  }

  deletePinEvent = (e) => {
    e.preventDefault();
    const { deleteSinglePin, pin } = this.props;
    deleteSinglePin(pin.id);
  }

  render() {
    const { pin } = this.props;

    return (
      <div className="Pin col-3">
        <div className="card">
          <img src={pin.imageUrl} className="card-img-top" alt=""/>
          <div className="card-body">
            <h5 className="card-title">{pin.title}</h5>
            <button className="btn btn-danger" onClick={this.deletePinEvent}>X</button>
            <Link className="btn btn-warning" to={`/board/${pin.boardId}/pin/${pin.id}/edit`}>Edit</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Pin;
