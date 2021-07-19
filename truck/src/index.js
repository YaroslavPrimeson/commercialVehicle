import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import MainPage from './Pages/MainPage'


/********************************
 * create useContext
 ********************************/
export const Context = createContext(null)

/********************************
 * RENDER
 ********************************/
ReactDOM.render(
    <React.StrictMode>
        <Context.Provider value={{}}>
            <MainPage/>
        </Context.Provider>
    </React.StrictMode>,
    document.getElementById('root')
);


reportWebVitals();
