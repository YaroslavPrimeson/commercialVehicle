import React, {useState, useEffect, useRef} from 'react';
import './index.scss'

const Index =  ({title, data, selectDefault, cls = "",handleChange, name}) => {

    const dropdownRef = useRef(null);
    const [isExpand, setIsExpand] = useState(false)
    const [valueId, setValueId] = useState('');
    const [chosen, setChosen] = useState(selectDefault || '')
    const [chosenWithColor, setChosenWithColor] = useState([]);
    const [filteredData, setFilteredData] = useState([])

    const onClickList = () => {
        setIsExpand(!isExpand)
    }

    useEffect(() => {
        console.log(chosen)
        chosen &&
        setChosenWithColor(
            data?.find(({value}) => chosen === value)?.color
        );
        if (!selectDefault && !chosen) {
            setChosen(data[0]?.value);
            setValueId(data[0]?.id);
        }
        handleChange(chosen,name)
    }, [chosen]);

    useEffect(() => {
        const listener = (e) => {
            if (!dropdownRef?.current || dropdownRef?.current?.contains(e.target)) {
                return;
            }
            setIsExpand(false);
        };
        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);
        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [dropdownRef]);

    const onOptionClicked = (optionName, optionValue) => {
        setChosen(optionName);
        setValueId(optionValue);
        setIsExpand(false);
    };

    useEffect(() => {
        setFilteredData(data.filter(({id, value}) => id !== valueId))
    }, [valueId])

    return (
        <div className="SelWrapper__wrapper">
            {title && <div className="SelWrapper__title">{title}</div>}
            <div className="SelWrapper__ul--wrapper">
                <ul onClick={onClickList} ref={dropdownRef}
                    className={isExpand ? `SelWrapper ${cls} ActSelect` : `SelWrapper ${cls}`}>
                    {!chosen ? <li className={'FrstItem'} key={data[0].id}>{data[0].value}</li> :
                        <li className={'FrstItem'} key={valueId}>{chosen}</li>}
                    {isExpand && filteredData.map(({id, value}) => {
                        return <li className={'SeltItem'} key={id}
                                   onClick={() => onOptionClicked(value, id)}>{value}</li>
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Index;