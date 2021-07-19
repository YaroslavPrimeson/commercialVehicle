import React, {useEffect, useState} from 'react';
import userLogo from "../iconSvg/userLogo.svg";
import '../../DriverPage/index.scss';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper.scss';
import Button from "../../../Components/Common/Button";
import {getCollection, updateDocumentInCollection} from "../../../Helper/adminHelper";


const ProfileDriver = () => {


    const userArr = JSON.parse(localStorage.getItem("user"))
    const user = userArr[0]


    /************************************************
     *state user info
     ************************************************/
    const averageStarRating = user?.rating?.reduce((a, c) => a + (+c), 0) / user?.rating?.length;
    /************************************************
     *state name
     ************************************************/
    const [changeUserName, setChangeUserName] = useState(user?.displayName_firebase);
    const [rewriteUserName, setRewriteUserName] = useState(false)
    /************************************************
     *state truck name
     ************************************************/
    const [changeVehicleModel, setChangeVehicleModel] = useState(user?.vehicle_model);
    const [rewriteVehicleModel, setRewriteVehicleModel] = useState(false)
    /************************************************
     *state phone
     ************************************************/
    const [changeUserPhone, setChangeUserPhone] = useState(user?.phoneNumber_firebase)
    const [rewriteUserPhone, setRewriteUserPhone] = useState(false)
    /************************************************
     *state email
     ************************************************/
    const [changeUserEmail, setChangeUserEmail] = useState(user?.email_firebase)
    const [rewriteUserEmail, setRewriteUserEmail] = useState(false)
    /************************************************
     *state language
     ************************************************/
    const [changeUserLanguage, setChangeUserLanguage] = useState(user?.language);
    const [rewriteUserLanguage, setRewriteUserLanguage] = useState(false)
    /************************************************
     *state country from
     ************************************************/
    const [changeUserCountry, setChangeUserCountry] = useState(user?.country_from);
    const [rewriteUserCountry, setRewriteUserCountry] = useState(false)
    /************************************************
     *state ADR_class
     ************************************************/
    const [changeUserADRClass, setChangeUserADRClass] = useState(user?.ADR_class);
    const [rewriteUserADRClass, setRewriteUserADRClass] = useState(false)
    /************************************************
     *state upload_documents_$P_I
     ************************************************/
    const [changeUserDocuments, setChangeUserDocuments] = useState("documents");
    const [rewriteUserDocuments, setRewriteUserDocuments] = useState(false)
    /************************************************
     *state truck_plate_number
     ************************************************/
    const [changeUserPlateNum, setChangeUserPlateNum] = useState(user?.truck_plate_number);
    const [rewriteUserPlateNum, setRewriteUserPlateNum] = useState(false)
    /************************************************
     *state euro_class
     ************************************************/
    const [changeUserEuroClass, setChangeUserEuroClass] = useState(user?.euro_class);
    const [rewriteUserEuroClass, setRewriteUserEuroClass] = useState(false)
    /************************************************
     *state HPK_horse_power
     ************************************************/
    const [changeUserHorsePower, setChangeUserHorsePower] = useState(user?.HPK_horse_power);
    const [rewriteUserHorsePower, setRewriteUserHorsePower] = useState(false)
    /************************************************
     *state max_weight
     ************************************************/
    const [changeUserMaxWeight, setChangeUserMaxWeight] = useState(user?.max_weight);
    const [rewriteUserMaxWeight, setRewriteUserMaxWeight] = useState(false)
    /************************************************
     *state engine
     ************************************************/
    const [changeUserEngine, setChangeUserEngine] = useState(user?.engine);
    const [rewriteUserEngine, setRewriteUserEngine] = useState(false)

    /*****************************************************
     * update Profile Info
     *****************************************************/

    const changeProfileInfo = (user) => {
        if (user.role === "driver") {
            updateDocumentInCollection('users', {
                displayName_firebase: changeUserName,
                email_firebase: changeUserEmail,
                phoneNumber_firebase: changeUserPhone,
                truck_plate_number: changeUserPlateNum,
                ADR_class: changeUserADRClass,
                vehicle_model: changeVehicleModel,
                euro_class: changeUserEuroClass,
                HPK_horse_power: changeUserHorsePower,
                engine: changeUserEngine,
                max_weight: changeUserMaxWeight,
                language: changeUserLanguage,
                country_from: changeUserCountry,
            }, user.idPost).then(r => {
                console.log("success")
            }).catch(e => {
                console.log(e)
            })
        } else if (user.role === "client") {
            updateDocumentInCollection('users', {
                displayName_firebase: changeUserName,
                email_firebase: changeUserEmail,
                phoneNumber_firebase: changeUserPhone,
                language: changeUserLanguage,
                // country_from: changeUserCountry,
            }, user.idPost).then(r => {
                console.log("success")
            }).catch(e => {
                console.log(e)
            })
        }
    }
    /*****************************************************
     *trips driver completed
     *****************************************************/
    const getAllTrips = () => {
        getCollection('trip').then(r => {
            setAllTrips(r);
        }).catch(e => {
            //Some catching errors
        })
    }
    const [allTrips, setAllTrips] = useState([])
    const filterAllTrips = allTrips.filter((el) => el.uid__driver === user.uid_firebase).filter((el => el.status === "completed"))
    useEffect(() => {
        getAllTrips()
    }, [])
    /*****************************************************
     *useEffect
     *****************************************************/
    useEffect(() => {
    }, [user, changeUserName, changeVehicleModel, changeUserPhone, changeUserEmail, changeUserLanguage,
        changeUserCountry, changeUserADRClass, changeUserDocuments, changeUserPlateNum,
        changeUserEuroClass, changeUserHorsePower, changeUserMaxWeight])
    /************************************************
     *Render
     ************************************************/
    return (
        <>
            {/*START MAP*/}
            {/*{user.map((el, id) => (*/}
            {userArr.map((el, index) => (
                    <div key={index} className="profile__userLogo__container">

                        {/*PHOTO*/}
                        {el.photoURL_firebase === '' ?
                            <div className="profile__userLogo__border">
                                <img src={userLogo} alt="user logo" className="profile__userLogo"/>
                            </div> :
                            <div className="profile__userLogo__border">
                                <img src={el.photoURL_firebase} alt="user logo"
                                     className="profile__userLogo"/>
                            </div>
                        }
                        {/*USER NAME*/}
                        <div onClick={() => setRewriteUserName(!rewriteUserName)}
                             className={!rewriteUserName ? "profile__user__name__container" : " profile__user__name__container active"}
                        >
                            <h3 className="profile__subtitle">User Info</h3>
                            {!rewriteUserName ?
                                <p className="profile__userName"> {changeUserName === '' || '' ? "write your name" : changeUserName}</p>
                                :
                                <div className="profile__auto__input__change__container"
                                     onClick={(e) => {
                                         e.stopPropagation()
                                     }}>
                                    <input className="profile__auto__input__change" type="text"
                                           placeholder={changeUserName}
                                           value={changeUserName === '' ? "write your name" : changeUserName}
                                           onChange={(e) => setChangeUserName(e.target.value)}/>
                                    <Button className={"profile__auto__button__change"}
                                            text={"save change"}
                                            click={() => {
                                                changeProfileInfo(user)
                                                setRewriteUserName(!rewriteUserName)
                                            }}
                                    />
                                </div>
                            }
                        </div>
                        {/*USER email*/}
                        <div onClick={() => setRewriteUserEmail(!rewriteUserEmail)}
                             className={!rewriteUserEmail ? "profile__user__name__container" : " profile__user__name__container active"}>
                            {!rewriteUserEmail ?
                                <p className="profile__userName"> {changeUserEmail === '' ? "write your Email" : changeUserEmail}</p>
                                :
                                <div className="profile__auto__input__change__container"
                                     onClick={(e) => {
                                         e.stopPropagation()
                                     }}>
                                    <input className="profile__auto__input__change" type="text"
                                           placeholder={changeUserEmail}
                                           value={changeUserEmail === '' ? "write your email" : changeUserEmail}
                                           onChange={(e) => setChangeUserEmail(e.target.value)}/>
                                    <Button className={"profile__auto__button__change"}
                                            text={"save change"}
                                            click={() => {
                                                changeProfileInfo(user)
                                                setRewriteUserEmail(!rewriteUserEmail)
                                            }}/>
                                </div>
                            }
                        </div>
                        {/*USER phone*/}
                        <div onClick={() => setRewriteUserPhone(!rewriteUserPhone)}
                             className={!rewriteUserPhone ? "profile__user__name__container" : " profile__user__name__container active"}
                        >
                            {!rewriteUserPhone ?
                                <p className="profile__userName"> {changeUserPhone === '' ? "write your Phone" : changeUserPhone}</p>
                                :
                                <div className="profile__auto__input__change__container"
                                     onClick={(e) => {
                                         e.stopPropagation()
                                     }}>
                                    <input className="profile__auto__input__change"
                                           type="text"
                                           placeholder={changeUserPhone}
                                           value={changeUserPhone === '' ? "write your phone" : changeUserPhone}
                                           onChange={(e) => setChangeUserPhone(e.target.value)}/>
                                    <Button className={"profile__auto__button__change"}
                                            text={"save change"}
                                            click={() => {
                                                changeProfileInfo(user)
                                                setRewriteUserPhone(!rewriteUserPhone)
                                            }}/>
                                </div>
                            }
                        </div>
                        {/*   LANGUAGE  */}
                        <div
                            className={!rewriteUserLanguage ? "profile__user__name__container" : " profile__user__name__container active"}
                            onClick={() => setRewriteUserLanguage(!rewriteUserLanguage)}>
                            {!rewriteUserLanguage ?
                                <p className="profile__userName">{changeUserLanguage === '' ? "write Language" : changeUserLanguage}</p> :
                                <div className="profile__auto__input__change__container"
                                     onClick={(e) => {
                                         e.stopPropagation()
                                     }}>
                                    <input className="profile__auto__input__change" type="text"
                                           placeholder={changeUserLanguage}
                                           value={changeUserLanguage === '' ? "write Language" : changeUserLanguage}
                                           onChange={(e) => setChangeUserLanguage(e.target.value)}/>
                                    <Button className={"profile__auto__button__change"}
                                            text={"save change"}
                                            click={() => {
                                                changeProfileInfo(user)
                                                setRewriteUserLanguage(!rewriteUserLanguage)
                                            }}/>
                                </div>}
                        </div>
                        {user.role === "driver"
                            ?
                            <>
                                {/*Vehicle Model*/}
                                <div
                                    className={!rewriteVehicleModel ? "profile__user__name__container" : " profile__user__name__container active"}
                                    // className="profile__auto__container"
                                    onClick={() => setRewriteVehicleModel(!rewriteVehicleModel)}>
                                    {!rewriteVehicleModel ?
                                        <p>{changeVehicleModel === '' ? "write your Vehicle Model" : changeVehicleModel}</p> :
                                        <div className="profile__auto__input__change__container"
                                             onClick={(e) => {
                                                 e.stopPropagation()
                                             }}>
                                            <input className="profile__auto__input__change" type="text"
                                                   placeholder={changeVehicleModel}
                                                   value={changeVehicleModel === '' ? "write your Vehicle Model" : changeVehicleModel}
                                                   onChange={(e) => setChangeVehicleModel(e.target.value)}/>
                                            <Button className={"profile__auto__button__change"}
                                                    text={"save change"}
                                                    click={() => {
                                                        changeProfileInfo(user)
                                                        setRewriteVehicleModel(!rewriteVehicleModel)
                                                    }}/>
                                        </div>}
                                </div>

                                {/*   COUNTRY  */}
                                <div
                                    className={!rewriteUserCountry ? "profile__user__name__container" : " profile__user__name__container active"}
                                    onClick={() => setRewriteUserCountry(!rewriteUserCountry)}>
                                    {!rewriteUserCountry ?
                                        <p>{changeUserCountry === '' ? "write your COUNTRY" : changeUserCountry}</p> :
                                        <div className="profile__auto__input__change__container"
                                             onClick={(e) => {
                                                 e.stopPropagation()
                                             }}>
                                            <input className="profile__auto__input__change" type="text"
                                                   placeholder={changeUserCountry}
                                                   value={changeUserCountry === '' ? "write your country" : changeUserCountry}
                                                   onChange={(e) => setChangeUserCountry(e.target.value)}/>
                                            <Button className={"profile__auto__button__change"}
                                                    text={"save change"}
                                                    click={() => {
                                                        changeProfileInfo(user)
                                                        setRewriteUserCountry(!rewriteUserCountry)
                                                    }}/>
                                        </div>}
                                </div>

                                {/*   ADR_class  */}
                                <div
                                    className={!rewriteUserPhone ? "profile__user__name__container" : " profile__user__name__container active"}
                                    onClick={() => setRewriteUserADRClass(!rewriteUserADRClass)}>
                                    {!rewriteUserADRClass ?
                                        <p>{changeUserADRClass === '' ? "write your ADR class" : changeUserADRClass}</p> :
                                        <div className="profile__auto__input__change__container"
                                             onClick={(e) => {
                                                 e.stopPropagation()
                                             }}>
                                            <input className="profile__auto__input__change" type="text"
                                                   placeholder={changeUserADRClass}
                                                   value={changeUserADRClass === '' ? "write your ADR class" : changeUserADRClass}
                                                   onChange={(e) => setChangeUserADRClass(e.target.value)}/>
                                            <Button className={"profile__auto__button__change"}
                                                    text={"save change"}
                                                    click={() => {
                                                        changeProfileInfo(user)
                                                        setRewriteUserADRClass(!rewriteUserADRClass)
                                                    }}/>
                                        </div>}
                                </div>
                                {/*   upload_documents_$P_I  */}
                                <div
                                    className={!rewriteUserPhone ? "profile__user__name__container" : " profile__user__name__container active"}
                                    onClick={() => setRewriteUserDocuments(!rewriteUserDocuments)}>
                                    {!rewriteUserDocuments ? <p>{changeUserDocuments}</p> :
                                        <div className="profile__auto__input__change__container"
                                             onClick={(e) => {
                                                 e.stopPropagation()
                                             }}>
                                            <input className="profile__auto__input__change" type="file"
                                                // placeholder={changeUserDocuments}
                                                // value={changeUserDocuments}
                                                // onChange={(e) => setChangeUserDocuments(e.target.value)}
                                            />
                                            <Button className={"profile__auto__button__change__input"}
                                                    text={"save change"}
                                                    click={() => {
                                                        changeProfileInfo(user)
                                                        setRewriteUserDocuments(!rewriteUserDocuments)
                                                    }}/>
                                        </div>}
                                </div>
                                {/*   truck_plate_number  */}
                                <div
                                    className={!rewriteUserPhone ? "profile__user__name__container" : " profile__user__name__container active"}
                                    onClick={() => setRewriteUserPlateNum(!rewriteUserPlateNum)}>
                                    {!rewriteUserPlateNum ?
                                        <p>{changeUserPlateNum === '' ? "write your truck plate number" : changeUserPlateNum}</p> :
                                        <div className="profile__auto__input__change__container"
                                             onClick={(e) => {
                                                 e.stopPropagation()
                                             }}>
                                            <input className="profile__auto__input__change" type="text"
                                                   placeholder={changeUserPlateNum}
                                                   value={changeUserPlateNum === '' ? "write your truck plate number" : changeUserPlateNum}
                                                   onChange={(e) => setChangeUserPlateNum(e.target.value)}/>
                                            <Button className={"profile__auto__button__change"}
                                                    text={"save change"}
                                                    click={() => {
                                                        changeProfileInfo(user)
                                                        setRewriteUserPlateNum(!rewriteUserPlateNum)
                                                    }}/>
                                        </div>}
                                </div>
                                {/*   euro_class  */}
                                <div
                                    className={!rewriteUserEuroClass ? "profile__user__name__container" : " profile__user__name__container active"}
                                    onClick={() => setRewriteUserEuroClass(!rewriteUserEuroClass)}>
                                    {!rewriteUserEuroClass ?
                                        <p>{changeUserEuroClass === '' ? "write your euro class" : changeUserEuroClass}</p> :
                                        <div className="profile__auto__input__change__container"
                                             onClick={(e) => {
                                                 e.stopPropagation()
                                             }}>
                                            <input className="profile__auto__input__change" type="text"
                                                   placeholder={changeUserEuroClass}
                                                   value={changeUserEuroClass === '' ? "write your euro class" : changeUserEuroClass}
                                                   onChange={(e) => setChangeUserEuroClass(e.target.value)}/>
                                            <Button className={"profile__auto__button__change"}
                                                    text={"save change"}
                                                    click={() => {
                                                        changeProfileInfo(user)
                                                        setRewriteUserEuroClass(!rewriteUserEuroClass)
                                                    }}/>
                                        </div>}
                                </div>
                                {/*   HPK_horse_power  */}
                                <div
                                    className={!rewriteUserHorsePower ? "profile__user__name__container" : " profile__user__name__container active"}
                                    onClick={() => setRewriteUserHorsePower(!rewriteUserHorsePower)}>
                                    {!rewriteUserHorsePower ?
                                        <p>{changeUserHorsePower === '' ? "write your HPK horse power" : changeUserHorsePower}</p> :
                                        <div className="profile__auto__input__change__container"
                                             onClick={(e) => {
                                                 e.stopPropagation()
                                             }}>
                                            <input className="profile__auto__input__change" type="text"
                                                   placeholder={changeUserHorsePower}
                                                   value={changeUserHorsePower === '' ? "write your HPK horse power" : changeUserHorsePower}
                                                   onChange={(e) => setChangeUserHorsePower(e.target.value)}/>
                                            <Button className={"profile__auto__button__change"}
                                                    text={"save change"}
                                                    click={() => {
                                                        changeProfileInfo(user)
                                                        setRewriteUserHorsePower(!rewriteUserHorsePower)
                                                    }}/>
                                        </div>}
                                </div>
                                {/*ENGINE*/}
                                <div
                                    className={!rewriteUserEngine ? "profile__user__name__container" : " profile__user__name__container active"}
                                    onClick={() => setRewriteUserEngine(!rewriteUserEngine)}>
                                    {!rewriteUserEngine ?
                                        <p>{changeUserEngine === '' ? "write your max weight" : changeUserEngine}</p> :
                                        <div className="profile__auto__input__change__container"
                                             onClick={(e) => {
                                                 e.stopPropagation()
                                             }}>
                                            <input className="profile__auto__input__change" type="text"
                                                   placeholder={changeUserEngine}
                                                   value={changeUserEngine === '' ? "write your max weight" : changeUserEngine}
                                                   onChange={(e) => setChangeUserEngine(e.target.value)}/>
                                            <Button className={"profile__auto__button__change"}
                                                    text={"save change"}
                                                    click={() => {
                                                        changeProfileInfo(user)
                                                        setRewriteUserEngine(!rewriteUserEngine)
                                                    }}/>
                                        </div>}
                                </div>
                                {/*   max_weight  */}
                                <div
                                    className={!rewriteUserMaxWeight ? "profile__user__name__container" : " profile__user__name__container active"}
                                    onClick={() => setRewriteUserMaxWeight(!rewriteUserMaxWeight)}>
                                    {!rewriteUserMaxWeight ?
                                        <p>{changeUserMaxWeight === '' ? "write your max weight" : changeUserMaxWeight}</p> :
                                        <div className="profile__auto__input__change__container"
                                             onClick={(e) => {
                                                 e.stopPropagation()
                                             }}>
                                            <input className="profile__auto__input__change" type="text"
                                                   placeholder={changeUserMaxWeight}
                                                   value={changeUserMaxWeight === '' ? "write your max weight" : changeUserMaxWeight}
                                                   onChange={(e) => setChangeUserMaxWeight(e.target.value)}/>
                                            <Button className={"profile__auto__button__change"}
                                                    text={"save change"}
                                                    click={() => {
                                                        changeProfileInfo(user)
                                                        setRewriteUserMaxWeight(!rewriteUserMaxWeight)
                                                    }}/>
                                        </div>}
                                </div>
                            </>
                            :
                            null
                        }
                        {/*   TRIPS AND START RATING  */}
                        {user.role === "driver" && user?.rating > 0 && <>
                            {/*{user?.rating !== [] && <>*/}
                            <h3 className="profile__user__reviews__title">Reviews</h3>
                            <div className="profile__tripsRating__container">
                                {/*<p>{user.trips} trips</p>*/}
                                <p>{filterAllTrips.length} trips</p>
                                <div className="rating__profile__driver__container">
                                    <div className="rating__profile__driver__star"></div>
                                    <p>{averageStarRating.toFixed(2)}</p>
                                </div>
                            </div>
                        </>}
                        {/*   Swiper map  */}
                        <div className="profile__user__reviews__container">
                            <Swiper spaceBetween={50} slidesPerView={1}>
                                {/*{user.reviews !== null && Object.values(user.reviews).map((el, index) => (*/}
                                {user.reviews !== [] && Object.values(user.reviews).map((el, index) => (
                                    <SwiperSlide>
                                        <div className=" profileDriver__swiper__container__block" key={index}>
                                            <div className="profile__user__reviews__container">
                                                <p>{el}</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))
                                }
                            </Swiper>
                        </div>
                        {/*  end map  */}
                    </div>
                )
            )}
        </>
    );
};

export default ProfileDriver;