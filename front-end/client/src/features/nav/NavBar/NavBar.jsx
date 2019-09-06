import React, { Component } from 'react'
import { Menu, Container, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
    render() {
        return (
            <Menu inverted fixed="top">
                <Container>
                    <Menu.Item header>
                        <img src="assets/logo.png" alt="logo" />
                        <Link to="/">
                            Yelp Recommnender
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/itemdashboard">
                            Items
                        </Link>
                    </Menu.Item>
                    <Menu.Item position="right">
                        <Link to="/profile">
                            Profile
                        </Link>
                        <Button basic inverted content="Login" />
                        <Button basic inverted content="Sign Out" style={{ marginLeft: '0.5em' }} />
                    </Menu.Item>
                </Container>
            </Menu>
        )
    }
}

export default NavBar;
