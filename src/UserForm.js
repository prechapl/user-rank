import React, { Component } from 'react';
import axios from 'axios';

class Form extends Component {
  constructor(props) {
    super(props);
    if (!this.props.id) {
      this.state = {
        name: '',
        bio: '',
        rank: 0
      };
    } else {
      const user = this.props.userToUpdate(this.props.id);
      this.state = {
        name: user.name,
        bio: user.bio,
        rank: user.rank
      };
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);

    // console.log('props in Form ', this.props);
    // console.log('history in Form ', history);
    // console.log('this.props.id in Form ', this.props.id);
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

  handleUpdate(evt) {
    evt.preventDefault();
    const { name, bio, rank } = this.state;
    axios
      .put(`/users/${this.props.id}`, { name, bio, rank })
      .then(res => res.data)
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
    console.log('props.id in Form render', this.props.id);

    return (
      <div>
        <form onSubmit={!this.props.id ? this.handleSubmit : this.handleUpdate}>
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

export default Form;
