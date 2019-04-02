import React from 'react';
import { withRouter } from 'react-router';

class Users extends React.Component {
  render() {
    console.log('props via Users ', this.props);
    console.log('history via Users ', this.props.history);

    return (
      <div>
        <ul className="list-group">
          {this.props.users.map(user => {
            return (
              <li className="list-group-item" key={user.id}>
                <ul>
                  <li className="list-group-item ">
                    <div>{user.name}</div>
                    <div>{user.bio}</div>
                    <div>{user.rank}</div>
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-outline-danger btn-sm"
                        type="button"
                        onClick={() => this.props.destroy(user.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        type="button"
                        onClick={() =>
                          this.props.history.push(`/users/${user.id}`)
                        }
                      >
                        Edit
                      </button>
                    </div>
                  </li>
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default withRouter(Users);
