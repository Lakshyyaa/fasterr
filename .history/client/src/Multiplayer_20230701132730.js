import React from "react";
import MainGame from "./Game";
import SocketFront from "./Socketfront";
function Multiplayer()
{
    return(
        <div>
            <SocketFront/>
            <Game/>
        </div>
    )
}