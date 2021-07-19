import React, {useState} from 'react';
import {checkProblem, userDriver} from '../../../Helper'
import InputForm from "../../../Components/NonameComponents/InputForm";
import Button from '../../../Components/Common/Button'
import '../index.scss'
import {fire} from "../../../Firebase/Firebase";


const Index = (props) => {
    const [forms, setForms] = useState(userDriver)
    const [problem, setProblem] = useState([])
    const sendResult = (forms) => {
        setForms(forms)
    }
    const handleSubmit = () => {
        setProblem(checkProblem(forms))
    }
const clearStorage = () =>  {
    fire.auth().signOut()
    localStorage.removeItem('user')
}



    /***********************************************************************
     * Render
     ********************************************************************* */
    return (
        <div className={'settings-block'}>
            <InputForm sendResult={sendResult} model={userDriver} problem={problem}/>
            <Button click={handleSubmit} text={'Change your info'}/>
            <Button
                click={()=> clearStorage()}
                // click={() => fire.auth().signOut()}
                text={'Sign Out'}/>
        </div>
    );
};

export default Index;