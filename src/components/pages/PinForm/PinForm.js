import React from 'react';

import './PinForm.scss';
import authData from '../../../helpers/data/authData';
import pinData from '../../../helpers/data/pinData';

class PinForm extends React.Component {
  state = {
    pinTitle: '',
    pinImageUrl: '',
  }

  componentDidMount() {
    const { pinId } = this.props.match.params;
    if (pinId) {
      pinData.getSinglePin(pinId)
        .then((request) => {
          const pin = request.data;
          this.setState({ pinTitle: pin.title, pinImageUrl: pin.imageUrl });
        })
        .catch((err) => console.error('error with get single pin', err));
    }
  }

  titleChange = (e) => {
    e.preventDefault();
    this.setState({ pinTitle: e.target.value });
  }

  imageUrlChange = (e) => {
    e.preventDefault();
    this.setState({ pinImageUrl: e.target.value });
  }

  editPinEvent = (e) => {
    const { boardId, pinId } = this.props.match.params;
    e.preventDefault();
    const editPin = {
      title: this.state.pinTitle,
      imageUrl: this.state.pinImageUrl,
      uid: authData.getUid(),
      boardId,
    };
    pinData.editPin(pinId, editPin)
      .then(() => this.props.history.push(`/board/${boardId}`))
      .catch((err) => console.error('error with edit pin', err));
  }

  savePinEvent = (e) => {
    const { boardId } = this.props.match.params;
    e.preventDefault();
    const newPin = {
      title: this.state.pinTitle,
      imageUrl: this.state.pinImageUrl,
      uid: authData.getUid(),
      boardId,
    };
    pinData.savePin(newPin)
      .then(() => this.props.history.push(`/board/${boardId}`))
      .catch((err) => console.error('error with save pin', err));
  }

  render() {
    const { pinTitle, pinImageUrl } = this.state;
    const { pinId } = this.props.match.params;
    return (
      <form className="PinForm">
        <div className="form-group">
          <label htmlFor="">Pin Title</label>
          <input
            type="text"
            className="form-control"
            id="pin-title"
            placeholder="Enter pin title"
            value={pinTitle}
            onChange={this.titleChange}
          />
          <label htmlFor="">Pin Image Url</label>
          <input
            type="text"
            className="form-control"
            id="pin-image-url"
            placeholder="Enter pin image url"
            value={pinImageUrl}
            onChange={this.imageUrlChange}
          />
        </div>
        { pinId
          ? <button className="btn btn-secondary" onClick={this.editPinEvent}>Edit Pin</button>
          : <button className="btn btn-secondary" onClick={this.savePinEvent}>Save Pin</button>
        }
      </form>
    );
  }
}

export default PinForm;
