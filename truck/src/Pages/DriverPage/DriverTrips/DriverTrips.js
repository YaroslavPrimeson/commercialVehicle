import React, { useEffect, useState } from "react";
import DriverTrip from "../DriverTrip/DriverTrip";
import "../index.scss";
import { clientShipping } from "../../../Helper";
import AccordionTrip from "../../Components/AccordionTrip";
import {
  getCollection,
  updateDocumentInCollection,
} from "../../../Helper/adminHelper";
import Filter from "../../Components/Filter/Filter";
import { Slide, toast, ToastContainer } from "react-toastify";

const DriverTrips = ({ clickSenMsg, getTrips, trips, role }) => {
  const [showTable, setShowTable] = useState(true);
  const [tripsFilterSearch, setTripsFilterSearch] = useState([]);
  const [showMap, setShowMap] = useState(true);
  const [currentTrip, setCurrentTrip] = useState(clientShipping);
  const [buttonState, setButtonState] = useState({
    text: "Filter",
    action: "",
  });
  const [currentUserTrip, setCurrentUserTrip] = useState([]);
  const [allTripsUser, setAllTripsUser] = useState("");
  const userArray = [];

  /******************************************************************************************************
   * Filter
   **************************************************************************************************** */
  const filterArray = (input) => {
    const newFilter = trips.filter(
      (el) =>
        el["address unloading"].toLowerCase().includes(input) ||
        el["address loading"].toLowerCase().includes(input) ||
        el["commodity name"].toLowerCase().includes(input) ||
        el["UN number"].toLowerCase().includes(input) ||
        el["IMO class"].toLowerCase().includes(input) ||
        el["HC CODE"].toLowerCase().includes(input) ||
        el["commodity type"].toLowerCase().includes(input) ||
        el["dangerous cargo"].toLowerCase().includes(input) ||
        el.status.includes(input)
    );
    setTripsFilterSearch(newFilter);
  };
 
  useEffect(() => {
    setTripsFilterSearch(trips);
    getCollection("users")
      .then((r) => {
        setCurrentUserTrip(r);
      })
      .catch((e) => {
      });
    findCurrentUser();
    setAllTripsUser(userArray[0]?.trips);
  }, [trips, allTripsUser]);
  const findCurrentUser = () => {
    if (userArray !== []) {
      for (let i = 0; i < currentUserTrip.length; i++) {
        if (
          currentUserTrip[i].uid_firebase ===
          localStorage.getItem("uid__trucks")
        ) {
          userArray.push(currentUserTrip[i]);
          localStorage.setItem("user", JSON.stringify(userArray));
        }
      }
    }
  };
  /******************************************************************************************************
   * Handle
   **************************************************************************************************** */
  const handleButtonTop = (action) => {
    switch (action) {
      case "table":
        setShowTable(true);
        setButtonState({ text: "Filter", action: "filter" });
        return;
      default:
        setShowMap(false);
        return;
    }
  };
  const handleOpenCard = (data) => {
    setShowTable(!showTable);
    setCurrentTrip(data);
    setButtonState({ text: "Close", action: "table" });
  };
  /******************************************************************************************************
   *button accept or completed for driver
   **************************************************************************************************** */
  const changeTrip = (trip, activeDriverTrip) => {
    if (trip.status === "search driver") {
      updateDocumentInCollection(
        "trip",
        {
          status: "inWork",
          uid__driver: localStorage.getItem("uid__trucks"),
        },
        trip.idPost
      )
        .then((r) => {
          getTrips();
          notify();
        })
        .catch((e) => {
          console.log(e);
        });
    } else if (trip.status === "inWork") {
      updateDocumentInCollection(
        "trip",
        {
          status: "completed",
          uid__driver: localStorage.getItem("uid__trucks"),
        },
        trip.idPost
      )
        .then((r) => {
          getTrips();
          notify();
        })
        .catch((e) => {
          console.log(e);
        });
      updateDocumentInCollection(
        "users",
        {
          trips: allTripsUser + 1,
        },
        activeDriverTrip.idPost
      )
        .then((r) => {
          setAllTripsUser(allTripsUser + 1);
          console.log("success");
          console.log(r);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  /******************************************************************************************************
   * Toast container success
   **************************************************************************************************** */
  const notify = () =>
    toast.success("success!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
      limit: 1,
      transition: Slide,
    });
  /******************************************************************************************************
   * Render
   **************************************************************************************************** */
  return (
    <div className={"PageContainer"}>
      <div className={"MapContainer"}>
        {!showTable ? (
          <div
            className={"shipment__top__container__btn"}
            onClick={() => handleButtonTop(buttonState.action)}
          >
            {buttonState.text}
          </div>
        ) : (
          <Filter setFilter={filterArray} />
        )}
        {showTable ? (
          <>
            <AccordionTrip
              role={"driver"}
              trips={tripsFilterSearch}
              click={handleOpenCard}
              changeTrip={changeTrip}
            />

            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </>
        ) : (
          <>
            <DriverTrip
              role={role}
              currentUserTrip={currentUserTrip}
              changeTrip={changeTrip}
              currentTrip={currentTrip}
              clickSenMsg={clickSenMsg}
            />
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              transition={Slide}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default DriverTrips;
