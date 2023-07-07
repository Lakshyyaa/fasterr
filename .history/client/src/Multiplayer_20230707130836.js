import React, { useEffect } from "react";
import MainGame from "./Game";
import SocketFront from "./Socketfront";
function Multiplayer()
{
    useEffect(()=>{
        window.addEventListener('beforeunload', function (event) {
            event.preventDefault();
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