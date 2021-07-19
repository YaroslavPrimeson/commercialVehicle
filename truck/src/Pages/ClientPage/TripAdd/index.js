import React, { useState} from 'react';
import {Container, Col, Row, InputGroup, FormControl, Tab, Tabs, Form} from 'react-bootstrap'
import Button from '../../../Components/Common/Button'
import InputForm from '../../../Components/NonameComponents/InputForm'
import {clientShipping, checkProblem, setDataToFirebase} from "../../../Helper";
import {getDate} from "../../../Helper/adminHelper";
import '../index.scss'


const Index = ({onSubmitShipment}) => {
    const [problem, setProblem] = useState([])
    const [forms, setForms] = useState(clientShipping)

    const sendResult = (forms) => {
        setForms(forms)
    }
    /***************************************************************************
     ** Trip add to store
     ***************************************************************************/
    const clickBtn = () => {
        if (checkProblem(forms).length > 0) {
            setProblem(checkProblem(forms))
            return
        }
        let shippingForm = {}
        forms.map(el => {
                shippingForm = {...shippingForm, [el.key]: el.value}
            }
        )
        shippingForm = {
            ...shippingForm,
            date__adding: getDate(),
            uid__client: localStorage.getItem('uid__trucks')
        }
        onSubmitShipment(shippingForm)
    }

    return (
        /******************************************************************************************************
         * Render
         **************************************************************************************************** */
        <div className={'shipment-add'}>
            <Container>
                <Row>
                    <Col>
                        <h5>What are you shipping</h5>
                        <Row>
                            <div className={'ShipmentAddForm'}>
                                <InputForm sendResult={sendResult}
                                           model={clientShipping}
                                           problem={problem}/>
                            </div>
                        </Row>
                        <Button click={clickBtn} text={"Next step"}/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Index