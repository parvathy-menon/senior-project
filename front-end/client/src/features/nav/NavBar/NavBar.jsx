import React, { Component, Fragment } from 'react'
import { Menu, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Register from '../../../components/auth/Register';
import Logout from '../../..//components/auth/Logout';
import Login from '../../../components/auth/LoginModal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginModal from '../../../components/auth/LoginModal';

class NavBar extends Component {

    state = {
        //future use
        isOpen: false
    }

    //future use
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    };

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <Fragment>
                <Menu.Item>
                    <span className='navbar-text mr-3'>
                        <strong>{user ? `Welcome ${user.name}` : ''}</strong>
                        {/* jun, use below code to get user id in the redux store */}
                        {/* <strong>{user ? `Welcome ${user._id}` : ''}</strong> */}
                    </span>
                </Menu.Item>
                <Menu.Item>
                    <Logout />
                </Menu.Item>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <Menu.Item>
                    <Register />
                </Menu.Item>
                <Menu.Item>
                    <LoginModal />
                </Menu.Item>
            </Fragment>
        );

        return (
            <Menu inverted fixed="top">
                <Container>
                    <Menu.Item header>
                        <img src="assets/logo.png" alt="logo" />
                        <Link to="/">
                            Yelp Recommender
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/itemdashboard">
                            Items
                        </Link>
                    </Menu.Item>
                    <Menu.Item position="right">
                        {/* <Link to="/profile">
                            Profile
                        </Link>
                        <Button basic inverted content="Login" />
                        <Button basic inverted content="Sign Out" style={{ marginLeft: '0.5em' }} /> */}

                        {isAuthenticated ? authLinks : guestLinks}

                    </Menu.Item>
                </Container>
            </Menu>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    null
)(NavBar);