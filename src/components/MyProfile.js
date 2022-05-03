import React, {useContext, useEffect, useRef, useState} from 'react';
import MainContext from "../mainContext/MainContext";
import {useNavigate} from "react-router-dom";

const MyProfile = () => {

    const {
        myComments, setMyComments,
        myThemes, setMyThemes,
        userOnline,
        getProfilePhoto,
        setProfilePhoto,
        photoChanged,
        setPhotoChanged,
        setComments
    } = useContext(MainContext)
    const [getMsg, setMsg] = useState(null)
    const [changePic, setChangePic] = useState(false)
    const photoRef = useRef()
    const nav = useNavigate()
    useEffect(() => {
        if (!userOnline) {
            alert("Please login")
            nav('/')
        }
    }, [])
    useEffect(() => {
        if (photoChanged) {
            const user = {
                username: userOnline,
                newPhoto: getProfilePhoto
            }
            const options = {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(user)
            }
            fetch("http://localhost:4000/updatePhoto", options)
                .then(res => res.json())
                .then(data => {
                    setProfilePhoto(data.myUser.photo)
                })


        }
    }, [photoChanged])

    function addPhoto() {
        const user = {
            newPhoto: photoRef.current.value,
            username: userOnline
        }
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        }
        fetch("http://localhost:4000/addPhoto", options)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setMsg(data.error)
                } else {
                    setChangePic(false)
                    setMsg(null)
                    setPhotoChanged(true)
                    setProfilePhoto(data.newPhoto)
                }
            })
    }

    useEffect(() => {
        const user = {
            username: userOnline,
        }
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        }
        fetch("http://localhost:4000/sendInfo", options)
            .then(res => res.json())
            .then(data => {
                setMyComments(data.comments)
                setMyThemes(data.themes)
            })
    }, [])

    return (

        <div className="myProfile">
            <img src={getProfilePhoto} alt=""/>
            <div style={{fontWeight: "bolder", color: "#00ff8c", marginBottom: "3px"}}>
                {userOnline}
            </div>

            <button onClick={() => setChangePic(!changePic)}>Edit profile picture</button>
            {changePic && <div className="d-flex column">
                <input ref={photoRef} type="text" placeholder="Your photo URL..."/>
                <button onClick={addPhoto}>
                    Add profile photo
                </button>

            </div>
            }
            <h5 style={{color: "#00ff8c"}}>
                {getMsg}
            </h5>
            <div className="d-flex spc-btw clmn">
                <span style={{display: "flex",flexDirection: "column"}} className="myProfileBox">
                    <span><h4>Your themes:</h4></span>
                    <div>
                           {myThemes.map((x, i) =>
                               <div style={{
                                   marginLeft:"30px",
                                   display: "flex",
                                   alignItems: "start",
                                   fontWeight: "bold",
                                   color: "#00ff8c",
                                   cursor: "pointer"
                               }} key={i}
                                    onClick={() => nav(`/singleTheme/${x.theme}`)}>{x.theme}
                               </div>)}
                    </div>

            </span>
                <span style={{display: "flex", flexDirection: "column",alignItems:"center"}} className="myProfileBox">
                     <h4>
                          Your comments:
                     </h4>
                    {myComments.map((x, i) => <div key={i} className="lilComm"
                                                   style={{textAlign: "left"}}>{x.comment}</div>)}
                </span>

            </div>

        </div>
    );
};

export default MyProfile;