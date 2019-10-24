import React, { Component, Fragment } from 'react'
import BusinessListItem from './BusinessListItem';

class BusinessList extends Component {
    render() {
        return (
            <Fragment>
                {this.props.items.map(item => (
                    <BusinessListItem key={item.id} item={item} />
                ))}
            </Fragment>
        )
    }
}

export default BusinessList;