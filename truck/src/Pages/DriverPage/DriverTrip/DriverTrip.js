import React, {useEffect, useState} from 'react';
import TrucksMap from "../../Map/TrucksMap";
import Button from "../../../Components/Common/Button";
import ExpandedCard from '../../Components/ExpandedCard'
import '../index.scss';
import ProfileClient from "../../Components/Profile/ProfileClient";



const DriverTrip = ({currentTrip, changeTrip, currentUserTrip, role, clickSenMsg}) => {
        /****************************************************************
         * state
         ****************************************************************/
        const [showDetails, setShowDetails] = useState(false);
        const [visibleProfile, setVisibleProfile] = useState(false);
        const profilePageFunc = () => {
            setVisibleProfile(prevState => !prevState)
        }
    /****************************************************************
     * driver === current trip
     ****************************************************************/
        const [activeDriverTrip, setActiveDriverTrip] = useState()
        const searchDriverForTrip = () => {
            setActiveDriverTrip(currentUserTrip.find(el => el.uid_firebase === currentTrip.uid__driver))
        }
    /****************************************************************
     * update document
     ****************************************************************/
        useEffect(() => {
            searchDriverForTrip()
        }, [activeDriverTrip])
        /****************************************************************
         * Render
         ****************************************************************/
        return (
            <div className={"driver-trip"}>
                {showDetails ?
                    <div className={'driver-trip__expanded-block'}>
                        <ProfileClient
                            clickSenMsg={clickSenMsg} role={role} currentUserTrip={currentUserTrip}
                            currentTrip={currentTrip}
                            profilePageFunc={profilePageFunc} visibleProfile={visibleProfile}
                        />
                        <ExpandedCard data={currentTrip}/>
                        <Button
                            className={'map-button-show__details'}
                            text={'Show trip map'}
                            click={() => setShowDetails(!showDetails)}
                        />
                        <Button
                            className={'map-button-show__details'}
                            click={() => {
                                changeTrip(currentTrip,activeDriverTrip )
                                setShowDetails(!showDetails)
                            }}
                            text={currentTrip.status === "search driver" ? 'Accept' : currentTrip.status === "inWork" ? "Complete" : "info trip"}
                        />
                    </div>
                    :
                    <>
                        <TrucksMap isMarkerShown={true}/>
                        <Button
                            className={'map-button-show__map'}
                            text={'Show trip details'}
                            click={() => setShowDetails(!showDetails)}
                        />
                    </>
                }
            </div>
        );
    }
;

export default DriverTrip;