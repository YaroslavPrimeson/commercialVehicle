import React, {useEffect, useState} from 'react';

const Svg = ({className, style, viewBox, path, timeOutShow, transform}) => {
    const [show, setShow] = useState(false)

    useEffect(()=> {
        setTimeout(() => {
            setShow(true)
        }, timeOutShow * 1000)
    },[timeOutShow])
    return (
        <>
            {show && (
                <svg
                    className={className}
                    style={style}
                    viewBox={viewBox}
                    transform={transform}
                >
                    {path}
                </svg>
            )}
        </>
    )
};

export default Svg;

// export default class App extends React.Component {
//     /** ====================================================================================================
//      *              Main
//      =====================================================================================================*/
//     constructor (props, context) {
//         super(props, context);
//         this.state = {
//             show: false,
//         };
//     }
//     componentDidMount() {
//         setTimeout(() => {
//             this.setState({show: true})
//         }, this.props.timeOutShow * 1000);
//     }
//
//     render() {
//         return (
//             <>
//                 {this.state.show && (
//                     <svg
//                         className={this.props.className}
//                         style={this.props.style}
//                         viewBox={this.props.viewBox}
//                     >
//                         {this.props.path}
//                     </svg>
//                 )}
//             </>
//         )
//     }
// }