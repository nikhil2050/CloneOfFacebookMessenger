import React, {useState, useEffect} from 'react';
import './App.css';
import {Button} from '@material-ui/core'
// import FormControl from '@material-ui/core/FormControl';
import { FormControl, InputLabel, FormHelperText, Input } from '@material-ui/core';
import Message from './components/Message';
import db from './firebase';
import firebase from 'firebase'
import FlipMove from 'react-flip-move'
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';

function App() {

  const [inputText, setInputText] = useState('')
  const [messageArray, setMessageArray] = useState([
      // {username:'Nk1', message:'Hello world'},
      // {username:'Nk2', message:'Hello India'}
  ])
  const [loggedUsername, setLoggedUsername] = useState('') 

  console.log(inputText);

  /*
   *  Submit button handler
   */
  const sendMessage = (event) => {
    event.preventDefault()

    // Store it to FirebaseDB
    db.collection("fbmsngr_messages").add({
      username:loggedUsername,
      message: inputText,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    // all logic to append sent msg in 'messageArray'
    setMessageArray([...messageArray, {username:loggedUsername, message:inputText}])  // Append 'inputText' in messageArray
    setInputText('')
  }

  useEffect(() => {
    // On app load, take username
    setLoggedUsername(prompt('Please enter your name'))
  },[])

  useEffect(()=>{
     db.collection('fbmsngr_messages').orderBy('timestamp','desc')
        .onSnapshot(snapshot => {
          setMessageArray(snapshot.docs.map(doc => ( {
            id:doc.id,
            message: doc.data()
          } )))
        })
  },[])

  return (
    <div className="App">
      <img src="https://scontent.fnag4-1.fna.fbcdn.net/v/t39.8562-6/37789948_1959933824027454_666414594595487744_n.png?_nc_cat=1&_nc_sid=6825c5&_nc_ohc=-0zelYTEZukAX-bOlq9&_nc_ht=scontent.fnag4-1.fna&oh=f18294493effb2d85fa239b2cbef50c1&oe=5F3CFFB3" />
      <h2> Welcome {loggedUsername}</h2>
      <form className="app__form">  
        <FormControl className="app__formcontrol">

          {/* input field */}
          {/* <InputLabel> Enter a message.. </InputLabel> */}
          <Input className="app_inputText" value={inputText} onChange={e => setInputText(e.target.value)} />
        
          {/* button */}
          <IconButton className="app_sendIcon" type="submit" onClick={sendMessage} disabled={!inputText} 
              variant='contained' color='primary' >
            <SendIcon />
          </IconButton>
          {/* <Button type="submit" onClick={sendMessage} disabled={!inputText} 
              variant='contained' color='primary'> Send message </Button> */}

        </FormControl>
      </form> 

        {/* Message */}
        {/* Message */}
        {/* Message */}
        <FlipMove>
        {
          messageArray.map(({id, message}) => ( // Refer: setMessageArray() above
            <Message key={id} loggedUsername={loggedUsername} message={message} />)
          )
        }
        </FlipMove>
    </div>
  );
}

export default App;
