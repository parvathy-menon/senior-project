import React, { Component, Fragment } from 'react';
import { Container } from 'semantic-ui-react';

class HomePage extends Component {

  render() {
    return (
      <Fragment>
        <Container className='main'>
          <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
            <img src="assets/logo.png" alt="logo" style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 200,
              height: 200,
            }} />
          </h1>
          <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '5vh' }}>
            Yelp Recommender
          </h1>
          <h3>
            &emsp;&emsp; The goal of this project is to improve users’ dining experience by enhancing the accuracy of restaurant recommendations matching users’ palate, based on users’ profiled cuisine interests. To achieve this, the combination of the different algorithms to create the recommendation model harnesses the strengths from each algorithm to provide better recommendations by drawing users’ potential restaurant interests based on existing restaurant interests of similar user profiles, or finding the correlation between their favorite restaurants and other restaurants.
          </h3>

        </Container>
      </Fragment>
    );
  }

}

export default HomePage;