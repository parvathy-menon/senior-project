import React, { Component, Fragment } from 'react'
import ItemListItem from './ItemListItem';

class ItemList extends Component {
    render() {
        return (
            <Fragment>
            {this.props.items.map(item => (
                <ItemListItem key={item.id} item={item}/>
            ))}
            </Fragment>
        )
    }
}

export default ItemList;