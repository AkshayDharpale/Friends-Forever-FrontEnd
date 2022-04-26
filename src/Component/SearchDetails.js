import React from 'react'

export default function SearchDetails(props) {
  const searchKeywordFunction = (element) =>{
    props.navbarEvent();
    
    let a = element.target;
    let b = a.getAttribute("datakey");
    console.log(b); 

    props.searchKeyword(b);
  }

  return (
    
    <>
    <div  style={{marginLeft:"83.5%", position:"fixed", zIndex:"1", marginTop: "1.77cm"}}>
         <ul className="list-group " >  
         {props.searchDeatails && props.searchDeatails.map((element=>{
           
             return  <li key={element.id} datakey={element.id} onClick={searchKeywordFunction}  className="list-group-item ">{element.name}</li>

        }))}
                    
        </ul>
             
    </div>
    </>
  
  )
}
