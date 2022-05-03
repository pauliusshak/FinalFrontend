import React, {useState, useRef, useContext, useEffect} from 'react';
import MainContext from "../mainContext/MainContext";
import OneTheme from "../components/OneTheme";
import Search from "../components/Search";
import http from "../plugins/http";
import Pagination from "../components/pagination/Pagination";
import {useParams} from "react-router-dom";

const MainPage = () => {
    const {themeArr, setThemeArr, userOnline} = useContext(MainContext)
    const [getNewTheme, setNewTheme] = useState(false)
    const [getMsg, setMsg] = useState(null)
    const themeRef = useRef()
    const categoryRef = useRef()
    const {theme} = useParams()
    const [activePage, setActivePage] = useState(1)
    const [totalPages, setTotalPages] = useState(null)
    const [itemsInPage, setItemsInPage] = useState(4)

    useEffect(() => {
        openPage(activePage)
    }, [themeArr])

    useEffect(() => {
        openPage(activePage)
    }, [activePage])

    useEffect(() => {
        setActivePage(1)
        openPage(1)
    }, [itemsInPage])

    const openPage = (activePage) => {
        const sendData = {
            page: activePage,
            category: theme,
            itemsInPage: itemsInPage,
        }
        http.post('/getCategoryProducts', sendData).then(res => {
            if (res.success) {
                setThemeArr(res.pagedPosts)
                setTotalPages(res.totalPages);
            }
        })
    }
    function createTheme() {

        const newTheme = {
            theme: themeRef.current.value,
            category: categoryRef.current.value,
            creator: userOnline,
        }
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newTheme)
        }
        fetch("http://localhost:4000/createTheme", options)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setMsg(data.error)
                } else {
                    setThemeArr([...themeArr, data.newTheme])
                    setMsg(null)
                }

            })
    }

    return (
        <div className="container column">
            <div className="d-flex column">
                <Search/>
                <div className="createCard">
                    {userOnline && <button style={{fontWeight: "bold"}} className="specBtn"
                                           onClick={() => setNewTheme(!getNewTheme)}>Create new theme +</button>}
                    {getNewTheme &&
                    <div className="createBox">
                        <input ref={themeRef} type="text" placeholder="Theme title"/>
                        <input ref={categoryRef} type="text" placeholder="Category"/>
                        <button onClick={createTheme}>Create</button>
                        <h3 style={{color: "#00ff8c"}}>{getMsg}</h3>
                    </div>}
                </div>
                <div className="d-flex column centera centerj">
                    <div className="topTable">
                        <span>Topic</span>

                        <span>Category</span>
                    </div>
                </div>


                {themeArr.length > 0 ? themeArr && themeArr.map((x, i) =>
                    <div key={i}>
                        <OneTheme theme={x} i={i}/>
                    </div>)
                    :
                    <div className="centertext">
                        <h1>
                            Forum is empty.
                        </h1>
                    </div>}

            </div>
            <div className="d-flex">
                {(themeArr.length>0) &&
                <Pagination activePage={activePage} setActivePage={setActivePage} totalPages={totalPages} setItemsInPage={setItemsInPage}/>
                }
            </div>


        </div>
    );
};

export default MainPage;