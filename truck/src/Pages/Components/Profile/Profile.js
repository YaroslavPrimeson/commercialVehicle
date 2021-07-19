import React, {useEffect} from 'react';
import ProfileDriver from "./ProfileDriver";
import {fire} from "../../../Firebase/Firebase";
import Button from "../../../Components/Common/Button";
import "./index.scss"

const Profile = () => {






    // const role = localStorage.getItem("role__trucks")
    //
    //  const user =  JSON.parse(localStorage.getItem("user"))
    //
    // const userArr = JSON.parse(localStorage.getItem("user"))
    // const user = userArr[0]

    const clearStorage = () =>  {
        fire.auth().signOut()
        localStorage.removeItem('user')
    }
    /**********************************************************
     * Render
     **********************************************************/
    return (
        <div className="profile__main__container">
            <ProfileDriver />
            <Button
                click={()=> clearStorage()}
                // click={() => fire.auth().signOut()}
                text={'Sign Out'}/>
        </div>
    );
};

export default Profile;