import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Form extends Component {
  constructor(props) {
    super(props);

    console.log('props in form constructor', this.props);
    if (!this.props.id) {
      this.state = {
        name: '',
        bio: '',
        rank: 0,
        errors: []
      };
    } else {
      const user = this.props.user;
      this.state = {
        name: user ? user.name : '',
        bio: user ? user.bio : '',
        rank: user ? user.rank : 0,
        errors: []
      };
    }

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.id && !prevProps.user) {
      const user = this.props.user;
      console.log('users in componentDidUpdate', user);
      this.setState({
        name: user ? user.name : '',
        bio: user ? user.bio : '',
        rank: user ? user.rank : 0,
        errors: []
      });
    }
  }

  onSave = ev => {
    ev.preventDefault();
    const user = { ...this.state };
    if (this.props.id) {
      user.id = this.props.id;
    }
    this.props
      .onSave(user)
      .then(() => this.props.history.push('/users'))
      .catch(e => {
        this.setState({ errors: e.response.data.errors });
      });
  };

  handleChange({ target }) {
    console.log('target ', target.value);
    this.setState({ [target.name]: target.value });
  }

  render() {
    const editMode = !!this.props.id;
    const errors = this.state.errors;
    const name = this.state.name;
    const bio = this.state.bio;
    const rank = this.state.rank;

    return (
      <div>
        <form onSubmit={this.onSave}>
          {!!errors.length && (
            <ul className="alert alert-danger">
              {errors.map(error => (
                <li>{error}</li>
              ))}
            </ul>
          )}
          <div className="form-group">
            <label htmlFor="name"> Name: </label>
            <input
              className="form-control form-control-sm"
              name="name"
              onChange={this.handleChange}
              defaultValue={name}
              placeholder="enter name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="price"> Bio: </label>
            <input
              className="form-control form-control-sm"
              name="bio"
              onChange={this.handleChange}
              defaultValue={bio}
            />
          </div>
          <div className="form-group">
            <label htmlFor="salePercentage"> Rank: </label>
            <input
              className="form-control form-control-sm"
              name="rank"
              onChange={this.handleChange}
              defaultValue={rank}
            />
          </div>

          <button
            type="submit"
            className="btn btn-outline-success btn-sm"
            onChange={this.handleChange}
          >
            {editMode ? 'Update' : 'Create'}
          </button>
          <Link to="/users" className="btn btn-outline-warning btn-sm">
            Cancel
          </Link>
        </form>
      </div>
    );
  }
}

export default Form;
