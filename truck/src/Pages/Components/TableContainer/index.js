import React, {useEffect} from 'react';
import Button from "../../../Components/Common/Button/index";
import "../index.scss";
import user from "../../Components/iconSvg/userLogo.svg"

const Index = ({trips, click, role, changeTrip}) => {

    const activeDriverTrip = JSON.parse(localStorage.getItem("user"))

    /******************************************************************************************************
     * Render
     **************************************************************************************************** */
    return (
        <div className={"shipment__inner"}>
            <div className={"shipment__table"}>
                <div className={'shipment__table--card-container'}>
                    {!!trips.length ?
                        trips.map((trip) => (
                                <div key={trip.idPost}
                                     className={trip.status === 'searching driver' ? "shipment__cell__container searching__trucks" : "shipment__cell__container"}
                                     onClick={() => click(trip)}>
                                    <div className={'shipment__cell__top shipment__cell__string'}>
                                        <div className={'shipment__cell__top__left'}>
                                            <p className={'shipment__cell__top__date'}>{trip['date']}</p>
                                        </div>
                                    </div>
                                    <div className={"shipment__cell__middle shipment__cell__string"}>
                                        <p>{trip['address loading']}</p>
                                    </div>
                                    <div className={'shipment__cell__bottom shipment__cell__string'}>
                                        <p>{trip['address unloading']}</p>
                                        <div>
                                        </div>
                                    </div>
                                    {role === "client" && trip.status !== "search driver" ?
                                    <div className="shipment__cell__img__container">
                                        <img className="shipment__cell__img" src={user} alt="#"/>
                                        </div> :
                                        null
                                    }
                                    {role === 'driver' ? (
                                        <>
                                            <div className="shipment__cell__img__container">
                                                <img className="shipment__cell__img" src={user} alt="#"/>
                                            </div>
                                            <div onClick={(e) => e.stopPropagation()}>
                                                <Button
                                                    className="shipment__table__accept__btn"
                                                    click={() => changeTrip(trip,activeDriverTrip)}
                                                    text={trip.status === "search driver" ? 'Accept' : trip.status === "inWork" ? "Complete" : "info trip"}
                                                />
                                            </div>
                                        </>
                                    ) : null
                                    }
                                </div>
                            )
                        )
                        :
                        <h2>No data</h2>
                    }
                </div>
            </div>
        </div>

    );
};

export default Index;