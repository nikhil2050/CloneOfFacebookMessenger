import React from "react"
import "./Message.css"
import {Card, CardContent, Typography} from "@material-ui/core"

const Message = ({message, loggedUsername}) => {
    const isLoggedUser = loggedUsername === message.username;

    return(
        <div className={`message ${isLoggedUser && 'message__div_loggedUser'}`}>
            <Card className={isLoggedUser ? "message__userCard" : "message__guestCard"}>
                <CardContent className="">
                    <Typography color="white" variant="h5" component="h2">
                        {message.username}: {message.message}
                    </Typography>
                </CardContent>    
            </Card>

            {/* <p>{props.username}: {props.text}</p> */}
        </div>
    )
}

export default Message