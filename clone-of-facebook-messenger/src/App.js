import React, {useState, useEffect} from 'react';
import './App.css';
import {Button} from '@material-ui/core'
// import FormControl from '@material-ui/core/FormControl';
import { FormControl, InputLabel, FormHelperText, Input } from '@material-ui/core';
import Message from './components/Message';
import db from './firebase';
import firebase from 'firebase'

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
          setMessageArray(snapshot.docs.map(doc => (
              doc.data()
          )))
        })
  },[])

  return (
    <div className="App">
      <h2> Welcome {loggedUsername}</h2>
      <form>  
        <FormControl >

          {/* input field */}
          <InputLabel> Enter a message.. </InputLabel>
          <Input value={inputText} onChange={e => setInputText(e.target.value)} />
        
          {/* button */}
          <Button type="submit" onClick={sendMessage} disabled={!inputText} 
              variant='contained' color='primary'> Send message </Button>

        </FormControl>

        {/* Message */}
        {/* Message */}
        {/* Message */}
        {
          messageArray.map((message) => (
            <Message loggedUsername={loggedUsername} message={message} />)
          )
        }
      </form> 
    </div>
  );
}

export default App;
