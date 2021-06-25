import React, { useEffect, useRef, useState } from "react";
import classes from "./chat.module.css";
import Link from "next/link";
import {apiDomain} from "../../apiPath"

// import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

// import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useSelector } from "react-redux";

import firebase from "../firebase";
import processString from "react-process-string";
import { Tooltip } from "@material-ui/core";

// firebase.initializeApp({
//   // your config
// });

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

const receivedMessage = new Audio("/message.mp3");
const sentMessage = new Audio("/tick.mp3");
let config = [
  {
    regex: /(http|https):\/\/(\S+)\.([a-z]{2,}?)(.*?)( |\,|$|\.)/gim,
    fn: (key, result) => (
      <span key={key}>
        <a
          target="_blank"
          href={`${result[1]}://${result[2]}.${result[3]}${result[4]}`}
        >
          {(result[2] + "." + result[3] + result[4]).length > 45
            ? "Click here"
            : result[2] + "." + result[3] + result[4] + " "}
        </a>
      </span>
    ),
  },
  {
    regex: /(\S+)\.([a-z]{2,}?)(.*?)( |\,|$|\.)/gim,
    fn: (key, result) => (
      <span key={key}>
        <a
          target="_blank"
          href={`http://${result[1]}.${result[2]}${result[3]}`}
        >
          {(result[1] + "." + result[2] + result[3]).length > 45
            ? "click here"
            : result[1] + "." + result[2] + result[3] + " "}
        </a>
      </span>
    ),
  },
];

function App() {
  const userId = useSelector((state) => state.user.userId);
  return (
    <div className={classes.App}>
      <header>
        <h1>Live Chat</h1>
        <div>
          <img
            src="/LOGO.png"
            alt="logo"
            style={{ width: "30px", height: "30px", objectFit: "cover" }}
          />
          {userId && (
            <img
              src={`${apiDomain}/image/profile/${userId}`}
              alt="profile"
              style={{ width: "30px", height: "30px", objectFit: "cover" }}
            />
          )}
        </div>
      </header>

      <section>
        <ChatRoom />
      </section>
    </div>
  );
}

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt");

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");
  const userId = useSelector((state) => state.user.userId);
  const fName = useSelector((state) => state.user.fName);
  const lName = useSelector((state) => state.user.lName);
  const sendMessage = async (e) => {
    e.preventDefault();
    setFormValue("");
    sentMessage.play();
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      name: fName + " " + lName,
      userId,
    });

    // dummy.current.scrollIntoView({ behavior: "smooth" });
    var divFirst = document.getElementById("divFirst");
    divFirst.style.visibility = "visible";
    divFirst.style.display = "block";
    divFirst.tabIndex = "-1";
    divFirst.focus();
  };

  useEffect(() => {
    if (messages) {
      if (messages[messages.length - 1])
        if (messages[messages.length - 1].userId === userId) {
        } else {
          receivedMessage.play();
        }
    }
    // receivedMessage.play();
    var objDiv = document.getElementById("mainDivScroll");
    objDiv.scrollTop = objDiv.scrollHeight;
  }, [messages]);

  return (
    <>
      <main id="mainDivScroll">
        {messages &&
          messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              messageClass={msg.userId === userId ? "sent" : "received"}
            />
          ))}

        <div id="divFirst" ref={dummy}></div>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="enter your message here"
        />

        <button type="submit" disabled={!formValue || !userId}>
          <i className="far fa-paper-plane"></i>
        </button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, userId, name } = props.message;

  return (
    <>
      <div
        className={`${classes.message} ${
          props.messageClass === "sent" ? classes.sent : classes.received
        }`}
      >
        <Tooltip title={name ? name : "not available"}>
          <Link href={`/user/details/${userId}`}>
            <img
              src={
                userId
                  ? `${apiDomain}/image/profile/${userId}`
                  : "https://api.adorable.io/avatars/23/abott@adorable.png"
              }
            />
          </Link>
        </Tooltip>
        <p>{processString(config)(text)}</p>
      </div>
    </>
  );
}

export default App;
