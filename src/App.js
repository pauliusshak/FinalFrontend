import MainContext from "./mainContext/MainContext";
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useEffect, useState} from "react";
import Toolbar from "./components/Toolbar";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import SingleThemePage from "./pages/SingleThemePage";
import MyProfilePage from "./pages/MyProfilePage";
import FavoritesPage from "./pages/FavoritesPage";

import axios from "axios";

function App() {
    const [myComments,setMyComments]=useState([])
    const [myThemes,setMyThemes]=useState([])
    const [themeArr,setThemeArr]=useState([])
    const [userOnline, setUserOnline] = useState(null)
    const [photoChanged, setPhotoChanged] = useState(null)
    const [getComments,setComments]=useState([])
    const [favorites,setStateFavorites]=useState([])
    const [getProfilePhoto, setProfilePhoto] =useState
    ("https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png")

    const getLocalStorageFavorites = () => {
        const favoritesString = localStorage.getItem('favorites');
        const favorites = JSON.parse(favoritesString);

        return favorites ? { offline: [], ...favorites } : {offline:[]}
    }

    const setLocalStorageFavorites = (favorites) => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    const getUserFavorites = () => {
        const localFavorites = getLocalStorageFavorites();

        return userOnline ? localFavorites[userOnline] :  localFavorites.offline;
    }

    const setFavorites = (favorites) => {
        favorites = favorites ? favorites : [];
        setStateFavorites(favorites);

        let localFavorites = getLocalStorageFavorites();
        if (userOnline) {
            localFavorites[userOnline] = favorites;
        } else {
            localFavorites.offline = favorites;
        }

        localStorage.setItem('favorites', JSON.stringify(localFavorites));
    }


    useEffect(()=>{
        setFavorites(getUserFavorites())
    },[userOnline])

    useEffect(()=>{
        const info = {
            user:userOnline
        }
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(info)
        }
        fetch("http://localhost:4000/loadThemes", options)
            .then(res => res.json())
            .then(data => {
                setThemeArr(data.themes)
            })
    },[userOnline],)

    return (
        <div className="App">
            <MainContext.Provider value={{
                myComments,setMyComments,
                myThemes,setMyThemes,
                favorites,setFavorites,
                photoChanged, setPhotoChanged,
                themeArr,
                setThemeArr,
                userOnline,
                getComments,
                setComments,
                getProfilePhoto,
                setProfilePhoto}}>
                <BrowserRouter>
                    <div className="body">
                        <Toolbar userOnline={userOnline} setUserOnline={setUserOnline}/>
                        <Routes>
                            <Route path="/" element={<HomePage/>}/>
                            <Route path="/register" element={<RegisterPage/>}/>
                            <Route path="/login" element={<LoginPage setUserOnline={setUserOnline} setProfilePhoto={setProfilePhoto}/>}/>
                            <Route path="/main" element={<MainPage/>}/>
                            <Route path="/myProfilePage" element={<MyProfilePage/>}/>
                            <Route path="/favorites" element={<FavoritesPage/>}/>
                            <Route path="/singleTheme/:theme" element={<SingleThemePage/>}/>
                        </Routes>
                    </div>

                </BrowserRouter>
            </MainContext.Provider>
        </div>
    );
}

export default App;
