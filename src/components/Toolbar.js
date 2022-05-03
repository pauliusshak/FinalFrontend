import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";

const Toolbar = ({userOnline, setUserOnline}) => {
const nav=useNavigate()
    const [window, setWindow] = useState("")

    return (
        <div className="toolbar">
            <div className="d-noneSmall">
                <div style={{marginLeft:"0"}} className="logoutLogo">
                    <Link to="/"><img src="https://cdn4.iconfinder.com/data/icons/real-estate-169/48/13-512.png"
                                      alt=""/>Home</Link>

                </div>
                {userOnline &&
                <div className="d-none" style={{color:"#00ff8c",fontSize:"25px"}}>
                    Hello {userOnline}!
                </div>
                }
            </div>


            {!userOnline && <div style={{width: window === '' ?"300px" : ""}} className="d-flex spc-btw">
                {window !== "login" && <div onClick={() => setWindow("login")}>
                    <Link to="/register">Register</Link>
                </div>}
                {window !== "register" && <div onClick={() => setWindow("register")}>
                    <Link to="/login">Login</Link>
                </div>}
            </div>}
            <div>
                <Link to="/main">Forum</Link>
            </div>
            <div>
                <Link to="/favorites">Favorites</Link>
            </div>
            <div className="logoutBox">
                {userOnline && <Link to="/myProfilePage">
                    My profile
                </Link>}

                {userOnline && <div onClick={() => setUserOnline(false)}>
                    <div onClick={()=>nav("/")} className="logoutLogo">
                        <img
                            src="https://cdn3.iconfinder.com/data/icons/glypho-computers-andother-tech/64/door-enter-512.png"
                            alt=""/>
                        Logout
                    </div>
                </div>}
            </div>


        </div>
    );
};

export default Toolbar;