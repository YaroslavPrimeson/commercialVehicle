import React, {useEffect, useRef, useState} from "react";
import "./chat.scss";
import {fire} from "../../../Firebase/Firebase";
import userLogo from "../iconSvg/userLogo.svg";
import {getCollection, getDate} from "../../../Helper/adminHelper";
import Filter from "../Filter/Filter";
import ChatRoom from "./chatRoom";


const Chat = ({role}) => {
    /**********************************************************
     * STATE
     **********************************************************/
    const [chatRoom, setChatRoom] = useState('');
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [toUid, setToUid] = useState("");
    const [visibleDialog, setVisibleDialog] = useState(false);
    const [tripsFilterSearch, setTripsFilterSearch] = useState([]);


    /**********************************************************
     * GET USERS
     **********************************************************/
    const getUsers = () => {
        getCollection('users').then(u => {
            setUsers(u.filter((el)=> el.uid_firebase !== localStorage.getItem("uid__trucks") ));
        }).catch(e => {
            console.log(e)
        })
    }
    /**********************************************************
     * FILTER CHAT
     **********************************************************/
    const filterArray = (input) => {
        const newFilter = users.filter((el) =>
            el.role.toLowerCase().includes(input) ||
            el.displayName_firebase?.toLowerCase().includes(input)
        )
        setTripsFilterSearch(tripsFilterSearch.filter((el)=> el.uid_firebase !== localStorage.getItem("uid__trucks") ))
        // setTripsFilterSearch(newFilter)
    }
    /**********************************************************
     * Handle
     **********************************************************/
    useEffect(() => {
        setMessages([])
        fire.database().ref('chats/' + chatRoom).on("child_added", function (snapshot) {
            if (messages[messages.length - 1] !== snapshot.val()) {
                setMessages(prevState => [...prevState, snapshot.val()])
            }
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    }, [chatRoom])
    const clickChat = (uid) => {
        let chatRoom = ''
        role === 'driver' ?
            chatRoom = (localStorage.getItem('uid__trucks') + '===' + uid)
            :
            chatRoom = (uid + '===' + localStorage.getItem('uid__trucks'))
        setChatRoom(chatRoom)
        fire.database().ref().child("chats/" + chatRoom).get().then((snapshot) => {
            if (snapshot.exists()) {
                setMessages(snapshot.val())
            } else {
                fire.database().ref('chats/' + chatRoom + '/0').set({
                    fromUid: localStorage.getItem('uid__trucks'),
                    toUid: uid,
                    date: getDate(),
                    text: ''
                })
            }
        }).catch((error) => {
            console.error(error);
        });
        setToUid(uid)
        setVisibleDialog(!visibleDialog)
    }
    const closeChatRoom = () => {
        setVisibleDialog(!visibleDialog)
        setChatRoom('')
        fire.database().ref().child("chats/" + chatRoom).off();
    }

    useEffect(() => {
        getUsers()
        if (users[0] !== null) {
            filterArray()
        }
    }, [])
// const filterFilter = users.filter((el)=> el.uid_firebase !== localStorage.getItem("uid__trucks") )

    useEffect(() => {
        setTripsFilterSearch(users)
        console.log(users)
    }, [messages, users])

    /**********************************************************
     * Render
     **********************************************************/
    return (
        <div className="chat__container">
            {!visibleDialog ?
                <div className="chat__messenger__allUser__list__container">
                    <Filter setFilter={filterArray}/>
                    {tripsFilterSearch.map((el, index) => (
                        <div onClick={() => clickChat(el.uid_firebase)} className="chat__messenger__allUser__list "
                             key={index}>
                            {el?.photoURL_firebase === '' ?
                                <div>
                                    <img src={userLogo} alt="user logo" className="chat__messenger__list__logo"/>
                                </div> :
                                <div>
                                    <img src={el?.photoURL_firebase} alt="user logo"
                                         className="chat__messenger__list__logo"/>
                                </div>
                            }
                            <p className="chat__messenger__list__logo__text">{el.displayName_firebase}</p>
                        </div>

                    ))}
                </div>
                :
                <ChatRoom closeChatRoom={closeChatRoom} role={role} messages={messages} toUid={toUid}
                          chatRoom={chatRoom}/>
            }
        </div>
    );
};

export default Chat;