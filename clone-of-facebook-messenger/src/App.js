import React, {useState, useEffect} from 'react';
import './App.css';
import {Button} from '@material-ui/core'
// import FormControl from '@material-ui/core/FormControl';
import { FormControl, InputLabel, FormHelperText, Input } from '@material-ui/core';
import Message from './components/Message';

function App() {

  const [inputText, setInputText] = useState('')
  const [messageArray, setMessageArray] = useState([
      {username:'Nk1', text:'Hello world'},
      {username:'Nk2', text:'Hello India'}
  ])
  const [loggedUsername, setLoggedUsername] = useState('') 

  console.log(inputText);

  /*
   *  Submit button handler
   */
  const sendMessage = (event) => {
    event.preventDefault()

    // all logic to send message here..
    setMessageArray([...messageArray, {username:loggedUsername, text:inputText}])  // Append 'inputText' in messageArray
    setInputText('')
  }

  useEffect(() => {
    // On app load, take username
    setLoggedUsername(prompt('Please enter your name'))
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
