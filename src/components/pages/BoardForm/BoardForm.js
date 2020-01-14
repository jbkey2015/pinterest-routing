import React from 'react';

import './BoardForm.scss';
import authData from '../../../helpers/data/authData';
import boardData from '../../../helpers/data/boardData';

class BoardForm extends React.Component {
  state = {
    boardName: '',
    boardDescription: '',
  }

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ boardName: e.target.value });
  }

  descriptionChange = (e) => {
    e.preventDefault();
    this.setState({ boardDescription: e.target.value });
  }

  saveBoardEvent = (e) => {
    e.preventDefault();
    const newBoard = {
      name: this.state.boardName,
      description: this.state.boardDescription,
      uid: authData.getUid(),
    };
    boardData.saveBoard(newBoard)
      .then(() => this.props.history.push('/'))
      .catch((err) => console.error('error from save board', err));
  }

  render() {
    const { boardName, boardDescription } = this.state;
    return (
      <form className="BoardForm">
        <div className="form-group">
          <label htmlFor="">Board Name</label>
          <input
            type="text"
            className="form-control"
            id="board-name"
            placeholder="Enter board name"
            value={boardName}
            onChange={this.nameChange}
          />
          <label htmlFor="">Board Description</label>
          <input
            type="text"
            className="form-control"
            id="board-description"
            placeholder="Enter board description"
            value={boardDescription}
            onChange={this.descriptionChange}
          />
        </div>
        <button className="btn btn-secondary" onClick={this.saveBoardEvent}>Save Board</button>
      </form>
    );
  }
}

export default BoardForm;
