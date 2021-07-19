import React, {useEffect, useState} from 'react';
import './index.scss';


const Index = ({initialNumber = 1, handleChange, name}) => {

    const [number, setNumber] = useState(initialNumber)

    useEffect(() => handleChange(number, name), [number])

    const onIncrement = () => {
        setNumber(number + 1)
    }
    const onDecrement = (e) => {
        e.preventDefault()
        if (number > 1) {
            setNumber(number - 1)
        }
    }
    return (
        <div className={'InputNumber'}>
            <div className={'InputUp InputNumberButton'} onClick={onIncrement}>
            </div>
            <input value={number} onChange={handleChange} name={'input-number'}/>
            <div className={'InputDown InputNumberButton'} onClick={onDecrement}>
            </div>
        </div>
    );
};

export default Index;