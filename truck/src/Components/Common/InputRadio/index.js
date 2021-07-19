import React from 'react';
import "./index.scss"

const Index = ({name, data}) => {
    return (
        <>{data?.map(el => {
            return (<div className={'FormRadio inputs'} key={el.id}>
                <input type={'radio'} id={el.id} name={name} value={el.id} onChange={(e) => console.log(e.target)}/>
                <label className={'LabelRadio'} htmlFor={el.id}>{el.value}</label>
            </div>)
        })}</>
            );
        };

            export default Index;