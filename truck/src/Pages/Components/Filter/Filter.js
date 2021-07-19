import React from 'react';
import {Accordion, Button, Card} from "react-bootstrap";

const Filter = ({setFilter}) => {
    return (
        <>
            <Accordion defaultActiveKey="1" style={{height: "100%"}}>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Filter
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <div>
                                <input
                                    style={{width: "100%", fontSize: "16px", fontWeight: "100", padding: "15px"}}
                                    type="text"
                                    placeholder={"Search filter..."}
                                    onChange={(e) => setFilter(e.target.value.toLowerCase())}
                                />
                            </div>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </>
    );
}
export default Filter;