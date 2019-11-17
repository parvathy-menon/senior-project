import React, { Component } from 'react';
import { InfoWindow, Marker } from 'google-maps-react';


class MarkerWithInfoWindow extends Component {

    constructor() {
        super();
        this.state = {
            isOpen: false
        }
        this.onToggleOpen = this.onToggleOpen.bind(this);
    }

    onToggleOpen() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (<Marker
            position={this.props.position}
            onClick={this.onToggleOpen}>
            {this.state.isOpen && <InfoWindow onCloseClick={this.onToggleOpen}>
                <h3>{this.props.content}</h3>
            </InfoWindow>}
        </Marker>)
    }
}

export default MarkerWithInfoWindow;