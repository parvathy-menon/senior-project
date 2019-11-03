import React, { Component } from 'react'
import { Segment, Item, Icon, Rating, Grid } from 'semantic-ui-react';


class TestingItemListItem extends Component {
    render() {
        const { item } = this.props;
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={3}>
                    image
                    </Grid.Column>
                    <Grid.Column width={13}>
                        <Segment.Group>
                            <Segment>
                                <Item.Group>
                                    <Item.Image size='tiny' circular src='' />
                                    <Item.Content>
                                        <Item.Header as='a'>{item.name}</Item.Header>
                                        <Rating icon='star' defaultRating={2} maxRating={5} disabled />
                                      
                                        <Item.Description>
                                            Category:
                                      
                                        </Item.Description>
                                    </Item.Content>
                                </Item.Group>
                            </Segment>
                            <Segment>
                                <span>
                                    <Icon name='phone' />
                                 
                                    <Icon name='map marker alternate' />
                                    
                                </span>
                            </Segment>
                        </Segment.Group>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default TestingItemListItem;
