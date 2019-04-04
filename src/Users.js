import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

class Users extends React.Component {
  render() {
    return (
      <div>
        <ul className=" list-group" style={{ margin: '20px' }}>
          {this.props.users.map(user => {
            return (
              <li className="list-group-item" key={user.id}>
                <ul>
                  <li className="list-group-item ">
                    <div>user: {user.name}</div>
                    <div>bio: {user.bio}</div>
                    <div>rank: {user.rank}</div>
                    <div
                      className="d-flex justify-content-start"
                      style={{ margin: '10px' }}
                    >
                      <button
                        className="btn btn-outline-danger btn-sm"
                        type="button"
                        onClick={() => this.props.destroy(user.id)}
                      >
                        Delete
                      </button>
                      <Link
                        to={`/users/${user.id}`}
                        className="btn btn-outline-primary btn-sm"
                      >
                        Edit
                      </Link>
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
