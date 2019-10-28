import React, { Component } from 'react';
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
                                <Grid.Column width={2}>
                                    <Image src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' />
                                </Grid.Column>
                                <Grid.Column width={14}>
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
