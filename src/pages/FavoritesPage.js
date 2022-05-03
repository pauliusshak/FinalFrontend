import React, {useContext} from 'react';
import Favorites from "../components/Favorites";
import MainContext from "../mainContext/MainContext";

const FavoritesPage = () => {
    const {favorites} = useContext(MainContext)

    return (
        <div className="container column">
            <div style={{
                padding: "5px 30px 5px 30px",
                fontSize: "20px", marginBottom: "10px",
                display: 'flex',
                flexDirection: "column",
                textAlign: "center"
            }} className="topTable">

                <span style={{color:"#00ff8c"}}>Your saved themes</span>

                <span className="d-flex spc-btw">
                    <span style={{fontSize: "15px"}}>Topic</span>
                    <span style={{fontSize: "15px"}}>Category</span>
                </span>
            </div>
            {favorites.length > 0? <div>
                {favorites.map((x, i) => <Favorites favTheme={x} key={i} i={i}/>)}
            </div>
            :
                <h1>You have no favorites</h1>
            }
        </div>

    );
};

export default FavoritesPage;