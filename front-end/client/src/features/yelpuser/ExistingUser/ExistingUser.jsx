import React, { Component } from 'react'
import { Grid, Container, Dropdown, Header, Divider, Button } from 'semantic-ui-react';
import BusinessList from '../ExistingUser/BusinessList';
import SideMenu from '../../SideMenu/SideMenu';
import axios from 'axios';

const locationSearched = 'las vegas';

const users = [
    { key: '1', text: '3nDUQBjKyVor5wV0reJChg', value: '3nDUQBjKyVor5wV0reJChg' },
    { key: '2', text: '3nDUQBjKyVor5wV0reJChg', value: '3nDUQBjKyVor5wV0reJChg' }
]

class ExistingUser extends Component {
    state = {
        restaurants: [],
        userID: '',
        testingObj: {
            "businesses": [
                "RwMLuOkImBIqqYj4SSKSPg",
                "8GOle3PqqZnni4U-vXBKQA",
                "AMTNJbYbu0OMMAkx4meQxw",
                "YTCCJ3ShO-zg0dlx1nk6dw",
                "OETh78qcgDltvHULowwhJg",
                "LpGCzgAKNSpzDNEUMVVtZA"
            ],
            "code": "success"
        }
    }

    // !!!!!!!!!! not done
    handleSubmit = event => {
        event.preventDefault();

        var userID = this.state.userID;

        var api = 'http://0.0.0.0:5000/api/v1.0/generaterecommendations/' + userID;

        console.log('I was here, called API: ' + api);
        axios
            .post(api)
            .then(res => {
                // console.log(res);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err.data);
            });

        // need a loop to 'put' each object into restrant array
        var restaurantsArr = [];
        var yelpAPI;

        console.log('@@@@@@ yelpAPI here: ' + yelpAPI);


        for (let i = 0; i < this.state.testingObj.businesses.length; i++) {

            yelpAPI = `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/` + this.state.testingObj.businesses[i];

            restaurantsArr.push(
                axios.get(yelpAPI, {
                    headers: {
                        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
                    }
                }).then(
                    result => new Promise(resolve => {
                        setTimeout(() => {
                            resolve(result.data)
                        }, 2000)
                    })
                ).catch((err) => {
                    console.log('error')
                })
            );

        }

        Promise.all(restaurantsArr).then(res => {
            console.log('testing-------------')
            console.log(res)
        });

        axios.get(yelpAPI, {
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
            }
        })
            .then((res) => {
                console.log(res)
                //testing
                // restaurantsArr.put(res.data);
                this.setState({ restaurants: restaurantsArr })
                //fail
                console.log('restaurantsArr:  ??????' + restaurantsArr);
            })
            .catch((err) => {
                console.log('error')
            })
        // this.state.restaurants.push();
    }

    onChangeUser = (e, data) => {
        // console.log('data.value ' + data.value);
        this.setState({
            userID: data.value
        });
    }

    componentDidMount() {
        // console.log('~~~~~~ Print the restraunants in json :' + this.state.testingObj.businesses[0]);


        // axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=${locationSearched}`, {
        //     headers: {
        //         Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
        //     },
        //     params: {
        //         categories: 'breakfast_brunch',
        //     }
        // })
        //     .then((res) => {
        //         console.log(res)
        //         this.setState({ restaurants: res.data.businesses })
        //         console.log(res.data.businesses);
        //     })
        //     .catch((err) => {
        //         console.log('error')
        //     })
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
                        <Button onClick={this.handleSubmit} postive content='Submit' />
                        <Divider />
                        <BusinessList items={restaurants} />
                    </Grid.Column>
                </Grid>
            </Container>

        )
    }
}

export default ExistingUser;