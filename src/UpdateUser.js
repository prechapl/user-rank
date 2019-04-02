import React, { Component } from 'react';

import axios from 'axios';

class UpdateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.userToUpdate.name,
      bio: props.userToUpdate.bio,
      rank: props.userToUpdate.rank
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    console.log('props in UpdateUser Form ', this.props);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const { name, bio, rank } = this.state;
    axios
      .post('/users', { name, bio, rank })
      .then(res => res.data)
      // .then(res => console.log(res.data))
      .then(() => this.props.history.push('/users'))
      .then(() => this.props.refreshUsers())
      .catch(e => console.log(e));
  }

  handleChange({ target }) {
    console.log('target ', target.value);
    this.setState({ [target.name]: target.value });
  }

  render() {
    const name = this.state.name;
    const bio = this.state.bio;
    const rank = this.state.rank;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name"> Name: </label>
            <input
              className="form-control form-control-sm"
              name="name"
              onChange={this.handleChange}
              value={name}
              placeholder="enter name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="price"> Bio: </label>
            <input
              className="form-control form-control-sm"
              name="bio"
              onChange={this.handleChange}
              value={bio}
            />
          </div>
          <div className="form-group">
            <label htmlFor="salePercentage"> Rank: </label>
            <input
              className="form-control form-control-sm"
              name="rank"
              onChange={this.handleChange}
              value={rank}
            />
          </div>

          <button type="submit" onChange={this.handleChange}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default UpdateForm;
