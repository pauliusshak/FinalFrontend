import React, {useContext} from 'react';
import {useNavigate} from "react-router-dom";
import MainContext from "../mainContext/MainContext";
const HomePage = () => {
    const nav= useNavigate()
    const {userOnline} = useContext(MainContext)
    return (
        <div style={{
            backgroundSize:"cover",
            backgroundPosition:"center",
            height:"700px",
            justifyContent:"center",
            backgroundImage:
                `url("https://cdn.wallpapersafari.com/19/99/mYRqiT.jpg")`}}
             className="container d-flex">

            {!userOnline?<div className="d-flex clmnMid">
                <div className="welcomeBox">Have an account?
                    <button onClick={() => nav("/login")} className="welcomeBtn">Sign in!</button>
                </div>

                <div className="welcomeBox">
                    Want to join?
                    <button onClick={() => nav("/register")} className="welcomeBtn">Register!</button>
                </div>
            </div>
            :
            <div className="centertext">
                <h1 style={{color:"rgb(93,206,151)",fontSize:"65px"}}>Discuss about anything You want!</h1>
            </div>
            }

        </div>
    );
};

export default HomePage;