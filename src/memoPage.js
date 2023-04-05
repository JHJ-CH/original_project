import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import "./App.css";
import MemoList from "./Memo";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import "firebase/compat/storage"
import { useCollection } from 'react-firebase-hooks/firestore';
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";

//LUCETE
// const firebaseApp = firebase.initializeApp({
//     apiKey: "AIzaSyBemDUWRLMRLC3FHujZWE_cngjkZlfgDGg",
//     authDomain: "jhjchat.firebaseapp.com",
//     projectId: "jhjchat",
//     storageBucket: "jhjchat.appspot.com",
//     messagingSenderId: "123244137419",
//     appId: "1:123244137419:web:f3e481b623056f4b74c44e"
// })

//JHJ361217
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCucNljgWlnQc7uWT-UdGvinCo28jRwIuw",
    authDomain: "jhj-chats.firebaseapp.com",
    projectId: "jhj-chats",
    storageBucket: "jhj-chats.appspot.com",
    messagingSenderId: "968225357706",
    appId: "1:968225357706:web:b3dece82d8a2115a99d273",
    measurementId: "G-Q7PE4SZQ00"
})

const auth = firebaseApp.auth();
const firestore = firebaseApp.firestore();
export const storageService = firebaseApp.storage();

export function MemoPage() {
    const [Memos, setMemos] = useState([]);
    const [input, setInput] = useState("");
    const messagesRef = firestore.collection('Memos');
    const query = messagesRef.orderBy('createdAt','desc');
  
    const [texts] = useCollection(query, { idField: 'id' });
  

    // useEffect(() => {
    // firestore.collection("Memos")
    //     .orderBy("createdAt", "desc")
    //     .onSnapshot((snapshot) => {
    //       setMemos(
    //         snapshot.docs.map((doc) => ({ id: doc.id, Memo: doc.data() }))
    //       );
    //     });
    // }, []);

    const addMemo = async(e) => {
      e.preventDefault();
      const displayName  = auth.currentUser.displayName;
      await messagesRef.add({
        Memo: input,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        displayName: displayName
      });
      setInput("");
    };
  
    return (
      <div className="App">
        <div className="appContainer">
            <header>
                <Link to="/">
                <button_back className="back">⏪</button_back>
                </Link>
                <h1>MEMO ❤️</h1>
            </header>
          <form className="appInput" onSubmit={addMemo} >
            <FormControl
                fullWidth="true">
              <InputLabel
              color="error">
              메모를 입력하세요 ♡
              </InputLabel>
              <Input
                value={input}
                onChange={(event) => {
                  setInput(event.target.value);
                }}
              />
            </FormControl>
            <div className="add-button">
              <Button
                disabled={!input}
                type="submit"
                onClick={addMemo}
                variant="contained"
                color="primary"
              >
                ➕
              </Button>
            </div>
          </form>
          <main_memo>
            <div className="MemoList">
                {texts && texts.docs.map(memos => <MemoList key={memos.id} memo={memos.data()} id={memos.id}/>)}
                {/* <ul>
                    {Memos.map((Memo) => (
                    <MemoList Memo={Memo} />
                    ))}
                </ul> */}
            </div>
          </main_memo>
        </div>
      </div>
    );
}

export default MemoPage;
