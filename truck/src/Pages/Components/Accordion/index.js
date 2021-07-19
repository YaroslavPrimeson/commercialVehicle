import React, {useState} from 'react';
import '../index.scss'


const Index = ({data}) => {
    const [chosenElement, setChosenElement] = useState(-1)
    const handleClick = (index) => {
        if (chosenElement === index) {
            setChosenElement(-1)
        } else {
            setChosenElement(index)
        }
    }
    return (
        <div>
            {data.map((el, index) =>
                <div className="accordion-wrapper" key={index} onClick={() => handleClick(index)}>
                    <div  className={`accordion-title ${chosenElement === index ? "open" : ""}`}>
                        {el.text}
                    </div>
                    {chosenElement === index &&
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className={`accordion-item ${chosenElement !== index ? "collapsed" : ""}`}
                            style={{height: `calc(100vh - ${data.length + 1}*4.8rem)`}}
                        >
                            {el.component}

                        </div>
                    }
                </div>
            )}
        </div>
    );
};

export default Index;