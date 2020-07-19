import React from "react"

const Message = (props) => {
    return(
        <div>
            <p>{props.username}: {props.text}</p>
        </div>
    )
}

export default Message