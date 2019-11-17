import React, { Component } from 'react'
import { Segment, Item, Icon, Rating, Image, Grid } from 'semantic-ui-react';

class ItemListItem extends Component {
    render() {
        const { item } = this.props;
        return (
            <Grid called>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <Image src={item.image_url} href={item.url} target="_blank" size='medium' rounded />
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Segment.Group>
                            <Segment>
                                <Item.Group>
                                    <Item.Image size='tiny' circular src='' />
                                    <Item.Content>
                                        <Item.Header as='a' href={item.url} target="_blank"><h3>{item.name}</h3></Item.Header>
                                        <Rating icon='star' defaultRating={item.rating} maxRating={5} disabled />
                                        <Item.Meta>Price: {item.price}</Item.Meta>
                                        {/* comment out below block if the backend still missing the categories attribute */}
                                        <Item.Description>
                                            Category:
                                            {item.categories.map(category => (
                                                category.title + ' | '
                                            ))}
                                        </Item.Description>
                                    </Item.Content>
                                </Item.Group>
                            </Segment>
                            <Segment>
                                <span>
                                    <Icon name='phone' />
                                    {item.display_phone}
                                    <Icon name='map marker alternate' />
                                    {item.location.address1}, {item.location.city}, {item.location.state} {item.location.zip_code}
                                </span>
                            </Segment>
                        </Segment.Group>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default ItemListItem;