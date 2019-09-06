import React, { Component, Fragment } from 'react';
import { Grid, Image, Container } from 'semantic-ui-react';
import Preference from './Preference';
import SideMenu from '../SideMenu/SideMenu';

class ProfileDashboard extends Component {
    render() {
        return (
            <Container className='main'>
                <Grid>
                    <Grid.Column width={2}>
                        <SideMenu />
                    </Grid.Column>
                    <Grid.Column width={14}>
                        <Grid.Row>
                            <Grid >
                                <Grid.Column width={3}>
                                    <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
                                </Grid.Column>
                                <Grid.Column width={13}>
                                    <Preference />
                                </Grid.Column>
                            </Grid>
                        </Grid.Row>
                    </Grid.Column>
                </Grid>
            </Container>
        )
    }
}

export default ProfileDashboard;
