import React, {useRef, useState} from 'react';
import Filtered from "./Filtered";

const Search = () => {
    const topicRef = useRef()
    const categoryRef = useRef()
    const creatorRef = useRef()
    const [filtered, setFiltered] = useState([])

    function searchTopic() {
        const info = {
            topic: topicRef.current.value,
        }
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(info)
        }
        fetch("http://localhost:4000/searchTopic", options)
            .then(res => res.json())
            .then(data => {
                setFiltered(data.searchTopic)
            })
    }
    function searchCategory() {
        const info = {
            category: categoryRef.current.value,
        }
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(info)
        }
        fetch("http://localhost:4000/searchCategory", options)
            .then(res => res.json())
            .then(data => {
                setFiltered(data.searchTopic)
            })
    }
    function searchByCreator() {
        const info = {
            creator: creatorRef.current.value,
        }
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(info)
        }
        fetch("http://localhost:4000/searchByCreator", options)
            .then(res => res.json())
            .then(data => {
                setFiltered(data.searchTopic)
            })
    }


    return (
        <div className="d-flex column centera">

            <div className="d-flex centerj centera border filterMin">

                    <div className="d-flex centerj centera">
                        <input onChange={()=>searchTopic()} ref={topicRef} type="text" placeholder="Filter by topic.."/>
                    </div>
                    <div className="d-flex centerj centera">
                        <input onChange={()=>searchCategory()} ref={categoryRef} type="text" placeholder=" Filter by category.."/>
                    </div>
                <div className="d-flex centerj centera">
                    <input onChange={()=>searchByCreator()} ref={creatorRef} type="text" placeholder=" Filter by creator.."/>
                </div>
            </div>




            <div className="allFiltered">
                {filtered.map((x, i) => <Filtered key={i} x={x}/>)}
            </div>
        </div>
    );
};

export default Search;