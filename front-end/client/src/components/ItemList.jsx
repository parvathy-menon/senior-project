// this is a testing file
import React, { Component } from 'react'
import axios from 'axios';

const locationSearched = 'San Francisco';

export default class ItemList extends Component {

    state = {
        restaurants: [

        ]
    }

    componentDidMount() {
        axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=${locationSearched}`, {
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
            },
            params: {
                categories: 'breakfast_brunch',
            }
        })
            .then((res) => {
                // console.log(res);
                console.log(res.data.businesses.region);
                this.setState({ restaurants : res});
            })
            .catch((err) => {
                console.log('error')
            })
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}
