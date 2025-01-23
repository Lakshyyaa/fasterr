import React from "react";
import Typewriter from 'typewriter-effect'
function TypeWriter() {
    return (
        <div >
            <Typewriter
                options={{
                    strings: ['Swift fingers, rapid pace, emerge as the typing ace!',
                        'May the fastest fingers prevail!',
                        'Let your typing be a melody, as you race toward victory!',
                        'Ready, set, type!'],
                    autoStart: true,
                    loop: true
                }}
            />
        </div>
    )
}
export default TypeWriter