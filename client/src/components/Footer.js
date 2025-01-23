import React from "react";
import styles from '../styles/footerstyles.css'
import githubLogo from '../images/github-logo.png'
import twt from '../images/twitter-logo.png'
function Footer() {
    return (
        <div className="footerdiv">
            <div className="innerfooter">
                <div className="inner" id="madeby">
                    made by <span style={{ marginLeft: '5px' }}><strong>Lakshya</strong></span>
                </div>
                <div className="inner">
                    <div>
                        <a href="https://github.com/Lakshyyaa" target="_blank" rel="noopener noreferrer">
                            <img alt="invertocat" src={githubLogo} className="github" />
                        </a>
                    </div>
                    <div>
                        <a href="https://twitter.com/Lakshyaa_22" target="_blank" rel="noopener noreferrer">
                            <img alt="twitter" src={twt} className="twt" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Footer