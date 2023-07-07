import React, { useEffect } from "react";
import MainGame from "./Game";
import SocketFront from "./Socketfront";
function Multiplayer()
{
    useEffect(()=>{
        window.addEventListener('beforeunload', function (event) {
            event.preventDefault(); // Cancel the default behavior

            // Optionally, you can send a custom message to the server indicating that the user is navigating away
            // socket.emit('user-navigating-away');

            // Ensure the connection is not closed
            return null;
        });
    },[])
    return(
        <div>
            <MainGame/>
            <SocketFront />
        </div>
    )
}
export default Multiplayer