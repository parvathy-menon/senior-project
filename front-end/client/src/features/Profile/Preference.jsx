import React, { Component, Fragment } from 'react';
import { Dropdown, Segment, Header, Divider, Button, Icon } from 'semantic-ui-react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ItemList from '../item/ItemList/ItemList';
var jwt = require('jsonwebtoken');

// const cities = [
//     { key: 'sjca', text: 'San Jose', value: 'sjca' },
//     { key: 'sfca', text: 'San Francisco', value: 'sfca' },
//     { key: 'fmca', text: 'Fremont', value: 'fmca' },
// ]

const american = [
    { key: '1', text: 'yes', value: true },
    { key: '2', text: 'no', value: false }
]

const chinese = [
    { key: '1', text: 'yes', value: true },
    { key: '2', text: 'no', value: false }
]

const mexican = [
    { key: '1', text: 'yes', value: true },
    { key: '2', text: 'no', value: false }
]

const vietnamese = [
    { key: '1', text: 'yes', value: true },
    { key: '2', text: 'no', value: false }
]

class Preference extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        const { auth } = props;
        // console.log("token : " + auth.token);

        var decoded = jwt.decode(auth.token, { complete: true });
        // console.log(decoded.payload);
        var userID = null
        if (decoded !== null) {
            userID = decoded.payload.id;
        }

        this.state = {
            // city: '',
            // selectedCity: null,
            userID: userID,
            restaurants: [],
            isLoading: false
        }
    }

    // not done, waiting for backend
    // getFive = event => {
    //     if (this.state.rIDs[0] !== undefined) {
    //         // need a loop to 'put' each object into restrant array
    //         var restaurantsArr = [];
    //         var yelpAPI;
    //         var count = this.state.restaurants.length;

    //         // works, but too many requests at the same time make yelp API deny
    //         for (let i = count; i < count + 5; i++) {

    //             yelpAPI = `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/` + this.state.rIDs[i];

    //             restaurantsArr.push(
    //                 axios.get(yelpAPI, {
    //                     headers: {
    //                         Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
    //                     }
    //                 }).then(
    //                     result => new Promise(resolve => {
    //                         this.setState({
    //                             isLoading: true
    //                         })
    //                         resolve(result.data)
    //                     })
    //                 ).catch((err) => {
    //                     console.log('error')
    //                 })
    //             );
    //         }

    //         Promise.all(restaurantsArr).then(res => {
    //             var tempArr = this.state.restaurants;
    //             var newRestArr = tempArr.concat(res);
    //             this.setState({
    //                 restaurants: newRestArr,
    //                 isLoading: false
    //             })
    //         });
    //     }

    // }

    componentDidMount() {
        // below code will crash the app when refresh this page, becareful
        // console.log("props " + this.props.auth.user._id);

        var userID = this.state.userID;

        if (userID !== null) {
            var address = '/api/preferences/' + userID;
            axios
                .get(address) // using the proxy
                .then(res => {
                    if (res) {
                        this.setState({
                            likes_american: res.data[0].likes_american,
                            likes_chinese: res.data[0].likes_chinese,
                            likes_mexican: res.data[0].likes_mexican,
                            likes_vietnamese: res.data[0].likes_vietnamese
                        });
                    } else {
                        console.log("Failed to load user data");
                    }
                })
                .catch(err => {
                    console.log(err.data);
                });
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        var userID = this.state.userID;

        // Headers
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        // Request body
        const body = {
            userID: userID,
            likes_american: this.state.likes_american,
            likes_chinese: this.state.likes_chinese,
            likes_mexican: this.state.likes_mexican,
            likes_vietnamese: this.state.likes_vietnamese
        };
        //console.log(body);
        axios
            .post('/api/preferences', body, config)
            .then(res => {
                // console.log(res);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err.data);
            });
    }

    // onChangeCity = (e, data) => {
    //     console.log(data.value);
    //     this.setState({
    //         selectedCity: data.value,
    //         city: data.valve
    //     });
    // }

    onChangeAmerican = (e, data) => {
        // console.log('data.value ' + data.value);
        this.setState({
            likes_american: data.value
        });
    }
    onChangeChinese = (e, data) => {
        // console.log(data.value);
        this.setState({
            likes_chinese: data.value
        });
    }
    onChangeMexican = (e, data) => {
        this.setState({
            likes_mexican: data.value
        });
    }
    onChangeVietnamese = (e, data) => {
        this.setState({
            likes_vietnamese: data.value
        });
    }

    render() {
        // works
        // const { isAuthenticated, user } = this.props.auth;

        // const {
        //     // city, selectedCity,
        //     // priceRange, selectedPriceRange,
        //     // category, selectedCategory
        // } = this.state;
        return (
            <Fragment>
                <Segment>
                    {/* <Header>City:</Header>
                    <Dropdown
                        button
                        className='icon'
                        fluid
                        labeled
                        icon='world'
                        options={cities}
                        search
                        text={city}
                        city={city}
                        value={selectedCity}
                        onChange={this.onChangeCity}
                    />
                    <Divider /> */}

                    {/* works */}
                    {/* <div>`${user._id}`</div> */}

                    <Header>Do you like American food</Header>
                    <Dropdown
                        button
                        className='icon'
                        fluid
                        labeled
                        icon='heart outline'
                        options={american}
                        selection
                        placeholder={this.state.likes_american ? "yes" : "no"}
                        valve={this.state.likes_american}
                        onChange={this.onChangeAmerican}
                    />
                    <Divider />
                    <Header>Do you like Chinese food</Header>
                    <Dropdown
                        button
                        className='icon'
                        fluid
                        labeled
                        icon='heart outline'
                        options={chinese}
                        selection
                        placeholder={this.state.likes_chinese ? "yes" : "no"}
                        valve={this.state.likes_chinese}
                        onChange={this.onChangeChinese}
                    />
                    <Divider />
                    <Header>Do you like Mexican food</Header>
                    <Dropdown
                        button
                        className='icon'
                        fluid
                        labeled
                        icon='heart outline'
                        options={mexican}
                        selection
                        placeholder={this.state.likes_mexican ? "yes" : "no"}
                        valve={this.state.likes_mexican}
                        onChange={this.onChangeMexican}
                    />
                    <Divider />
                    <Header>Do you like Vietnamese food</Header>
                    <Dropdown
                        button
                        className='icon'
                        fluid
                        labeled
                        icon='heart outline'
                        options={vietnamese}
                        selection
                        placeholder={this.state.likes_vietnamese ? "yes" : "no"}
                        valve={this.state.likes_vietnamese}
                        onChange={this.onChangeVietnamese}
                    />
                    <Divider />
                    <p></p>
                    <Button onClick={this.handleSubmit} postive content='Submit' />
                </Segment>
                <p>
                    {this.state.restaurants.length < 30 ?
                        <Button color="teal" onClick={this.getFive} postive content='Get 5 recommended restaurants' />
                        :
                        <p>Only showing 30 recommended restaurants.</p>}
                </p>
                {this.state.isLoading ? <Icon name='spinner'>Loading...</Icon> : ''}
                <ItemList items={this.state.restaurants} />
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    null
)(Preference);

