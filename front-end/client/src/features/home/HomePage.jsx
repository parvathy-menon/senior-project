import React, { Component, Fragment } from 'react';
import ItemDashboard from '../item/ItemDashboard/ItemDashboard';
import { Container } from 'semantic-ui-react';

class HomePage extends Component {
  
  render() {
    return (
        <Fragment>
          <Container className='main'>
            <ItemDashboard />
          </Container>
        </Fragment>
    );
  }

}

export default HomePage;