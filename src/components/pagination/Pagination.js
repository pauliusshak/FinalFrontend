import React, {useState} from 'react';
import {Container} from "react-bootstrap";
import './style.css';

const Pagination = ({activePage, setActivePage, totalPages, setItemsInPage}) => {

    const pages = new Array(totalPages).fill('');

    const changePage = (direction) => {
        if (direction==='previous' && activePage>1) {
            setActivePage(activePage - 1)
        }
        if (direction==='next' && activePage<totalPages){
            setActivePage(activePage+1)
        }
    }

    return (
        <Container fluid={'sm'} className='mt-3'>
            <div style={{width:"200px",marginTop:"30px"}} className={'d-flex gap-5 justify-content-between align-items-center clmn'}>
                <div style={{width:'100px'}}/>
                <div className={'d-flex centera centerj'}>
                    {activePage!==1 &&
                    <button className={'arrow'} onClick={()=>{changePage('previous')}} >&#129080;</button>
                    }

                    {pages.map((p,i)=>
                        <button style={{fontWeight:"bold"}}
                            className={(i+1)===activePage? 'centera centerj d-flex justify-content-center page-number active': 'centera centerj page-number justify-content-center'}
                            key={i*2}
                            onClick={()=>{setActivePage(i+1)}}
                        >{i+1}</button>
                    )}
                    {activePage!==totalPages &&
                    <button className={'arrow'} onClick={()=>{changePage('next')}}>&#129082;</button>
                    }

                </div>
                <div style={{marginLeft:"20px"}} className={'d-flex centera centerj'}>
                    <h5>Show </h5>
                    <select onChange={(e)=>setItemsInPage(e.target.value)}>
                        <option value={4} key={4} >4</option>
                        <option value={8} key={8} >8</option>
                        <option value={12} key={12} >12</option>
                        <option value={16} key={16} >16</option>
                        <option value={20} key={20} >20</option>
                    </select>
                </div>
            </div>
        </Container>
    );
};

export default Pagination;