import React, {useEffect, useState} from 'react';
import userLogo from "../iconSvg/userLogo.svg";
import '../../DriverPage/index.scss';
import "./index.scss"
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper.scss';
import Button from "../../../Components/Common/Button";
import {getCollection, updateDocumentInCollection} from "../../../Helper/adminHelper";
import {Slide, toast, ToastContainer} from "react-toastify";


const ProfileClient = ({profilePageFunc, visibleProfile, currentTrip, currentUserTrip, role, clickSenMsg}) => {

    /****************************************************************
     * state
     ****************************************************************/
    const [userProfile, setUserProfile] = useState();
    const [visibleReview, setVisibleReview] = useState(false);
    const [valueReview, setValueReview] = useState('');
    const [reviewStateDB, setReviewStateDB] = useState();
    const [clientReview,setClientReview] = useState(false)

    const [starRating, setStarRating] = useState();
    const [starRatingDB, setStarRatingDB] = useState();
    const averageNumberRating = starRatingDB?.reduce( ( a, c ) => a+(+c), 0 ) / starRatingDB?.length;

    /**********************************************************
     * toast error if send value ""
     **********************************************************/
    const notifyError = () => toast.error('write text for send message!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        limit: 1,
        transition: Slide,
    });
    const notifySuccess = () => toast.success('success!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        limit: 1,
        transition: Slide,
    });
    /****************************************************************
     * find current user
     ****************************************************************/
    const searchUserProfile = () => {
        if (role === "driver") {
            setUserProfile(currentUserTrip.find(el => el.uid_firebase === currentTrip.uid__client))
        } else if (role === "client") {
            setUserProfile(currentUserTrip.find(el => el.uid_firebase === currentTrip.uid__driver))
        }
    }
    const writeReview = () => {
        setVisibleReview(!visibleReview)
    }
    /****************************************************************
     * send review
     ****************************************************************/
    const sendReviewClient = (userProfile) => {
        if (valueReview !== '' ) {
            updateDocumentInCollection('users', {
                reviews: [...reviewStateDB, valueReview],
                rating: [...starRatingDB, starRating],
            }, userProfile.idPost).then(r => {
                setValueReview('')
                setReviewStateDB([...reviewStateDB, valueReview])
                setStarRatingDB([...starRatingDB, starRating])
                notifySuccess()
                setClientReview(true)
            }).catch(e => {
                console.log(e)
            })
        } else {
            notifyError()
        }
    }
    const sendReviewDriver = (userProfile) => {
        if (valueReview !== '') {
            updateDocumentInCollection('users', {
                reviews: [...reviewStateDB, valueReview],
            }, userProfile.idPost).then(r => {
                setValueReview('')
                setReviewStateDB([...reviewStateDB, valueReview])
                notifySuccess()
                setClientReview(true)
            }).catch(e => {
                console.log(e)
            })
        } else {
            notifyError()
        }
    }
    const setReviewState = () => {
        setReviewStateDB(userProfile?.reviews)
    }
    const setRatingDB = () => {
        setStarRatingDB(userProfile?.rating)
    }
    /****************************************************************
     * star Click
     ****************************************************************/
    const starClickFirst = () => {
        setStarRating("1")
    }
    const starClickSecond = () => {
        setStarRating("2")
    }
    const starClickThird = () => {
        setStarRating("3")
    }
    const starClickFourth = () => {
        setStarRating("4")
    }
    const starClickFifth = () => {
        setStarRating("5")
    }

    /****************************************************************
     * trips driver
     ****************************************************************/
    const getAllTrips = () => {
        getCollection('trip').then(r => {
            setAllTrips(r);
        }).catch(e => {
            //Some catching errors
        })
    }
    const [allTrips, setAllTrips] = useState([])
    const filterAllTrips = allTrips.filter((el) => el.uid__driver === userProfile?.uid_firebase).filter((el => el.status === "completed"))


    // useEffect(() => {
    //     getAllTrips()
    //     filterAllTrips()
    //     // console.log(userProfile)
    //     console.log(allTrips)
    //     // console.log(filterAllTrips.length)
    // }, [])
    /****************************************************************
     * useEffect
     ****************************************************************/
    useEffect(() => {
        searchUserProfile()
        setReviewState()
        setRatingDB()
        // console.log(allTrips)
        getAllTrips()
    }, [userProfile, valueReview, reviewStateDB, starRating, starRatingDB])
    /****************************************************************
     * Render
     ****************************************************************/
    return (
        <>
            {!visibleProfile ?
                <>
                    <div
                        className={visibleProfile ? "expanded-card__icon__container" : "expanded-card__icon__container active"}
                        onClick={profilePageFunc}>
                        <img className="expanded-card__icon" src={userLogo} alt="user"/>
                    </div>
                </>
                :
                <>
                    {<div key={userProfile?.uid_firebase}
                          className="profile__userLogo__container profile__client__container">
                        <Button click={() => profilePageFunc()} text={"return"}/>
                        {userProfile?.photoURL_firebase === "" ?
                            <div className="profile__userLogo__border">
                                <img src={userLogo} alt="user logo" className="profile__userLogo"/>
                            </div> :
                            <div className="profile__userLogo__border">
                                <img src={userProfile?.photoURL_firebase} alt="user logo"
                                     className="profile__userLogo"/>
                            </div>
                        }
                        <div>
                            <p style={{textAlign: "center"}}> {userProfile?.displayName_firebase}</p>
                            <p style={{textAlign: "center"}}>{userProfile?.phoneNumber_firebase}</p>
                        </div>
                        {role === "client" ?
                            <div className="profile__tripsRating__container">
                                {/*<p className="profile__swiper__text__block">{userProfile?.trips} trips</p>*/}
                                <p className="profile__swiper__text__block">{filterAllTrips.length} trips</p>
                                {/*<div className="rating">*/}
                                {/*<input type="radio" name="rating" id="r1"/>*/}
                                {/*<label htmlFor="r1"></label>*/}
                                <div className="rating__reviews__container">
                                    <div className="rating__reviews">
                                    </div>
                                    <p>{averageNumberRating.toFixed(2)}</p>
                                </div>

                                {/*</div>*/}
                            </div>
                            :
                            null
                        }

                        <div className="profile__button__messages__container">
                            <Button text={"write message"} className="profile__button__messages"
                                    click={clickSenMsg}/>
                        </div>
                        <div className="profile__client__swiper__container">
                            <h3 className="profile__user__reviews__title">Reviews</h3>
                            <Swiper spaceBetween={50} slidesPerView={1}>
                                {/*{Object.values(userProfile.reviews)?.map((el, index) => (*/}
                                {userProfile?.reviews?.map((el, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="profile__swiper__container__block">
                                            <p className="profile__swiper__text__block">{el}</p>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        <div className={clientReview === true ?  "profileClient__review__container none" : "profileClient__review__container"}>
                            {!visibleReview ?
                                <Button click={writeReview} text={"write review"}
                                        className="profile__button__review"/>
                                :

                                <div className="profile__input__send__review__container">
                                    {role === "client" ?
                                        // <div className="rating__star__container">
                                        <>
                                            <div className="rating">
                                                <input type="radio" name="rating" id="r1"/>
                                                <label onClick={starClickFifth} htmlFor="r1">
                                                </label>
                                                <input type="radio" name="rating " id="r2"/>
                                                <label onClick={starClickFourth} htmlFor="r2">
                                                </label>
                                                <input type="radio" name="rating" id="r3"/>
                                                <label onClick={starClickThird} htmlFor="r3">
                                                </label>
                                                <input type="radio" name="rating" id="r4"/>
                                                <label onClick={starClickSecond} htmlFor="r4">
                                                </label>
                                                <input type="radio" name="rating" id="r5"/>
                                                <label onClick={starClickFirst} htmlFor="r5">
                                                </label>
                                            </div>
                                        </>
                                        // </div>
                                        :
                                        null
                                    }
                                    <input
                                        className={"profile__input__send__review"}
                                        type="text"
                                        placeholder={"write review"}
                                        value={valueReview}
                                        onChange={(e) => {
                                            setValueReview(e.target.value)
                                        }}
                                    />
                                    <Button click={() => { role === "driver" ? sendReviewDriver(userProfile) : sendReviewClient(userProfile) } } text={"send"}
                                            className="profile__button__send__review"/>
                                    <ToastContainer position="top-center" autoClose={2000} hideProgressBar
                                                    newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss
                                                    draggable pauseOnHover transition={Slide} limit={1}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                    }
                </>
            }
        </>
    );
};

export default ProfileClient;