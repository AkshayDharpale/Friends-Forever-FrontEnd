import React from 'react'

export default function Card(props) {




  return (
    <div>
        <div className="card" style={{width: "18rem" , position:"relative"}}>
            <img src={props.imageUrl && require(`../ProfileImages/${props.imageUrl}`)} className="card-img-top" style={{height:"7cm"}} />
            <div className="card-body">
                <h5 className="card-title"><strong>{props.name}</strong></h5>
                <p className="card-text">{props.mobileNumber}</p> 
                <strong>EmailID:</strong>
                <p className="card-text ">{props.emailID}</p>
                <p className="card-text"><strong>Designation:</strong> {props.designation}</p>
                <p className="card-text"><strong>City:</strong> {props.city}</p>

            </div>
        </div>
      
    </div>
  )
}
