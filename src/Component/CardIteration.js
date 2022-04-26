
import React , {useState, useEffect} from 'react'
import Card from './Card';
import profile from "./profile.jpg"
import InfiniteScroll from 'react-infinite-scroll-component';
import { ImCross } from "react-icons/im"
import $ from 'jquery';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


export default function CardIteration(props) {
    const [id, setId] = useState("");
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [emailId, setEmailId] = useState('');
    const [designation, setDesignation] = useState('');

    const [idA, setIdA] = useState("");
    const [nameA, setNameA] = useState('');
    const [cityA, setCityA] = useState('');
    const [mobileNumberA, setMobileNumberA] = useState('');
    const [passwordA, setPasswordA] = useState('');
    const [emailIdA, setEmailIdA] = useState('');
    const [designationA, setDesignationA] = useState('');

    const[colWidth, setColWidth] = useState(4);
      
    const [result, setResult] = useState([]);
    const [totalResult, setTotalResult] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);

    const [studentObject, setStudentObject] = useState({});

    const [profileImage, setProfileImage] = useState();

    const gettingData = async() =>{
        console.log("We are inside the getting Data");
        
        const BOOKS_REST_API = "http://localhost:8080/receive";
        const response = await  fetch(BOOKS_REST_API);
        const ResponseData = await response.json();

        console.log(ResponseData);
        setResult(ResponseData.restStudentList);
     
    }

    const gettingSingleData = async () =>{
        if(props.searchDataKeyValuePassing === 0){

        }else{

        setStudentObject({});
        const BOOKS_REST_API = `http://localhost:8080/receive/${props.searchDataKeyValuePassing}`;
        const response = await  fetch(BOOKS_REST_API);
        const ResponseData = await response.json();
        console.log(ResponseData);
        setStudentObject(ResponseData);

        setId(ResponseData.id)
        setName(ResponseData.name);
        setMobileNumber(ResponseData.mobileNumber);
        setEmailId(ResponseData.emailId);
        setCity(ResponseData.city);
        setDesignation(ResponseData.designation);

        }
        
    }

    const fetchMoreData = async() =>{
        console.log("last element has displayed");
        setPageNumber(pageNumber + 1)
    
         const BOOKS_REST_API = `http://localhost:8080/receive/pageNumber=${pageNumber+1}`;
         const response = await  fetch(BOOKS_REST_API);
         const ResponseData = await response.json();
    
         setResult((preResult)=>{
               return [...preResult, ...ResponseData.restStudentList]
         })
             
         console.log(ResponseData);
    
    }

   
    useEffect(()=>{
        gettingData();
        gettingSingleData();

        console.log("the new value is " + props.navbarValue);
        if(props.navbarValue === "clicked" && props.searchValue === "clicked"){
            console.log("navbar and search are clicked");
            $("#gray").css("visibility", "visible");
            $("#yellowgreen").css("visibility", "visible");
            $("#red").css("width", "50%");
            $("#red").css("marginRight", "25%");
            setColWidth(6)
            setPageNumber(1);   
        }

        if(props.navbarValue === "clicked" && props.searchValue === ""){
            console.log("navbar is only clicked");
            $("#gray").css("visibility", "visible");
            $("#red").css("width", "75%");
            $("#red").css("marginLeft", "25%");
            setColWidth(4)
            setPageNumber(1);   
        }

        if(props.navbarValue === "" && props.searchValue === "clicked"){
            console.log("only search value is clicked");
            $("#yellowgreen").css("visibility", "visible");
            $("#red").css("width", "75%");
            $("#red").css("marginRight", "25%");
            setColWidth(4)
            setPageNumber(1);   
        }

       /*  return () =>{
            window.removeEventListener("load", function(){
                $("#displayImage").attr("src",this.result);
      
            });
        } */
    
    }, [colWidth, props.navbarValue, props.searchValue, props.searchDataKeyValuePassing]);


   const crossLeft = () =>{
       if(props.navbarValue === "clicked" && props.searchValue === "clicked"){
        $("#gray").css("visibility", "hidden");
        $("#red").css("width", "75%");
        $("#red").css("marginRight", "25%");
        setColWidth(4)
        setPageNumber(1);
        props.parent();
       }

       if(props.navbarValue === "clicked" && props.searchValue === ""){
        $("#gray").css("visibility", "hidden"); 
        $("#red").css("width", "100%");
        $("#red").css("marginRight", "0%");
        setColWidth(4)
        setPageNumber(1);
        props.parent();
       }

   }

   const crossRight = () =>{

       if(props.navbarValue === "clicked" && props.searchValue === "clicked"){
        $("#yellowgreen").css("visibility", "hidden");
        $("#red").css("width", "75%");
        $("#red").css("marginRight", "0%");
        setColWidth(4)
        setPageNumber(1);
        props.searchDetailsParent();
       }

       if(props.navbarValue === "" && props.searchValue === "clicked"){
        $("#yellowgreen").css("visibility", "hidden"); 
        $("#red").css("width", "100%");
        $("#red").css("marginRight", "0%");
        setColWidth(4)
        setPageNumber(1);
        props.searchDetailsParent();
       }
      
   }

   const showUpdateScreen = () =>{
    $("#orange").css("visibility", "visible");
    $("#yellowgreen").css("visibility", "hidden");
    props.disableFunction();  

     
   }

   const closeUpdateScreen = () =>{
    $("#orange").css("visibility", "hidden");
    $("#yellowgreen").css("visibility", "visible");
    props.enableFunction();
    $("#displayImage").attr("src","");
    document.querySelector('#imageFile').value = "";
    setProfileImage("");

  }

  const AddContact = async (e) =>{
      e.preventDefault();
      let AddingStudentObject = {nameA,cityA,mobileNumberA,passwordA,emailIdA,designationA};
      console.log(AddingStudentObject);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(AddingStudentObject)
    };

     let response =  await fetch(`http://localhost:8080/create`, requestOptions);

     $("#addContactStatus").css("visibility", "visible");

     setTimeout(() => {
        $("#addContactStatus").css("visibility", "hidden");
     }, 2000);

     gettingData();
     setPageNumber(1);
     document.querySelector("#myForm").reset();

     setCityA("");
     setMobileNumberA("");
     setPasswordA("");
     setEmailIdA("");
     setDesignationA("");
     
  }

  const deleteContact = async () =>{
    const requestOptions = {
        method: 'DELETE',
    };

     let response =  await fetch(`http://localhost:8080/delete/${studentObject.id}`, requestOptions);
     crossRight();
     gettingData();
     setPageNumber(1); 
  }

  const deleteContactAlert = () =>{

    confirmAlert({
        title: `Confirm Delete. `,
        message: `Are you sure to  Delete the contact of ${studentObject.name}?`,
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
                  deleteContact();
            }
          },
          {
            label: 'No',
            onClick: () => {
                
            }
          }
        ]
      });
    
  }

  const updateResult = async(e) =>{
    

    $("#updateStatus").css("visibility", "visible");

    setTimeout(() => {
        gettingData();
        gettingSingleData();
        $("#updateStatus").css("visibility", "hidden");
    }, 5000);


    setPageNumber(1);
  }
    
  const setImageForProfile = (e) =>  {
      if(profileImage=== null){
          setProfileImage("Akshay Dharpale");

      }else{
        const file = e.target.files[0];
        setProfileImage(file);
        console.log(file);
    
        if(file){
          const reader = new FileReader();
    
          reader.addEventListener("load", function(){
              $("#displayImage").attr("src",this.result);
    
          });
          reader.readAsDataURL(file);
      }

      }
    
    

  }


  const updateForm = async (e) =>{
    e.preventDefault();
    let UpadetStudentObject = {id,name,city,mobileNumber,password,emailId,designation}

    const fd = new FormData();
    fd.append("profileImage", profileImage );

    fd.append('studentObject', new Blob([JSON.stringify(UpadetStudentObject)], {
        type: "application/json"
    }));
    
     const requestOptions = {
        method: 'PUT',
        body:fd
    }; 

    console.log(UpadetStudentObject);
    console.log(name);

    let response =  await fetch(`http://localhost:8080/update/${id}`, requestOptions);
    console.log(response);
     
    updateResult();
    
     
  }



 
  
  return (
      <>
      <div id='gray'  style={{width:"25%", height:"100%", backgroundColor:"whitesmoke", position:"fixed",marginLeft: "0%",visibility:"hidden"}}>
      <ImCross  onClick={crossLeft} style={{marginTop:"1.9cm", marginLeft:"8cm"}}/> 

      <div id="addContactStatus" style={{marginLeft:"20mm", color:"black", visibility:"hidden"}}>
              <h6 >!!..Contact Added successfully..!!</h6>
          </div>

      <form id='myForm' onSubmit={AddContact} style={{ marginTop:"3mm"}}>
        <div className="mb-2">
            <label style={{ marginLeft:"2mm"}} htmlFor="name" className="form-label"><strong>Name: </strong></label>
            <input required style={{width:"8cm", marginLeft:"2mm"}} onChange={(e)=>{setNameA(e.target.value)}}  type="text" className="form-control" id="name" />
        </div>
        <div className="mb-3">
            <label style={{ marginLeft:"2mm"}} htmlFor="mobileNumber" className="form-label"><strong>Mobile Number: </strong></label>
            <input required style={{width:"8cm", marginLeft:"2mm"}} onChange={(e)=>{setMobileNumberA(e.target.value)}}  type="text" className="form-control" id="mobileNumbber" />
        </div>
        <div className="mb-3">
            <label style={{ marginLeft:"2mm"}} htmlFor="emailID" className="form-label"><strong>Email Address: </strong></label>
            <input style={{width:"8cm", marginLeft:"2mm"}} onChange={(e)=>{setEmailIdA(e.target.value)}}  type="email" className="form-control" id="emailID" />
        </div>
        <div className="mb-3">
            <label style={{ marginLeft:"2mm"}} htmlFor="city" className="form-label"><strong>City: </strong></label>
            <input style={{width:"8cm", marginLeft:"2mm"}} onChange={(e)=>{setCityA(e.target.value)}}  type="text" className="form-control" id="city" />
        </div>
        <div className="mb-3">
            <label style={{ marginLeft:"2mm"}} htmlFor="designation" className="form-label"><strong>Designation: </strong></label>
            <input style={{width:"8cm", marginLeft:"2mm"}} onChange={(e)=>{setDesignationA(e.target.value)}}  type="text" className="form-control" id="designation" />
        </div>
        
        <button   style={{ marginLeft:"2mm"}} type="submit" className="btn btn-primary">Add Contact</button>

      </form>      
     
      </div>

      <div id='red' style={{width:"100%", height:"100%", backgroundColor:" #5fd3a6",  float:"right"}}>
        <div className='container' style={{ marginTop: "2.2cm"}}>
           {/*  <h1 className='text-center'>CONTACT LIST</h1> */}

            <InfiniteScroll
                dataLength={result.length}
                next={fetchMoreData}
                hasMore={result.length !== totalResult}
                loader={<h6>Loading...</h6>}
            >
                    <div className='row '>
                    {result.map((element)=>{
                        return <div className={`col-md-${colWidth} my-3`} key={element.mobileNumber}>
                            <Card name={element.name} mobileNumber={element.mobileNumber} emailID={element.emailId}
                            imageUrl={element.imageName} designation={element.designation} city={element.city} id={element.id}/>
                            

                        </div>
                    })}

                    </div>
            </InfiniteScroll>

        </div>      
        
      </div>


      <div id='yellowgreen' style={{width:"25%", height:"100%", backgroundColor:"whitesmoke", position:"fixed",marginLeft: "75%", visibility:"hidden" }}>
       <ImCross onClick={crossRight} style={{marginTop:"1.9cm", marginLeft:"8cm"}}/> 
       <div style={{marginTop:"7mm"}} className='container'>
           <h3 style={{color:"black"}}><strong>{studentObject.name}</strong></h3>
           <h5 style={{marginTop:"6mm"}}><strong>Mobile Number:</strong></h5>
           <h5>{studentObject.mobileNumber}</h5>
           <h5 style={{marginTop:"6mm"}}><strong>Email Id:</strong></h5>
           <h5 style={{color:"blue"}}>{studentObject.emailId}</h5>
           <h5 style={{marginTop:"6mm"}}><strong>City:</strong></h5>
           <h5>{studentObject.city}</h5>
           <h5 style={{marginTop:"6mm"}}><strong>Designation:</strong></h5>
           <h5>{studentObject.designation}</h5> 

           <button onClick={showUpdateScreen} style={{ marginLeft:"2mm", marginTop:"8mm"}} type="button" className="btn btn-primary">Update</button>
           <button onClick={deleteContactAlert} style={{ marginLeft:"5mm", marginTop:"8mm"}} type="button" className="btn btn-danger">Delete</button>
          
        </div> 

      </div>

      <div id="orange" style={{width:"25%", height:"100%", backgroundColor:"whitesmoke", position:"fixed",marginLeft: "75%", visibility:"hidden"}} >
      
      <div style={{marginTop:"18mm"}}>
          <div id="updateStatus" style={{marginLeft:"20mm", color:"green", visibility:"hidden"}}>
              <h6 >!!..Updated successfully..!!</h6>
          </div>
          
      <form onSubmit={updateForm} style={{ marginTop:"1mm"}}  >
        <div className="mb-2">
            <label style={{ marginLeft:"2mm"}} htmlFor="name" className="form-label"><strong>Name: </strong></label>
            <input style={{width:"8cm", marginLeft:"2mm"}} onChange={(e)=>{setName(e.target.value)}} value={name}  type="text" className="form-control" id="name" />
        </div>
        <div className="mb-2">
            <label style={{ marginLeft:"2mm"}} htmlFor="mobileNumber" className="form-label"><strong>Mobile Number: </strong></label>
            <input style={{width:"8cm", marginLeft:"2mm"}} onChange={(e)=>{setMobileNumber(e.target.value)}} value={mobileNumber} type="text" className="form-control" id="mobileNumbber" />
        </div>
        <div className="mb-2">
            <label style={{ marginLeft:"2mm"}} htmlFor="emailID" className="form-label"><strong>Email Address: </strong></label>
            <input style={{width:"8cm", marginLeft:"2mm"}} onChange={(e)=>{setEmailId(e.target.value)}} value={emailId} type="email" className="form-control" id="emailID" />
        </div>
        <div className="mb-2">
            <label style={{ marginLeft:"2mm"}} htmlFor="city" className="form-label"><strong>City: </strong></label>
            <input style={{width:"8cm", marginLeft:"2mm"}} onChange={(e)=>{setCity(e.target.value)}} value={city} type="text" className="form-control" id="city" />
        </div>
        <div className="mb-2">
            <label style={{ marginLeft:"2mm"}} htmlFor="designation" className="form-label"><strong>Designation: </strong></label>
            <input style={{width:"8cm", marginLeft:"2mm"}} onChange={(e)=>{setDesignation(e.target.value)}} value={designation} type="text" className="form-control" id="designation" />
        </div>
        <div className="mb-2">
            <input id='imageFile' className="mt-1" name="profileImage" onChange={setImageForProfile} style={{marginLeft:"2mm"}} type="file" inputprops={{ accept: 'image/*' }} />
            <img className="mt-2" id='displayImage' src="" alt="Image preview" style={{width:"20mm", height:"20mm", marginLeft:"2mm"}} />
        </div>
        
        <button  /* onClick={updateResult}  */style={{ marginLeft:"2mm"}} type="submit" className="btn btn-success">Save</button>
        <button  onClick={closeUpdateScreen} style={{ marginLeft:"5mm"}} type="button" className="btn btn-primary">close</button>

      </form> 

      </div>

    <div id="yellow" style={{width:"25%", height:"100%", backgroundColor:"yellow", position:"fixed",marginLeft: "75%", visibility:"hidden"}} >
        
    </div>

      </div> 

      </>
    
  )
}
