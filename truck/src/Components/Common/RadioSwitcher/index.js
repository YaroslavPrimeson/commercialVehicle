import React, {FC, useCallback} from 'react';
import {Form} from 'react-bootstrap';


const index = ({}) => {



    return (
        <>
            <div className="form__radio__switch-radio">
                {radioValues?.map((el) => (
                    <Form.Check
                        key={el.id}
                        label={el.label}
                        name={el.name}
                        value={el.value}
                        type="radio"
                        id={el.id}
                        onChange={onChangeHandlerSwitcher}
                        checked={el.id === value}
                    />
                ))}
            </div>

        </>
    );
};
export default index;
