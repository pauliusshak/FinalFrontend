import React, {useContext, useEffect} from 'react';
import MainContext from "../mainContext/MainContext";
import YouTubeVideo from "./YouTubeVideo";


const OneComment = ({i, x}) => {
    const {getNewPhoto} = useContext(MainContext)
    const regex = /(^|\ )(http(?:s?):\/\/)?(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;
    const found = x.comment.match(regex);
    const youtubeId = found ? found[3] : null;

    return (


                <div className="commBox" key={i}>
                    <div className="d-flex">
                        <div style={{fontWeight:"bold",fontSize:"25px"}} className="d-flex column centera centerj">
                            <img style={{width: "100px", height: "100px", borderRadius: "5px"}} src={x.photo} alt=""/>
                                {x.username}
                        </div>

                        <div className="comms">
                            <h4>
                                   {x.comment}
                            </h4>
                            <YouTubeVideo youtubeId={youtubeId} />
                        </div>
                    </div>

                    <div className="dates d-noneSmallest d-noneSmall">{x.date}</div>
                </div>





    );
};

export default OneComment;