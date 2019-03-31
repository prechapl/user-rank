import React from "react";

class Users extends React.Component {
  render() {
    console.log("props via Users ", this.props);

    return (
      <div>
        <ul className="list-group">
          {this.props.users.map(user => {
            return (
              <li className="list-group-item" key={user.id}>
                <ul>
                  <li className="list-group-item ">
                    <div>{user.name}</div>
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-outline-danger btn-sm"
                        type="button"
                        onClick={() => this.props.destroyUser(user.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                  {this.props.getRank(user)}
                  {/* <div style={{ margin: '10px' }}>
                    {this.props.availabilityCheck(user)}
                  </div> */}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Users;
