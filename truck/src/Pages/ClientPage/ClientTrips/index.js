import React, {useEffect, useState} from 'react';
import '../index.scss'
import 'react-toastify/dist/ReactToastify.css';
import TripAdd from '../TripAdd/index'
import {getCollection, setDocumentToCollection} from "../../../Helper/adminHelper";
import ClientTrip from './ClientTrip'
import TrucksMap from "../../Map/TrucksMap";
import AccordionTrip from "../../Components/AccordionTrip"
import {toast, ToastContainer, Slide} from "react-toastify";



const Index = ({getTrips, trips, role ,clickSenMsg}) => {
        const [addTripShow, setAddTripShow] = useState(false);
        // const [trips, setTrips] = useState([]);
        const [currentTrip, setCurrentTrip] = useState([]);
        const [showTable, setShowTable] = useState(true);
        const [buttonState, setButtonState] = useState({text: '', action: ''})
        const [showAddingMap, setShowAddingMap] = useState(false)
        // const [currentUser, setCurrentUser] = useState([])
        /***************************************************************************
         ** ToastContainer
         ***************************************************************************/
            const notify = () => toast.success('success!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: 0,
                limit: 1,
                transition: Slide,
            });
    useEffect(()=>{
        console.log(role)
    })
        /***************************************************************************
         ** Work with data base (get and set trip)
         ***************************************************************************/
        const onSubmitShipment = (data) => {
            data.status = 'search driver'
            setDocumentToCollection('trip', {
                ...data,
                uid__client: localStorage.getItem('uid__trucks')
            }).then(response => console.log(response))
            setCurrentTrip(data)
            setShowTable(false)
            setAddTripShow(false)
            setButtonState({text: 'Close', action: 'main'})
            setShowAddingMap(true)
            notify()
            getTrips()
        }

        const handleOpenCard = (data) => {
            setShowTable(!showTable)
            setCurrentTrip(data)
            setButtonState({text: 'Close', action: 'main'})

        }
        const handleButtonTop = (action) => {
            switch (action) {
                case 'main':
                    setShowTable(true)
                    setAddTripShow(false)
                    setButtonState({text: 'Add Trip', action: 'addTrip'})
                    setShowAddingMap(false)
                    return;
                case 'addTrip':
                    setShowTable(false)
                    setAddTripShow(true)
                    setButtonState({text: 'Close', action: 'main'})

                    return;
                default:
                    return;
            }
        }
    const [currentUserTrip, setCurrentUserTrip] = useState([]);
    const userArray = [];
    const findCurrentUser = () => {
        for (let i = 0; i < currentUserTrip.length; i++) {
            if (currentUserTrip[i].uid_firebase === localStorage.getItem("uid__trucks")) {
                userArray.push(currentUserTrip[i])
                localStorage.setItem("user", JSON.stringify(userArray))
            }
        }
    }
    useEffect(() => {
            getCollection('users').then(r => {
                setCurrentUserTrip(r);
            }).catch(e => {
                //Some catching errors
            })
        findCurrentUser()
    }, [trips])
        /***************************************************************************
         ** Render
         ***************************************************************************/
        return (
            <div>
                <div
                    className={"shipment__top__container__btn"}
                    onClick={
                        buttonState.action ? () => handleButtonTop(buttonState.action)
                            :
                            () => handleButtonTop('addTrip')
                    }
                >
                    {buttonState.text ? buttonState.text : "Add trip"}
                </div>

                {addTripShow &&
                <TripAdd onSubmitShipment={onSubmitShipment}/>}

                {showAddingMap &&
                <div className={'show-adding__map'}>
                    <TrucksMap isMarkerShown={true} currentTrip={currentTrip} text={'Searching your driver'}/>
                    <ToastContainer
                        position="top-center"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        transition={Slide}
                    />
                </div>
                }
                {!addTripShow && !showAddingMap && (
                    showTable ?
                        <AccordionTrip
                            trips={trips}
                            click={handleOpenCard}
                            role={'client'}
                        />
                        :
                        <ClientTrip
                            clickSenMsg={clickSenMsg}
                            role={role}
                            currentTrip={currentTrip}
                            currentUserTrip={currentUserTrip}
                        />)
                }
            </div>

        );
    }
;

export default Index;
