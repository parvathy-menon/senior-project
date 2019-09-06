import React, { Component, Fragment } from 'react';
import { Dropdown, Segment, Header, Divider, Button } from 'semantic-ui-react';

const cities = [
    { key: 'sjca', text: 'San Jose', value: 'sjca' },
    { key: 'sfca', text: 'San Francisco', value: 'sfca' },
    { key: 'fmca', text: 'Fremont', value: 'fmca' },
]
const priceRanges = [
    { key: '1', text: '$', value: '$' },
    { key: '2', text: '$$', value: '$$' },
    { key: '3', text: '$$$', value: '$$$' },
    { key: '4', text: '$$$$', value: '$$$$' },
    { key: '5', text: '$$$$$', value: '$$$$$' }
]
const categories = [
    { key: '1', text: 'American', value: 'ame' },
    { key: '2', text: 'Spanish', value: 'spa' },
    { key: '3', text: 'Chinese', value: 'chi' },
    { key: '4', text: 'Philippine', value: 'phi' }
]

class Preference extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: '',
            selectedCity: null,
            priceRange: '',
            selectedPriceRange: null,
            category: '',
            selectedCategory: null
        }
    }

    handleSubmit = () => {
        console.log("You clicked the submit button.")
    }

    onChangeCity = (e, data) => {
        console.log(data.value);
        this.setState({
            selectedCity: data.value,
            city: data.valve
        });
    }

    onChangePriceRange = (e, data) => {
        console.log(data.value);
        this.setState({ 
            selectedPriceRange: data.value,
            priceRange: data.value
        });
    }

    onChangeCategory = (e, data) => {
        console.log(data.value);
        this.setState({ 
            selectedCategory: data.value,
            category: data.value
        });
    }

    render() {
        const { 
            city, selectedCity,
            priceRange, selectedPriceRange,
            category, selectedCategory
        } = this.state;
        return (
            <Fragment>
                <Segment>
                    <Header>City:</Header>
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
                    <Divider/>
                    <Header>Price Range:</Header>
                    <Dropdown
                        button
                        className='icon'
                        fluid
                        labeled
                        icon='dollar sign'
                        options={priceRanges}
                        search
                        text={priceRange}
                        priceRange={priceRange}
                        value={selectedPriceRange}
                        onChange={this.onChangePriceRange}
                    />
                    <Divider/>
                    <Header>Category:</Header>
                    <Dropdown
                        button
                        className='icon'
                        fluid
                        labeled
                        icon='coffee'
                        options={categories}
                        search
                        text={category}
                        category={category}
                        value={selectedCategory}
                        onChange={this.onChangeCategory}
                    />
                    <p></p>
                    <Button onClick={this.handleSubmit} postive content='Submit' />
                </Segment>
            </Fragment>
 

        );
    }
}

export default Preference
