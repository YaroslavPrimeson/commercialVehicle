import React from 'react';
import '../index.scss'

const Index = (props) => {
    return (
        <div className={"NonameBtn " + props.className} onClick={() => props.click()}>{props.text}</div>
    );
};

export default Index;