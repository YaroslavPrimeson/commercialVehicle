import React from 'react';
import {Form} from 'react-bootstrap'
import '../index.scss'

const Index = (props) => {
    return (
        <>
            <Form.Label style={props.styleProblem}>
                {props.problemMsg === "" ? ("Enter " + props.el.keyText + ":") : (props.problemMsg)}
            </Form.Label>
            <Form.Control
                type={props.type}
                placeholder={props.el.keyText}
                name={props.el.keyText}
                onChange={(e) => props.handle(props.el, e)}
            />
        </>
    );
};

export default Index;