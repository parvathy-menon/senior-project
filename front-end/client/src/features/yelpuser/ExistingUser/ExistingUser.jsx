import React, { Component } from 'react'
import { Grid, Container, Dropdown, Header, Divider, Button, Icon } from 'semantic-ui-react';
// import SideMenu from '../../SideMenu/SideMenu';
import ItemList from '../../item/ItemList/ItemList';
import GMap from '../../map/GMap';
import axios from 'axios';

class ExistingUser extends Component {
    state = {
        eIDs: [],
        rIDs: [],
        restaurants: [],
        userID: '',
        isLoading: false,
        getFiveIsLoading: false,
        get10ExistingUsersIsLoading: false,
        currentLocation: {
            lat: 47.444,
            lng: -122.176
        }
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
                            this.setState({
                                isLoading: true
                            })
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
                console.log(newRestArr);
                this.setState({
                    restaurants: newRestArr,
                    isLoading: false,
                    //Seattle
                    currentLocation: {
                        lat: newRestArr[0].coordinates.latitude,
                        lng: newRestArr[0].coordinates.longitude
                    }
                })
                console.log(newRestArr);
            });
        }
    }

    // under development
    // this is a backup method when heroku service is down
    // getFive = event => {
    //     if (this.state.rIDs[0] !== undefined) {
    //         // need a loop to 'put' each object into restrant array
    //         var restaurantsArr = [];
    //         var count = this.state.restaurants.length;

    //         let userID = this.state.userID;

    //         var api = 'http://0.0.0.0:5000/api/v1.0/generatebusinessdata/' + userID;
    //         this.setState({
    //             getFiveIsLoading: true
    //         })
    //         var tenUsers = [];

    //         axios
    //             .get(api)
    //             .then(res => {
    //                 // console.log(res.data.business_data);
    //                 restaurantsArr = res.data.business_data;

    //                 this.setState({
    //                     eIDs: tenUsers,
    //                     getFiveIsLoading: false,
    //                     restaurants: restaurantsArr,
    //                     isLoading: false,
    //                     //Seattle
    //                     currentLocation: {
    //                         lat: restaurantsArr[0].coordinates.latitude,
    //                         lng: restaurantsArr[0].coordinates.longitude
    //                     }
    //                 })

    //             })
    //             .catch(err => {
    //                 console.log(err.data);
    //             });
    //     }
    // }

    // get ten random user ids from backend
    getTenUsers = event => {

        event.preventDefault();
        this.setState({
            eIDs: []
        })
        var api = 'http://0.0.0.0:5000/api/v1.0/generateusers/';
        this.setState({
            get10ExistingUsersIsLoading: true
        })
        var tenUsers = [];

        axios
            .get(api)
            .then(res => {
                // console.log(res);
                console.log(res.data.users);
                let i;
                for (i = 0; i < res.data.users.length; i++) {
                    tenUsers.push({ key: i + 1, text: 'Exsiting user ' + (i + 1), value: res.data.users[i] });
                }
                this.setState({
                    eIDs: tenUsers,
                    get10ExistingUsersIsLoading: false
                })
            })
            .catch(err => {
                console.log(err.data);
            });

    }

    // get recommended restaurants ids from backend
    handleSubmit = event => {
        this.setState({
            restaurants: []
        })
        if (this.state.userID !== '') {
            event.preventDefault();
            let userID = this.state.userID;
            var api = 'http://0.0.0.0:5000/api/v1.0/generaterecommendations/' + userID;
            this.setState({
                isLoading: true
            })

            axios
                .get(api)
                .then(res => {
                    // console.log(res);
                    console.log(res.data);
                    this.setState({
                        rIDs: res.data.businesses,
                        isLoading: false
                    })
                })
                .catch(err => {
                    console.log(err.data);
                });
        }
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
                    <Grid.Column width={10}>
                        <Button color="teal" onClick={this.getTenUsers} postive content='Get 10 existing users from Yelp dataset' />
                        {this.state.get10ExistingUsersIsLoading ? <Icon name='spinner'>Loading...</Icon> : ''}
                        <Header>Choose a existing user</Header>
                        <Dropdown
                            button
                            className='icon'
                            fluid
                            labeled
                            icon='user outline'
                            options={this.state.eIDs}
                            selection
                            placeholder='Pick an existing user ID'
                            valve={this.state.userID}
                            onChange={this.onChangeUser}
                        />
                        <p></p>
                        <Button onClick={this.handleSubmit} color="teal" postive content='Submit' />
                        {this.state.isLoading ? <Icon name='spinner'>Loading...</Icon> : ''}
                        <Divider />
                        <ItemList items={restaurants} />
                        <p></p>
                        {this.state.restaurants.length < 30 ?
                            <Button color="teal" onClick={this.getFive} postive content='Get 5 recommended restaurants' />
                            :
                            <p>Only showing 30 recommended restaurants.</p>}
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <GMap items={this.state.restaurants} currentLocation={this.state.currentLocation} />
                    </Grid.Column>
                </Grid>
            </Container>

        )
    }
}

export default ExistingUser;