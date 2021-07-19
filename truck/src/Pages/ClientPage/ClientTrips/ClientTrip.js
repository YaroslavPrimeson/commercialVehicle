import React, {useEffect, useState} from 'react';
import TrucksMap from "../../Map/TrucksMap";
import Button from "../../../Components/Common/Button";
import ExpandedCard from '../../Components/ExpandedCard';
import '../index.scss';
import userLogo from "../../Components/iconSvg/userLogo.svg";
import ProfileClient from "../../Components/Profile/ProfileClient";


const ClientTrip = ({currentTrip, currentUserTrip, role,clickSenMsg}) => {

    const [showDetails, setShowDetails] = useState(false);
    const [visibleProfile, setVisibleProfile] = useState(false);
    const profilePageFunc = () => {
        setVisibleProfile(!visibleProfile)
    }
    /****************************************************************
     * Render
     ****************************************************************/
    return (
        <div className={'client-trip'}>
            {showDetails ?
                <>
                    {currentTrip.status !== "search driver" ?
                        <ProfileClient
                            clickSenMsg={clickSenMsg}
                            role={role} currentUserTrip={currentUserTrip} currentTrip={currentTrip}
                            profilePageFunc={profilePageFunc} visibleProfile={visibleProfile}/>
                        :
                        null}
                    <div className={'client-trip__expanded-card'}>
                        <ExpandedCard data={currentTrip}/>
                        <Button
                            className={'map-button-show__details'}
                            text={'Show trip map'}
                            click={() => setShowDetails(!showDetails)}
                        />
                    </div>
                </>
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
};

export default ClientTrip;