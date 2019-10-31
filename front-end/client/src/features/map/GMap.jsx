
import React from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import Paper from 'material-ui/Paper';
import Typography from '@material-ui/core/Typography';
import { typography } from 'material-ui/styles';

const G_API_KEY = process.env.GOOGLE_API_KEY

const style = {
    width: '28vw',
    height: '75vh',
    'marginLeft': 'auto',
    'marginRight': 'auto'
}

class GMap extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         showingInfoWindow: false,
    //         activeMarker: {},
    //         selectedPlace: {}
    //     }
    //     // binding this to event-handler functions
    //     this.onMarkerClick = this.onMarkerClick.bind(this);
    //     this.onMapClick = this.onMapClick.bind(this);
    //     console.log("G_API_KEY : " + G_API_KEY);
    // }
    // onMarkerClick = (props, marker, e) => {
    //     this.setState({
    //         selectedPlace: props,
    //         activeMarker: marker,
    //         showingInfoWindow: true
    //     });
    // }
    // onMapClick = (props) => {
    //     if (this.state.showingInfoWindow) {
    //         this.setState({
    //             showingInfoWindow: false,
    //             activeMarker: null
    //         });
    //     }
    // }
    // render() {
    //     const style = {
    //         width: '28vw',
    //         height: '75vh',
    //         'marginLeft': 'auto',
    //         'marginRight': 'auto'
    //     }
    //     return (
    //         <Map
    //             item
    //             xs={12}
    //             style={style}
    //             google={this.props.google}
    //             onClick={this.onMapClick}
    //             zoom={14}
    //             initialCenter={{ lat: 39.648209, lng: -75.711185 }}
    //         >
    //             <Marker
    //                 onClick={this.onMarkerClick}
    //                 title={'Changing Colors Garage'}
    //                 position={{ lat: 39.648209, lng: -75.711185 }}
    //                 name={'Changing Colors Garage'}
    //             />
    //             <InfoWindow
    //                 marker={this.state.activeMarker}
    //                 visible={this.state.showingInfoWindow}
    //             >
    //                 <Paper>
    //                     <Typography
    //                         variant='headline'
    //                         component='h4'
    //                     >
    //                         Changing Colors Garage
    //                     </Typography>
    //                     <Typography
    //                         component='p'
    //                     >
    //                         98G Albe Dr Newark, DE 19702 <br />
    //                         302-293-8627
    //                     </Typography>
    //                 </Paper>
    //             </InfoWindow>
    //         </Map>
    //     );
    // }

    constructor(props) {
        super(props);

        this.state = {
            stores: [{ lat: 47.49855629475769, lng: -122.14184416996333 },
            { latitude: 47.359423, longitude: -122.021071 },
            { latitude: 47.2052192687988, longitude: -121.988426208496 },
            { latitude: 47.6307081, longitude: -122.1434325 },
            { latitude: 47.3084488, longitude: -122.2140121 },
            { latitude: 47.5524695, longitude: -122.0425407 }]
        }
    }

    displayMarkers = () => {
        return this.state.stores.map((store, index) => {
            return <Marker key={index} id={index} position={{
                lat: store.latitude,
                lng: store.longitude
            }}
                onClick={() => console.log("You clicked me!")} />
        })
    }

    render() {
        return (
            <Map
                google={this.props.google}
                zoom={8}
                style={style}
                initialCenter={{ lat: 47.444, lng: -122.176 }}
            >
                {this.displayMarkers()}
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDFLDaxAATphACRnvpwwYCiFpubEuqXsmI'
})(GMap)