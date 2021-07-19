import React from 'react';
import {Row, Col} from 'react-bootstrap'

const Index = (props) => {
    return (
        <Row className={"DoubleButton " + props.classNameContainer}>
            <Col md={6}>
                <div className={"NonameBtn1 " + props.className1} onClick={() => props.click1()}>{props.text1}</div>
            </Col>
            <Col md={6}>
                <div className={"NonameBtn2 " + props.className2} onClick={() => props.click2()}>{props.text2}</div>
            </Col>
        </Row>
    );
};

export default Index;