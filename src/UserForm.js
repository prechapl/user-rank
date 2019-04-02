import React, { Component } from "react";
import axios from "axios";

class Form extends Component {
  constructor(props) {
    super(props);

    // console.log('user in form state', user);

    this.state = {
      name: "",
      bio: "",
      rank: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);

    // console.log('props in Form ', this.props);
    console.log("history in Form ", history);
    // console.log('this.props.id in Form ', this.props.id);
  }

  componentDidUpdate(prevProps, nextProps) {
    const users = this.props.users;
    if (prevProps.id !== nextProps.id) {
      const user = users.filter(_user => _user.id === this.props.id);
      this.setState(user);
    }
    // console.log("user in userToUpdate", user);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const { name, bio, rank } = this.state;
    axios
      .post("/users", { name, bio, rank })
      .then(res => res.data)
      .then(() => this.props.history.push("/users"))
      .then(() => this.props.refreshUsers())
      .catch(e => console.log(e));
  }

  handleUpdate(evt) {
    evt.preventDefault();
    const { name, bio, rank } = this.state;
    axios
      .put(`/users/${this.props.id}`, { name, bio, rank })
      .then(res => res.data)
      .then(() => this.props.history.push("/users"))
      .then(() => this.props.refreshUsers())
      .catch(e => console.log(e));
  }

  handleChange({ target }) {
    console.log("target ", target.value);
    this.setState({ [target.name]: target.value });
  }

  render() {
    const name = this.state.name;
    const bio = this.state.bio;
    const rank = this.state.rank;

    return (
      <div>
        <form onSubmit={!this.props.id ? this.handleSubmit : this.handleUpdate}>
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
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Form;
