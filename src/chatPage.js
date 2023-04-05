import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import "firebase/compat/storage"
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';

import { formatRelative, format } from 'date-fns';
import { ko } from 'date-fns/locale';
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
export const storage = firebaseApp.storage();

export function ChatPage(){
    const [user] = useAuthState(auth);

    return (
        <div className="App">
        <header>
            <MemoIn />
            <SignOut />
        </header>
        <section>
            {user ? <ChatRoom /> : <SignIn />}
        </section>
        </div>
    );
}

function SignIn() {

    var provider = new firebase.auth.GoogleAuthProvider();
    const signInWithGoogle = () => auth.signInWithPopup(provider);  
  
    return (
      <>
        <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
        <p> Hi JHJ ❤️</p>
      </>
    )
  
}

function MemoIn() {
    return (
        <>
        <Link to="/memo">
            <button_memo className="to-memo">💌💞</button_memo>
        </Link>
        </>  
    )
}
  
  function SignOut() {
    return auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
    )
  }
  
  
  function ChatRoom() {
    const inputRef = useRef();
    const bottomListRef = useRef();
  
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limitToLast(200);
  
    const [messages] = useCollection(query, { idField: 'id' });
  
    const [formValue, setFormValue] = useState('');
  
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, [inputRef]);
  
    useEffect(() => {
      if (bottomListRef.current) {
        bottomListRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [messagesRef]);
  
    const sendMessage = async (e) => {
      e.preventDefault();
  
      const { uid, photoURL } = auth.currentUser;
      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL,
        isRead:false
      })
      setFormValue('');
      bottomListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  
    return (<>
      <main>
        {messages && messages.docs.map(msg => <ChatMessage key={msg.id} message={msg.data()} id={msg.id}/>)}
        <span ref={bottomListRef}></span>
      </main>
        <form onSubmit={sendMessage}>
          <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="메시지를 입력하세요 ♡" />
          <button type="submit" disabled={!formValue}>💗</button>
        </form>
    </>)
  }
  async function update(id){
    await firestore.collection('messages').doc(id).update({isRead:true});
  }
  
  function ChatMessage(props) {
    var { text, uid, photoURL, createdAt, isRead} = props.message;
    const id = props.id;
    const formatDate = date => {
      let formattedDate = '';
      let formattedDate_f = '';
      if (date) {
        formattedDate_f = formatRelative(date, new Date());
        if (formattedDate_f.charAt(0)==='t'){
          formattedDate = format(date,'a p',{locale: ko});
        }
        else{
          formattedDate = format(date,'PP',{locale: ko});
        }
      }
      return formattedDate;
    };
  
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
    if(isRead === false && uid !== auth.currentUser.uid){
      update(id);
    }
  
    return (
      <div className={`message ${messageClass}`}>
        <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
        <p>{text}</p>
        <t>{createdAt?.seconds ? (
              <span className="text-gray-500 text-xs">
                {formatDate(new Date(createdAt.seconds * 1000))}
              </span>
            ) : null}
            <check>
              {isRead?null:1}
            </check>
        </t>
      </div>
    )
  };

  export default ChatPage;