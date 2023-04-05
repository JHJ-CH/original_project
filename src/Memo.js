import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    List,
    ListItem,
    ListItemText,
    Button,
    Modal,
    Input,
  } from "@material-ui/core";

import "./Memo.css";
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import "firebase/compat/storage"
import { formatRelative, format } from 'date-fns';
import { ko } from 'date-fns/locale';
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

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

const firestore = firebaseApp.firestore();

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export function MemoList(props) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState();
  const classes = useStyles();

  const {Memo, createdAt, displayName} = props.memo;
  const id = props.id;

  const handleOpen = () => {
    setOpen(true);
  };

  const updateMemo = () => {
    firestore.collection("Memos").doc(id).set(
      {
        Memo: input,
      },
      { merge: true }
    );
    setOpen(false);
  };
  let second ='';
  if (createdAt!==null)
    second = format(createdAt.seconds*1000, "yyyy-MM-dd HH:mm:ss") +" / "+ displayName

    

  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div className={classes.paper}>
          <h1>fix it!</h1>
          <Input
            placeholder={Memo}
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button onClick={(e) => updateMemo()}>update</Button>
        </div>
      </Modal>

      <List className="Memolist-entry">
        <ListItem className="Memo-inputbox">
          <ListItemText
            primary={Memo}
            secondary= {second}
          ></ListItemText>
        </ListItem>
        <Button size="small" className="update-button" onClick={(e) => setOpen(true)}>
          수정
        </Button>
        <div className="delete-button">
          <DeleteForeverIcon size="small"
            onClick={(event) =>
              firestore.collection("Memos").doc(id).delete()
            }
          />
        </div>
      </List>
    </>
  );
}

export default MemoList;