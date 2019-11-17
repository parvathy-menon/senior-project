import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

export default class SideMenu extends Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <Menu secondary vertical>
                <Menu.Item
                    name='home'
                    active={activeItem === 'home'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='profile'
                    active={activeItem === 'profile'}
                    onClick={this.handleItemClick}
                />
            </Menu>

        )
    }
}
