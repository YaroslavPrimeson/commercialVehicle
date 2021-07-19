import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import { fire } from "../../Firebase/Firebase";
import "./index.scss";

const AuthFirebaseUI = ({ setRoleDriver, setRoleClient }) => {
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        return true;
      },
    },
  };

  /******************************************************************************************************
   * Render
   **************************************************************************************************** */
  return (
    <div>
      <div className="authButton__container">
        <StyledFirebaseAuth
          className={"StyledFirebaseAuth"}
          uiConfig={uiConfig}
          firebaseAuth={fire.auth()}
        />
      </div>
      <div className="authButton__button__container">
        <div className="authButton" onClick={() => setRoleClient()}>
          Client
        </div>
        <div className="authButton" onClick={() => setRoleDriver()}>
          Driver
        </div>
      </div>
    </div>
  );
};

export default AuthFirebaseUI;
