import React from 'react';
import {Row, Col, Tabs, Tab} from "react-bootstrap";
import './index.scss'
import AuthFirebaseUI from "./AuthFirebaseUI";
import UserRegistration from "./UserRegistration";
import UserLogIn from "./UserLogIn";
import DriverRegistration from "./DriverRegistration";
import DriverLogIn from "./DriverLogIn";

const Index = ( {props ,setRoleDriver,setRoleClient}) => {
    // const setRoleFromFirebaseUI = (role) => {
    //     props.submitAuth(role)
    // }
    /******************************************************************************************************
     * Render
     **************************************************************************************************** */
    return (
        <Row className={"AuthContainer"}>
            <div className={"AuthContainerBlackLine"}/>
            <Col sm={0} md={6} lg={6} className="d-none d-md-block">
                <div className={"AuthLeftContainer"}>
                    <div className={"AuthLeftContainerHeader"}>TRUCKS</div>
                    <div className={"AuthLeftContainerText"}>We want you to move freely, make the most of your time, and
                        be connected to the people and places that matter most to you. That’s why we are committed to
                        safety, from the creation of new standards to the development of technology with the aim of
                        reducing incidents.
                    </div>
                </div>
            </Col>
            <Col sm={12} md={6} lg={6} className={"AuthContainerInputFormCol"}>
                <div className={"AuthContainerAll"}>
                    <AuthFirebaseUI
                        setRoleDriver={setRoleDriver}
                        setRoleClient={setRoleClient}
                    />
                </div>
            </Col>
        </Row>
    );
};

export default Index;