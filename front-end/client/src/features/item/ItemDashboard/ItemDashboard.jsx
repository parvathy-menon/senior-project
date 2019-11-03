import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react';
import ItemList from '../ItemList/ItemList';
import SideMenu from '../../SideMenu/SideMenu';
import axios from 'axios';

const locationSearched = 'Las Vegas';

class ItemDashboard extends Component {
    state = {
        // items: itemsFromDashboard,
        restaurants: []
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
                console.log(res)
                this.setState({ restaurants: res.data.businesses })
                console.log(res.data.businesses);
            })
            .catch((err) => {
                console.log('error')
            })
    }

    render() {
        const { restaurants } = this.state;
        return (
            <Grid>
                <Grid.Column width={2}>
                    <SideMenu />
                </Grid.Column>
                <Grid.Column width={14}>
                    <ItemList items={restaurants} />
                </Grid.Column>
            </Grid>
        )
    }
}

export default ItemDashboard;