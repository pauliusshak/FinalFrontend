import React, {useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";



const RegisterPage = () => {
    const nav = useNavigate()
    const [getMsg, setMsg] = useState(null)
    const usernameRef=useRef()
    const pass1Ref=useRef()
    const pass2Ref=useRef()
    function register() {

        const user = {
            username: usernameRef.current.value,
            pass1: pass1Ref.current.value,
            pass2:pass2Ref.current.value,
            photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png"

        }
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        }
        fetch("http://localhost:4000/register", options)
            .then(res => res.json())
            .then(data => {

                if(data.error){
                    setMsg(data.error)
                }else{
                    nav('/login')
                }

            })
    }




    return (
        <div style={{justifyContent:"center"}} className="container">
            <div className="logCard">
                <h1>Register</h1>
                <input ref={usernameRef} type="text" placeholder="Username..."/>
                <input ref={pass1Ref} type="text" placeholder="Password..."/>
                <input ref={pass2Ref} type="text" placeholder="Repeat password..."/>
                <button onClick={register}>Register</button>
                <h5 style={{color:"#00ff8c"}}>
                    {getMsg}
                </h5>
            </div>

        </div>


    );
};

export default RegisterPage;