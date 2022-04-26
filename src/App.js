import logo from './logo.svg';
import './App.css';
import Navbar from './Component/Navbar';
import CardIteration from './Component/CardIteration';
import { useState } from 'react';
import About from './Component/About';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {
   const [cardIterationValue, setCardIterationValue] = useState("")
   const [searchDetailsValue, setsearchDetailsValue] = useState("")
   const [searchDataKeyValue, setSearchDataKeyValue] = useState(0);
   const [searchBarAttribute, setSearchBarAttribute] = useState("enable");

   const cardIterationFunction = () =>{
     setCardIterationValue("clicked");
   }

   const cardIterationFunction2 = () =>{
    setCardIterationValue("");
   }

   const SearchDetailsFunction1 = () =>{
     setsearchDetailsValue("clicked");
   }

   const SearchDetailsFunction2 = () =>{
    setsearchDetailsValue("");
  }

  const searchDataKey = (key) =>{
     setSearchDataKeyValue(key);
  } 

  const disablefunctionRun = () =>{
    console.log("DISABLE");
   setSearchBarAttribute("disable");
   console.log(searchBarAttribute);

  }

  const unableFunctionRun = () =>{
   console.log("UNABLE");
   setSearchBarAttribute("enable");
   console.log(searchBarAttribute);

   }

   useState(()=>{

   }, [cardIterationValue, searchBarAttribute])

  return (
    <>
    {/* <Navbar searchAttributeValue={searchBarAttribute} keyData={searchDataKey} appEvent={SearchDetailsFunction1} toggleMode={cardIterationFunction}/>
    <CardIteration disableFunction={disablefunctionRun} enableFunction={unableFunctionRun}  searchDataKeyValuePassing={searchDataKeyValue} searchValue={searchDetailsValue} searchDetailsParent={SearchDetailsFunction2} parent={cardIterationFunction2} navbarValue= {cardIterationValue}/>
 */}
    <Router>
   
   
   <Navbar searchAttributeValue={searchBarAttribute} keyData={searchDataKey} appEvent={SearchDetailsFunction1} toggleMode={cardIterationFunction}/>
     
         <Routes>

             <Route exact path="/" element={<CardIteration disableFunction={disablefunctionRun} enableFunction={unableFunctionRun}  searchDataKeyValuePassing={searchDataKeyValue} searchValue={searchDetailsValue} searchDetailsParent={SearchDetailsFunction2} parent={cardIterationFunction2} navbarValue= {cardIterationValue}/>}/>
             <Route exact path="/about" element={<About style={{backgroundColor:"blue"}}/>}/>

         </Routes>
     

</Router>
    </>
  );
}

export default App;
