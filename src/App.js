import React, { Component, Fragment } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import Users from './Users';
import Home from './Home';
import Nav from './Nav';
import TopRanked from './TopRanked';
import Form from './UserForm';
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
    // this.userToUpdate = this.userToUpdate.bind(this);
  }

  componentDidMount() {
    this.refreshUsers();
  }

  refreshUsers() {
    axios
      .get('/users')
      .then(res => res.data)
      .then(users => this.setState({ users }))
      .catch();
  }

  // userToUpdate(id) {
  //   const users = this.state.users.slice();
  //   const user = users.filter(_user => _user.id === id);
  //   console.log('user in userToUpdate', user);
  //   return user[0];
  // }

  onSave = user => {
    return axios[user.id ? 'put' : 'post'](
      `/users/${user.id ? user.id : ''}`,
      user
    ).then(res => {
      this.refreshUsers();
      return res.data;
    });
  };

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
    let topRank = 1000000;
    const highestRank = users.reduce((result, user) => {
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
                userToUpdate={this.userToUpdate}
                history={history}
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
              <Form
                refreshUsers={this.refreshUsers}
                history={history}
                onSave={this.onSave}
              />
            )}
          />
          <Route
            exact
            path="/users/:id"
            render={({ history, match }) => (
              <Form
                onSave={this.onSave}
                refreshUsers={this.refreshUsers}
                history={history}
                userToUpdate={this.userToUpdate}
                id={match.params.id}
                user={users.find(u => u.id === match.params.id * 1)}
              />
            )}
          />
        </Fragment>
      </Router>
    );
  }
}

export default App;
