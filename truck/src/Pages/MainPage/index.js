import React, { useEffect, useState } from "react";
import "../Components/index.scss";
import Auth from "../Auth";
import Menu from "../Menu/Menu";
import DriverTrips from "../DriverPage/DriverTrips/DriverTrips";
// import Settings from '../Components/Settings'
import ClientTrips from "../ClientPage/ClientTrips";
// import Accordion from '../Components/Accordion'
import { fire } from "../../Firebase/Firebase";
import { createNewUser, getCollection } from "../../Helper/adminHelper";
import Chat from "../Components/Chat/Chat";
import Profile from "../Components/Profile/Profile";
const menuPagesDriver = ["Shipment", "Messages", "Profile"];
const menuPagesClient = ["Shipment", "Messages", "Profile"];
// const accordionDriver = [
//     {
//         text: "Profile",
//         // component: <ProfileUser/>
//         component: <Profile/>
//     },
//     {
//         text: "Security",
//         component: <Settings/>
//     },
//     {
//         text: "Tools",
//         component: <Settings/>
//     },
// ]
const Index = () => {
  const [auth, setAuth] = useState(false);
  const [page, setPage] = useState(0);
  const [role, setRole] = useState("");
  const [trips, setTrips] = useState([]);
  const [currentUserTrip, setCurrentUserTrip] = useState([]);
  const userArray = [];

  /******************************************************************************************************
   * PageDriver
   **************************************************************************************************** */
  const getPageDriver = (number) => {
    switch (number) {
      case 0:
        return (
          <DriverTrips
            getUsers={getUsers}
            clickSenMsg={clickSenMsg}
            currentUserTrip={currentUserTrip}
            getTrips={getTrips}
            role={role}
            trips={trips}
          />
        );
      case 1:
        return <Chat role={role} />;
      case 2:
        return <Profile />;
      default:
        return <div className={"PageContainer"}>{role + "000"}</div>;
    }
  };

  /******************************************************************************************************
   * PageClient
   **************************************************************************************************** */
  const getPageClient = (number) => {
    switch (number) {
      case 0:
        return (
          <ClientTrips
            getUsers={getUsers}
            currentUserTrip={currentUserTrip}
            trips={trips}
            clickSenMsg={clickSenMsg}
            getTrips={getTrips}
            role={role}
          />
        );
      case 1:
        return <Chat role={role} />;
      case 2:
        return <Profile />;
      default:
        return <div className={"PageContainer"}>{role + "000"}</div>;
    }
  };
  /******************************************************************************************************
   * On auth change
   **************************************************************************************************** */

  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      if (!user) {
        localStorage.setItem("uid__trucks", "");
        setAuth(true);
        setPage(0);
      } else {
        // console.log(role)
        localStorage.setItem("uid__trucks", user.uid);
        createNewUser(user, localStorage.getItem("role__trucks")).then(() => {
          setAuth(false);
          setPage(0);
          getTrips();
          getUsers();
          findCurrentUser();
          });
        setRole(localStorage.getItem("role__trucks"));
      }
    });
  }, []);

  /******************************************************************************************************
   * GET COLLECTION TRIPS AND USERS
   **************************************************************************************************** */
  const getUsers = () => {
    getCollection("users")
      .then((r) => {
        setCurrentUserTrip(r);
      })
      .catch((e) => {
        //Some catching errors
      });
  };
  const getTrips = () => {
    getCollection("trip")
      .then((r) => {
        setTrips(r);
      })
      .catch((e) => {
        //Some catching errors
      });
  };
  const findCurrentUser = () => {
    for (let i = 0; i < currentUserTrip.length; i++) {
      if (
        currentUserTrip[i].uid_firebase === localStorage.getItem("uid__trucks")
      ) {
        userArray.push(currentUserTrip[i]);
        localStorage.setItem("user", JSON.stringify(userArray));
      }
    }
  };
  /******************************************************************************************************
   * ... Other Methods
   **************************************************************************************************** */

  const setRoleDriver = () => {
    console.log("CLICK SET DRIVER");
    localStorage.setItem("role__trucks", "driver");
    setRole("driver");
  };
  const setRoleClient = () => {
    console.log("CLICK SET CLIENT");
    localStorage.setItem("role__trucks", "client");
    setRole("client");
  };
  const clickPage = (page) => {
    setPage(page);
  };
  /******************************************************************************************************
   * ... Other Methods
   **************************************************************************************************** */
  const clickSenMsg = () => {
    setPage(1);
  };
  /******************************************************************************************************
   * Render
   **************************************************************************************************** */
  return (
    <div className={"MainContainer"}>
      {auth ? (
        <Auth
          setRoleDriver={setRoleDriver}
          setRoleClient={setRoleClient}
          // setRole={setRole}
          // submitAuth={submitAuth}
        />
      ) : (
        <>
          {role === "driver" ? (
            <>
              {getPageDriver(page)}
              <Menu
                clickPage={clickPage}
                logOut={() => setAuth(!auth)}
                menuPages={menuPagesDriver}
              />
            </>
          ) : (
            <>
              {getPageClient(page)}
              <Menu
                clickPage={clickPage}
                logOut={() => setAuth(!auth)}
                menuPages={menuPagesClient}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};
export default Index;
