import React, {useEffect, useRef, useState} from 'react';
import Button from "../../../Components/Common/Button";
import {Slide, toast, ToastContainer} from "react-toastify";
import {fire} from "../../../Firebase/Firebase";
import {getDate} from "../../../Helper/adminHelper";

const ChatRoom = ({messages,closeChatRoom,toUid, role, chatRoom }) => {

    /**********************************************************
     * STATE
     **********************************************************/
    const [value, setValue] = useState("");
    /**********************************************************
     * scroll To Bottom
     **********************************************************/
    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
    }
    /**********************************************************
     * handle event key
     **********************************************************/
    const handleEventKey = (e) => {
        if (e.key === 'Enter') {
            sendMessage()
        }
    }

    /**********************************************************
     * FUNCTION FOR SEND MESSAGE
     **********************************************************/
    const sendMessage = () => {
        if (value !== "") {
            fire.database().ref('chats/' + chatRoom + '/' + messages.length).set({
                fromUid: localStorage.getItem('uid__trucks'),
                toUid: toUid,
                date: getDate(),
                text: value,
                role: role,
            }, (error) => {
                if (error) {
                    console.log(error)
                } else {
                    // console.log('SUCCESS')
                    setValue('')
                }
            });
        } else {
            notify()
        }
    }
    /**********************************************************
     * use Effect
     **********************************************************/
    useEffect(()=>{
        scrollToBottom(messagesEndRef)
    },[messages])
    /**********************************************************
     * toast error if send value ""
     **********************************************************/
    const notify = () => toast.error('write text for send message!', {
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
    /**********************************************************
     * Render
     **********************************************************/
    return (
        <div>
                <Button click={() => closeChatRoom()} text={"return"} className={"chat__messages__return__button "}/>
                <span onClick={() => closeChatRoom()} className={"chat__messages__return__button__ico"}>
                </span>
                <div className="chat__messages__container">
                    <div className="chat__messages__container__block">
                        {!!messages.length ? messages.map((m, index) =>
                                (m.text !== "" ? <div className="chat__messages__container__message" key={index}>
                                        <>
                                            {m.fromUid === toUid ?
                                                <div
                                                    className="chat__messages__text__right chat__messages__text__style">{m.text}</div> :
                                                <div
                                                    className="chat__messages__text__left chat__messages__text__style">{m.text}</div>}
                                        </>
                                    <div>
                                        <div  ref={messagesEndRef}/>
                                    </div>

                                        <ToastContainer
                                            position="top-center"
                                            autoClose={2000}
                                            hideProgressBar
                                            newestOnTop={false}
                                            closeOnClick
                                            rtl={false}
                                            pauseOnFocusLoss
                                            draggable
                                            pauseOnHover
                                            transition={Slide}
                                            limit={1}
                                        />
                                    </div>
                                    : null )
                            )
                            :
                            <h2>no data</h2>}
                    </div>
                    <div className="chat__input__container">
                        <input
                            className="chat__input__sendMessage"
                            type="text"
                            placeholder={"write message"}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            onKeyPress={(e) => handleEventKey(e)}
                        />
                        <button onClick={sendMessage} className="chat__input__sendMessage__button">
                            {value !== "" && <span className={"chat__input__sendMessage__span"}></span>}
                        </button>
                    </div>
                </div>
        </div>
    );
};

export default ChatRoom;