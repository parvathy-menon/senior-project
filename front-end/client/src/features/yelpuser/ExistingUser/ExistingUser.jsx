import React, { Component } from 'react'
import { Grid, Container, Dropdown, Header, Divider, Button } from 'semantic-ui-react';
import BusinessList from '../ExistingUser/BusinessList';
import SideMenu from '../../SideMenu/SideMenu';
import axios from 'axios';

const users = [
    { key: '1', text: '3nDUQBjKyVor5wV0reJChg', value: '3nDUQBjKyVor5wV0reJChg' },
    { key: '2', text: '3nDUQBjKyVor5wV0reJChg', value: '3nDUQBjKyVor5wV0reJChg' }
]

class ExistingUser extends Component {
    state = {
        rIDs: [],
        restaurants: [],
        userID: '',
    }

    getFive = event => {
        if (this.state.rIDs[0] !== undefined) {
            // need a loop to 'put' each object into restrant array
            var restaurantsArr = [];
            var yelpAPI;
            var count = this.state.restaurants.length;

            // works, but too many requests at the same time make yelp API deny
            for (let i = count; i < count + 5; i++) {

                yelpAPI = `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/` + this.state.rIDs[i];

                restaurantsArr.push(
                    axios.get(yelpAPI, {
                        headers: {
                            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
                        }
                    }).then(
                        result => new Promise(resolve => {
                            resolve(result.data)
                        })
                    ).catch((err) => {
                        console.log('error')
                    })
                );
            }

            Promise.all(restaurantsArr).then(res => {
                var tempArr = this.state.restaurants;
                var newRestArr = tempArr.concat(res);
                this.setState({
                    restaurants: newRestArr
                })
            });
        }

    }

    handleSubmit = event => {
        event.preventDefault();
        var userID = this.state.userID;
        var api = 'http://0.0.0.0:5000/api/v1.0/generaterecommendations/' + userID;

        axios
            .get(api)
            .then(res => {
                // console.log(res);
                // console.log(res.data);
                this.setState({
                    rIDs: res.data.businesses
                })
            })
            .catch(err => {
                console.log(err.data);
            });
    }

    onChangeUser = (e, data) => {
        // console.log('data.value ' + data.value);
        this.setState({
            userID: data.value
        });
    }

    render() {
        const { restaurants } = this.state;
        return (
            <Container className='main'>
                <Grid>
                    <Grid.Column width={2}>
                        <SideMenu />
                    </Grid.Column>
                    <Grid.Column width={14}>
                        <Header>Choose a existing user</Header>
                        <Dropdown
                            button
                            className='icon'
                            fluid
                            labeled
                            icon='user outline'
                            options={users}
                            selection
                            placeholder='Pick an existing user ID'
                            valve={this.state.userID}
                            onChange={this.onChangeUser}
                        />
                        <p></p>
                        <Button onClick={this.handleSubmit} color="teal" postive content='Submit' />
                        <Divider />
                        <BusinessList items={restaurants} />
                        <p></p>
                        {/* {this.state.rIDs === [] ? <Button onClick={this.getFive} postive content='Get 5 restaurants' /> : ''} */}
                        <Button color="teal" onClick={this.getFive} postive content='Get 5 recommended restaurants' />

                    </Grid.Column>
                </Grid>
            </Container>

        )
    }
}

export default ExistingUser;