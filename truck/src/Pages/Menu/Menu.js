import React, {useState} from 'react';
import './Menu.scss';
import {Col, Row} from 'react-bootstrap'


const Menu = (props) => {
    const [open, setOpen] = useState(false);
    const clickPage = (index) => {
        setOpen(!open)
        props.clickPage(index)
    };
    return (
        <Row className={"bottom__menu__container"}>
            {props.menuPages.map((m, index) => (
                <Col sm={4} key={index}>
                    <div className={"menu__item"} onClick={() => clickPage(index)}>{m}</div>
                </Col>
            ))}
        </Row>
    );
};

export default Menu;