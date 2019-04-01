import React, { Component, Fragment } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Users from './Users';
import Home from './Home';
import Nav from './Nav';
import TopRanked from './TopRanked';
import Form from './CreateUser';
import UpdateForm from './UpdateUser';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
    this.refreshUsers = this.refreshUsers.bind(this);
    this.destroyUser = this.destroyUser.bind(this);
    this.getTopRanked = this.getTopRanked.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    axios
      .get('/users')
      .then(res => res.data)
      .then(users => this.setState({ users }))
      .then(console.log(this.state.users))
      .catch();
  }

  refreshUsers() {
    axios
      .get('/users')
      .then(res => res.data)
      .then(users => this.setState({ users }))
      .catch();
  }

  // updateUser(id) {
  //   let users = this.state.users;
  //   const idx = id - 1;
  //   const userToUpdate = users.filter(user => user.id === id);
  //   // users = users.filter(user => user.id !== id);
  //   users.splice(idx, 1);
  //   axios
  //     .put(`/users/${id}`)
  //     .then(req => console.log('req.body in updateUser', req.body))
  //     .then(() => {
  //       this.setState({ users });
  //     })
  //     .catch();
  // }

  destroyUser(id) {
    axios
      .delete(`/users/${id}`)
      .then(() => {
        let users = this.state.users;
        users = users.filter(user => user.id !== id);
        this.setState({ users });
      })
      .catch();
  }

  getTopRanked() {
    const users = this.state.users;
    const highestRank = users.reduce((result, user) => {
      let topRank = 1000000;
      if (user.rank <= topRank) {
        topRank = user.rank;
      }
      result = topRank;
      return result;
    }, 0);
    return users.filter(user => user.rank === highestRank);
  }

  render() {
    const users = this.state.users;
    const topRanked = this.getTopRanked();
    // console.log('topRanked in App render', topRanked);

    return (
      <Router>
        <Fragment>
          <Route component={Nav} />
          <Route exact path="/home" component={Home} />
          <Route
            exact
            path="/users"
            render={() => (
              <Users
                users={users}
                destroy={this.destroyUser}
                updateUser={this.updateUser}
              />
            )}
          />
          <Route
            exact
            path="/topranked"
            render={() => (
              <TopRanked topranked={topRanked} destroy={this.destroyUser} />
            )}
          />
          <Route
            path="/create"
            render={({ history }) => (
              <Form refreshUsers={this.refreshUsers} history={history} />
            )}
          />
          <Route
            path="/update"
            render={({ history }) => (
              <UpdateForm
                refreshUsers={this.refreshUsers}
                history={history}
                updateUser={this.updateUser}
              />
            )}
          />
        </Fragment>
      </Router>
    );
  }
}

export default App;
