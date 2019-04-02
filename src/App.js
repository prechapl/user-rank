import React, { Component, Fragment } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
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
    this.userToUpdate = this.userToUpdate.bind(this);
  }

  componentDidMount() {
    axios
      .get('/users')
      .then(res => res.data)
      .then(users => this.setState({ users }))
      .then(console.log('in app.js CDM', this.state.users))
      .catch();
  }

  refreshUsers() {
    axios
      .get('/users')
      .then(res => res.data)
      .then(users => this.setState({ users }))
      .catch();
  }

  userToUpdate(id) {
    const users = this.state.users.slice();
    const user = users.filter(_user => _user.id === id);
    console.log('user in userToUpdate', user);
    return user;
  }

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
              <Form refreshUsers={this.refreshUsers} history={history} />
            )}
          />
          <Route
            exact
            path="/users/:id"
            render={({ history, match }) => (
              <Form
                refreshUsers={this.refreshUsers}
                history={history}
                userToUpdate={this.userToUpdate}
                id={match.params.id}
              />
            )}
          />
        </Fragment>
      </Router>
    );
  }
}

export default App;
