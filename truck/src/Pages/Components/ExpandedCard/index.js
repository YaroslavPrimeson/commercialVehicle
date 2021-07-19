import React, {useEffect} from 'react';
import '../index.scss';


const Index = ({data}) => {

    /****************************************************************
     * Render
     ****************************************************************/

    return (
        <div className={'expanded-card'}>
            <ul className="expanded-card__ul">
                <li className="expanded-card__list">address loading:<span>{data['address loading']}</span></li>
                <li className="expanded-card__list"> address unloading:<span>{data['address unloading']}</span></li>
                <li className="expanded-card__list">commodity name:<span>{data['commodity name']}</span></li>
                <li className="expanded-card__list">commodity type:<span>{data['commodity type']}</span></li>
                <li className="expanded-card__list">HC CODE:<span>{data['HC CODE']}</span></li>
                <li className="expanded-card__list">IMO class:<span>{data['IMO class']}</span></li>
                <li className="expanded-card__list"> UN number:<span>{data['UN number']}</span></li>
                <li className="expanded-card__list">dangerous cargo:<span>{data['dangerous cargo']}</span></li>
                <li className="expanded-card__list">status:<span> {data.status}</span></li>
            </ul>


            {/*{Object.entries(data).map((el, index) => {*/}
            {/*        if (el[0] === 'idPost') {*/}
            {/*            return*/}
            {/*        } else {*/}
            {/*            return (*/}
            {/*                    <div key={index} className={"shipment__cell__string"}>*/}
            {/*                        <p className={'expanded-card__key'}>{el[0]}:</p>*/}
            {/*                        <p className={'expanded-card__value'}>{el[1]}</p>*/}
            {/*                    </div>)*/}
            {/*        }*/}
            {/*    }*/}
            {/*)}*/}
        </div>
    );
}


export default Index;