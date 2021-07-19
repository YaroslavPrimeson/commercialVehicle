import React, {useEffect, useState} from 'react';
import Input from '../../Common/Input/index'
import {Form} from "react-bootstrap";
import {generateNormalName} from "../../../Helper";

const Index = ({model, sendResult, problem}) => {
    useEffect(() => {
        console.log(model)
    })
    const [rows, setRows] = useState([])
    useEffect(() => {
        Object.entries(model).forEach((model, index) => {
            let row = {
                // key: model[0],
                key: generateNormalName(model[0]).key,
                keyText: generateNormalName(model[0]).key,
                type: typeof model[1],
                options: generateNormalName(model[0]).type,
                value: model[1]
            };
            setRows(prevState => [...prevState, row])
        })
    }, []);
    useEffect(() => {
        sendResult(rows);
    }, [rows]);
    const handle = (el, e) => {
        rows.forEach((r) => {
            if (el.key === r.key) {
                rows[rows.indexOf(r)] = {...r, value: e.target.value}
            }
        });
        sendResult(rows);
    };
    const getInput = (el) => {
        let hide = false
        el.options.forEach((opt) => {
            if (opt === 'H') {
                hide = true
            }
        })

        if (hide) {
            return <></>
        }
        let styleProblem = {};
        let problemMsg = "";
        problem.forEach((p) => {
            if (p.el.key === el.key) {
                styleProblem = {color: "red"};
                problemMsg = p.msg;
            }
        });
        switch (el.type) {
            case "string" :
                return (
                    <>
                        <Input
                            type={'text'}
                            problemMsg={problemMsg}
                            styleProblem={styleProblem}
                            el={el}
                            handle={handle}
                        />
                    </>
                );
            case "number":
                return (
                    <>
                        <Form.Label style={styleProblem}>{el.keyText}</Form.Label>
                        <Form.Control
                            type={'number'}
                            placeholder={`Enter tour ${el.keyText}`}
                            name={el.keyText}
                            onChange={(e) => handle(el, e)}
                        />
                    </>
                );
            case 'object':
                return (
                    <>
                        <Form.Label style={styleProblem}>{el.keyText}</Form.Label>
                        <Form.Control
                            type={'file'}
                            placeholder={`Enter tour ${el.keyText}`}
                            name={el.keyText}
                            onChange={(e) => handle(el, e)}
                        />
                    </>
                );
        }
    };
    /******************************************************************************************************
     * Render
     **************************************************************************************************** */
    return (
        <div className={'InputForm'}>
            {rows?.map((el, index) => {
                return (
                    <Form.Group controlId={"formBasic" + index} key={index}>
                        {getInput(el)}
                    </Form.Group>
                )
            })}
        </div>
    );
};

export default Index;