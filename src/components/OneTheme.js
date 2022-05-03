import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import MainContext from "../mainContext/MainContext";


const OneTheme = ({theme, i}) => {

    const {setFavorites, favorites} = useContext(MainContext)
    const nav = useNavigate()
    const [isFavorite, setFavorite] = useState(!!favorites.find(x => x.theme === theme.theme))


    function addFav() {
        if(!isFavorite){
            favorites.push(theme)
            setFavorite(true)
            setFavorites(favorites);
        }
    }
    function removeFav() {
        const newFavorites = favorites ? favorites.filter(x => x.theme !== theme.theme) : []
        setFavorites(newFavorites)
        setFavorite(false)
    }




    return (
        <div className="themes">
            <div className="theme" onClick={() => nav(`/singleTheme/${theme.theme}`)} key={i}>
                <h2>{theme.theme}</h2>
                <h4>{theme.category}</h4>

            </div>


            {<div onClick={!isFavorite? addFav : removeFav}>{!isFavorite?
                <img style={{width: "30px",height:"30px"}} src="http://cdn.onlinewebfonts.com/svg/img_520926.png" alt=""/>:
                <img style={{width: "30px",height:"30px"}} src="https://cdn0.iconfinder.com/data/icons/classic-icons/512/075.png" alt=""/>}</div>}
        </div>
    );
};

export default OneTheme;