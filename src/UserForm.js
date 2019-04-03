import React, { Component } from 'react';
import axios from 'axios';

class Form extends Component {
  constructor(props) {
    super(props);

    console.log('props in form constructor', this.props);
    if (!this.props.id) {
      this.state = {
        name: '',
        bio: '',
        rank: 0
      };
    } else {
      const user = this.props.user;
      this.state = {
        name: user ? user.name : '',
        bio: user ? user.bio : '',
        rank: user ? user.rank : 0
      };
    }

    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleUpdate = this.handleUpdate.bind(this);

    // console.log('props in Form ', this.props);
    // console.log('history in Form ', history);
    // console.log('this.props.id in Form ', this.props.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.id && !prevProps.user) {
      const user = this.props.user;
      console.log('users in componentDidUpdate', user);
      this.setState({
        name: user ? user.name : '',
        bio: user ? user.bio : '',
        rank: user ? user.rank : 0
      });
    }
  }

  // handleSubmit(evt) {
  //   evt.preventDefault();
  //   const { name, bio, rank } = this.state;
  //   axios
  //     .post('/users', { name, bio, rank })
  //     .then(res => res.data)
  //     .then(() => this.props.history.push('/users'))
  //     .then(() => this.props.refreshUsers())
  //     .catch(e => console.log(e));
  // }

  // handleUpdate(evt) {
  //   evt.preventDefault();
  //   const user = this.props.user;
  //   axios.put('/users/:id', (req, res, next) => {
  //     User.findByPk(req.params.id)
  //       .then(user => user.udpate(req.body))
  //       .then(user => res.send(user))
  //       .catch(next);
  //   });
  // .then(() => this.props.history.push('/users'))
  // .then(() => this.props.refreshUsers())
  // .catch(e => console.log(e));
  // }

  onSave = ev => {
    ev.preventDefault();
    const user = { ...this.state };
    if (this.props.id) {
      user.id = this.props.id;
    }
    this.props
      .onSave(user)
      .then(() => this.props.history.push('/users'))
      .catch(e => console.log(e));
  };

  handleChange({ target }) {
    console.log('target ', target.value);
    this.setState({ [target.name]: target.value });
  }

  render() {
    const editMode = !!this.props.id;
    // const onSave = this;
    const name = this.state.name;
    const bio = this.state.bio;
    const rank = this.state.rank;

    return (
      <div>
        <form onSubmit={this.onSave}>
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

          <button type="submit" onChange={this.handleChange}>
            {editMode ? 'Update' : 'Create'}
          </button>
        </form>
      </div>
    );
  }
}

export default Form;
