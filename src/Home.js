import React from 'react';

class Home extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          alignItems: 'flex-start'
        }}
      >
        <h4 style={{ margin: '10px' }}>
          Welcome to Acme Users Ranked<i> by Preston</i>
        </h4>
        <div style={{ margin: '15px' }}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis
            eros a laoreet molestie. Maecenas non lorem vitae massa dignissim
            suscipit. Pellentesque ullamcorper luctus orci, vel pulvinar massa.
            Donec non neque sit amet urna maximus ultrices. Duis sodales justo
            elit, vitae sagittis augue aliquet nec. Donec ut malesuada ante. Sed
            sem tortor, vehicula quis euismod id, bibendum ut purus. Fusce
            suscipit tristique sapien vel gravida. Praesent vitae lectus id eros
            vehicula commodo. Proin tristique neque erat. In sit amet justo
            sollicitudin purus laoreet sagittis.
          </p>
        </div>
      </div>
    );
  }
}

export default Home;
