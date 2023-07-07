import React, { useEffect } from "react";
import MainGame from "./Game";
import SocketFront from "./Socketfront";
function Multiplayer()
{
    useEffect(()=>{

    },[])
    return(
        <div>
            <MainGame/>
            <SocketFront />
        </div>
    )
}
export default Multiplayer