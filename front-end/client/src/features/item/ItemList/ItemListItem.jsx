import React, { Component } from 'react'
import { Segment, Item, Icon, Rating, Image, Grid } from 'semantic-ui-react';

class ItemListItem extends Component {
    render() {
        const { item } = this.props;
        return (
            <Grid called>
                <Grid.Row>
                    <Grid.Column width={3}>
                        <Image src={item.image_url} href={item.url} size='small' rounded />
                    </Grid.Column>
                    <Grid.Column width={13}>
                        <Segment.Group>
                            <Segment>
                                <Item.Group>
                                    <Item.Image size='tiny' circular src='' />
                                    <Item.Content>
                                        <Item.Header as='a' href={item.url} target="_blank"><h3>{item.name}</h3></Item.Header>
                                        <Rating icon='star' defaultRating={item.rating} maxRating={5} disabled />
                                        <Item.Meta>{item.price}</Item.Meta>
                                        <Item.Description>
                                            Category:
                                            {item.categories.map(category => (
                                                category.title
                                            ))}
                                        </Item.Description>
                                    </Item.Content>
                                </Item.Group>
                            </Segment>
                            <Segment>
                                <span>
                                    <Icon name='phone' />
                                    {item.phone}
                                    <Icon name='map marker alternate' />
                                    {item.location.display_address}
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