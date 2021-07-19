import React, {useState} from 'react';
import {checkProblem, userClient, userDriverLogIn} from "../../Helper";
import InputForm from '../../Components/NonameComponents/InputForm'
import DoubleBtn from "../../Components/Common/DoubleButton";
import CheckBox from "../../Components/Common/CheckBox";

const DriverRegistration = (props) => {
    const [forms, setForms] = useState(userClient);
    const [problem, setProblem] = useState([]);
    const sendResult = (forms) => {
        setForms(forms)
    };
    const clickBtn = () => {
        setProblem(checkProblem(forms))
        props.clickBtn()
    };
    return (
        <div>
            <div className={"AuthContainerInputForm"}>
                <InputForm sendResult={sendResult} model={userClient} problem={problem}/>
            </div>
            <div className={"AuthBottomContainer"}>
                <CheckBox label={"remember me"} className={""}/>
                <DoubleBtn
                    className1={""}
                    click1={clickBtn}
                    text1={"Submit"}
                    className2={""}
                    click2={props.changeRole}
                    text2={"Are you client?"}
                />
            </div>
        </div>
    );
};
export default DriverRegistration;