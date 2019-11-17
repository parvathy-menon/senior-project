// this is a testing file
import React, { Component, Fragment } from 'react'
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getItems } from '../app/actions/itemActions';
import PropTypes from 'prop-types';
import TestingItemListItem from './TestingItemListItem';

class ItemList extends Component {

    // when bring in a action, this action must store in the props
    static propTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }

    // call the getItems function from props
    componentDidMount() {
        this.props.getItems();
    }

    render() {
        // const { items } = this.props.item;
        const items = this.props.item.items;
        return (
            <Container className='main'>
                {/* <Button
                    content="add item"
                    onClick={() => {
                        const name = prompt('Enter Item name');
                        if (name) {
                            this.setState(state => ({
                                items: [...state.items, { id: uuid(), name }]
                            }))
                        }
                    }}>
                </Button> */}
                {this.props.isAuthenticated ?
                    <Fragment>
                        {items.map(item => (
                            <TestingItemListItem key={item.id} item={item} />
                        ))}
                    </Fragment>
                    : "Please login to see items."
                }
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    // look at the reducer index file -> item: itemReducer
    item: state.item
});

export default connect(
    mapStateToProps,
    { getItems }
)(ItemList);