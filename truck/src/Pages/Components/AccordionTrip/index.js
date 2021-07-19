import React, {useEffect, useState} from 'react';
import '../index.scss'
import {Accordion, Button, Card} from "react-bootstrap";
import TableContainer from "../TableContainer"
import {fire} from "../../../Firebase/Firebase";


const Index = ({trips, click, role, changeTrip}) => {

    const [tripsFilterStatus, setTripsFilterStatus] = useState({inWork: [], completed: [], searchingDriver: []})
    useEffect(() => {
        if (role === 'driver') {
            setTripsFilterStatus({
                inWork: trips.filter((el) => el.uid__driver === localStorage.getItem('uid__trucks')).filter((el) => el.status === 'inWork'),
                completed: trips.filter((el) => el.uid__driver === localStorage.getItem('uid__trucks')).filter((el) => el.status === 'completed'),
                searchingDriver: trips.filter((el) => el.status === "search driver")
            })
        } else if (role === 'client') {
            setTripsFilterStatus({
                inWork: trips.filter((el) => el.uid__client === localStorage.getItem('uid__trucks')).filter((el) => el.status === 'inWork'),
                completed: trips.filter((el) => el.uid__client === localStorage.getItem('uid__trucks')).filter((el) => el.status === 'completed'),
                searchingDriver: trips.filter((el) => el.uid__client === localStorage.getItem('uid__trucks')).filter((el) => el.status === "search driver")
            })
        }
    }, [trips])



    /******************************************************************************************************
     * Render
     **************************************************************************************************** */
    return (
        <div>
            <Accordion defaultActiveKey="0">
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            <span className="accordion__triangle"> Search drive </span>
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <TableContainer
                                trips={tripsFilterStatus.searchingDriver}
                                click={click}
                                role={role}
                                changeTrip={changeTrip}
                            />
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                            <span className="accordion__triangle"> Active trip </span>
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            <TableContainer
                                trips={tripsFilterStatus.inWork}
                                click={click}
                                role={role}
                                changeTrip={changeTrip}
                            />
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="2">
                            <span className="accordion__triangle"> Completed trip</span>
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="2">
                        <Card.Body>
                            <TableContainer
                                trips={tripsFilterStatus.completed}
                                click={click}
                                role={role}
                                changeTrip={changeTrip}
                            />
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    );
};

export default Index;