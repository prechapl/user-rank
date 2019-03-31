import React, { Component, Fragment } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Users from "./Users";
import Home from "./Home";
import Nav from "./Nav";
import TopRanked from "./TopRanked";
// import Form from "./CreateUser";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
    this.refreshUsers = this.refreshUsers.bind(this);
    this.destroyUser = this.destroyUser.bind(this);
  }

  componentDidMount() {
    axios
      .get("/users")
      .then(res => res.data)
      .then(users => this.setState({ users }))
      .catch();
  }

  refreshUsers() {
    axios
      .get("/users")
      .then(res => res.data)
      .then(users => this.setState({ users }))
      .catch();
  }

  destroyUser(id) {
    axios
      .delete(`/users/${id}`)
      .then(() => {
        let users = this.state.products;
        users = users.filter(user => user.id !== id);
        this.setState({ users });
      })
      .catch();
  }

  render() {
    const users = this.state.users;
    const topRanked = users.filter(user => user.rank === 1);

    return (
      <Router>
        <Fragment>
          <Route component={Nav} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/users" render={() => <Users users={users} />} />
          <Route
            exact
            path="/topranked"
            render={() => <TopRanked topranked={topRanked} />}
          />
          <Route
            path="/create"
            render={({ history }) => (
              <Form refreshUsers={this.refreshUsers} history={history} />
            )}
          /> 
        </Fragment>
      </Router>
    );
  }
}

module.exports = App;
