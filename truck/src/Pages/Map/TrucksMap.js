import React, {useEffect, useState} from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';
import getPosition from './navigation'
import './index.scss'
import DriverTrip from "../DriverPage/DriverTrip/DriverTrip";

const MapContainer = ({google, text, currentTrip,update,trip}) => {
    const [position, setPosition] = useState({})
    const [received, setReceived] = useState()
    const [showMap, setShowMap] = useState(true)

    useEffect(() => {
        getPosition.then(r => {
            setPosition({lat: r.lat, lng: r.lon})
        }).finally(() => setReceived(!received))
    }, [])


    return (
        <> {showMap ?
            <div className={'TrucksMap'}>
                {received &&
                    <Map
                        google={google}
                        zoom={14}
                        initialCenter={position}
                    />
                }
                <div className={'SearchingFilter'}>
                    <div className={'SearchingTitle'}>{text}</div>
                </div>
            </div>
            :
            <div>
                <DriverTrip trip={currentTrip} update={update} />
            </div>
        }

        </>
    );
};


export default GoogleApiWrapper(
    {
        apiKey: 'AIzaSyATNI3BFVFYGHc5rpYfJYzxDN1-m0g_ArY'
    }
)(MapContainer);