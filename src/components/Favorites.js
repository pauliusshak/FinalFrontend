import React, {useContext} from 'react';
import MainContext from "../mainContext/MainContext";
import {useNavigate} from "react-router-dom";

const Favorites = ({favTheme, i}) => {
    const {favorites,setFavorites} = useContext(MainContext)
    const nav = useNavigate()

    function removeFav() {
        const newFavorites = favorites ? favorites.filter(x => x.theme !== favTheme.theme) : []
        setFavorites(newFavorites)
    }

    return (
        <div className="column">

            <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                <div onClick={() => nav(`/singleTheme/${favTheme.theme}`)}>
                    {favorites.length > 0 ?
                        <div className="favorite">
                            <div style={{color:" #00ff8c"}}>
                                {favTheme.theme}
                            </div>
                            <div className="d-flex">
                                {favTheme.category}
                            </div>

                        </div> :
                        <div>
                            <h1>YOU HAVE NO FAVORITES</h1>
                        </div>}

                </div> <button onClick={removeFav} style={{width:"150px",height:"30px"}}><img style={{width:"15px"}} src="https://uxwing.com/wp-content/themes/uxwing/download/01-user_interface/delete.png" alt=""/></button>
            </div>

        </div>

    );
};

export default Favorites;