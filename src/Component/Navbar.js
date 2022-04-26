import React, {useState, useEffect} from 'react'
import { FaIdCard } from "react-icons/fa";
import SearchDetails from './SearchDetails';
import $ from 'jquery';
import { Link } from 'react-router-dom';

 

export default function Navbar(props) {
  

    const [keyword, setKeyword] = useState("");
    const [searchData, setSearchData] = useState([]);

    const searchResult= async(event) =>{
        setKeyword(event.target.value);
    }

    useEffect( async () =>{

      setSearchData([]);

      console.log(keyword);
      const BOOKS_REST_API = `http://localhost:8080/searchRelative/${keyword}`;
        const response = await  fetch(BOOKS_REST_API, {mode:'cors'});
        const ResponseData = await response.json();
        console.log(ResponseData);

        setSearchData(ResponseData);

    }, [keyword])

    const appEventFunction = () =>{
      props.appEvent()
    }

    const keywordValue = (keyword) =>{
      setKeyword(""); 
      props.keyData(keyword);
    }


  return (
    <>
    <nav className="navbar fixed-top navbar-expand-lg navbar-light" style={{backgroundColor:"rgb(23 58 116)"}}>
    <div className="container-fluid">
     {/*  <a className="navbar-brand" href="#"><FaIdCard  width="3em" height="3em" className="d-inline-block align-text-top"/></a> */}
      <h1 style={{fontSize: "0.7cm" , color:"white"}} className="navbar-brand" ><strong>FRIENDS-FOREVER</strong> </h1>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link style={{color:"aqua"}}  class="nav-link" to="/"><strong>HOME</strong></Link>
            </li> 
             
            <li className="nav-item">
              <Link style={{color:"aqua"}} class="nav-link" to="/about"><strong>ABOUT</strong></Link>
            </li> 

            <li className="nav-item">
              {/* <button onClick={props.toggleMode}>AddContact</button> */}
              <Link style={{color:"aqua"}} onClick={props.toggleMode} class="nav-link" to="/"><strong>ADD-FRIENDS</strong></Link>
            </li> 
        </ul>
      </div>
      <div className="d-flex">
        <input id='input' disabled={props.searchAttributeValue === "disable"}  onChange={searchResult} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
      </div>
   </div>
        
  </nav>
  <SearchDetails  searchKeyword={keywordValue}  navbarEvent={appEventFunction} searchDeatails={searchData}/>
  </>

  )
}
