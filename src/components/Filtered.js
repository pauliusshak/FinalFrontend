import React from 'react';
import {useNavigate} from "react-router-dom";

const Filtered = ({x}) => {
    const nav = useNavigate()

    return (
        <div  onClick={() => nav(`/singleTheme/${x.theme}`)}className="filtered">
            <span style={{color:"#00ff8c"}}>{x.theme}</span>
            <span>{x.category}</span>
        </div>
    );
};

export default Filtered;