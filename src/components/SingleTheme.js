import React, {useContext, useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import MainContext from "../mainContext/MainContext";
import OneComment from "./OneComment";


const SingleTheme = () => {
    const {themeArr,getProfilePhoto,getComments,setComments,userOnline,photoChanged} = useContext(MainContext)
    const {theme} = useParams()
    const myTheme = themeArr.find(x => x.theme === theme)
    const commentRef = useRef()
    const [getMsg, setMsg] = useState(null)


    useEffect(() => {
        if (photoChanged) {
            const user = {
                username: userOnline,
                newPhoto:  getProfilePhoto,
                topic:  myTheme ? myTheme.theme: "Error.Theme with this title doesn`t exist!",
            }
            const options = {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(user)
            }
            fetch("http://localhost:4000/updateCommentPhotos", options)
                .then(res => res.json())
                .then(data => {
                    setComments(data.comments)
                })
        }
    },[])


    useEffect(() => {{
            const theme = {
                topic : myTheme ? myTheme.theme: "Error.Theme with this title doesn`t exist!",
            }
            const options = {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(theme)
            }
            fetch("http://localhost:4000/loadComments", options)
                .then(res => res.json())
                .then(data => {
                    setComments(data.comments)
                })
        }
    },[])

    function addComment() {

        const info = {
            username: userOnline,
            comment:commentRef.current.value,
            photo:getProfilePhoto,
            date: new Date(),
            topic: myTheme? myTheme.theme : "Error.Theme with this title doesn`t exist!"
        }
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(info)
        }
        fetch("http://localhost:4000/addComment", options)
            .then(res => res.json())
            .then(data => {
                if(data.error){
                    setMsg(data.error)

                }else{

                    setComments([...getComments,data.newComment])
                    commentRef.current.value=""
                }

            })
    }

    return (


        <div style={{justifyContent:"center"}} className="container">
            <div className="themeMargin">
                <div className="d-flex centera centerj">
                    <div className="topTable">
                        <h1 style={{color:"#43eea4"}}>
                            {myTheme? myTheme.theme : "Error. Theme with this title doesn`t exist!"}
                        </h1>
                    </div>
                </div>

                {getComments.map((x,i)=>
                    <OneComment key={i} i={i} x={x}/>)}
                {userOnline &&
                <div className="d-flex column centerj centera">
                    <textarea ref={commentRef} type="text" placeholder="Add new comment (max 500 characters)..."/>
                    <button className="specBtn" onClick={addComment}>
                        Comment
                    </button>

                    <h5 style={{color:"#00ff8c"}}>
                        {getMsg}
                    </h5>
                </div>}
                {myTheme && <h5 style={{marginLeft: "50px"}}>This topic was created by {myTheme.creator}</h5>}
            </div>

        </div>

    );
};

export default SingleTheme;