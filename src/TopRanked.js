import React from 'react';

class TopRanked extends React.Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.topranked.map(user => {
            return (
              <li className="list-group-item" key={user.id}>
                <ul>
                  <li className="list-group-item ">
                    <div>{user.name}</div>
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-outline-danger btn-sm"
                        type="button"
                        onClick={() => this.props.destroy(user.id)}
                      >
                        Delete
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

export default TopRanked;
