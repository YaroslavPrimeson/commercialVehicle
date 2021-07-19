import React from 'react';
import {Form} from "react-bootstrap";

const Index = (props) => {
    return (
        <Form.Check className={props.className} type="checkbox" label={props.label} onChange={(e) => console.log(e.target.checked)}/>
    );
};

export default Index;