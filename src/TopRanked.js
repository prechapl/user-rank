import React from "react";
import { Link } from "react-router-dom";

class TopRanked extends React.Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.topranked.map(user => {
            return (
              <li
                className="list-group-item"
                key={user.id}
                style={{ margin: "20px" }}
              >
                <ul>
                  <li className="list-group-item ">
                    <div>user: {user.name}</div>
                    <div>bio: {user.bio}</div>
                    <div>rank: {user.rank}</div>
                    <div className="d-flex justify-content-start">
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

export default TopRanked;
