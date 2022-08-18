import React, { useState } from 'react'
import "./login.css"
import LoginComp from './LoginComp/LoginComp';
import arr from './loginsObj';
import Loginheader from './LoginComp/Loginheader';
import Registerheader from './LoginComp/Registerheader';

function Login() {

      let [userData, setUserData]=useState({
        username:"",
        firstname:"",
        lastname:"",
        email:"",
        contact:"",
        password:"",
        confirmpassword:""
    });

    let [isRegistered, setIsRegistered]=useState(true);
    
    const defaulterror=[false,false,false,false,false,false,false];
    let [errorsArr,setErrors]=useState(defaulterror);
    function addData(e){
      let{name,value}=e.target;
      if( Object.keys(userData).some((val)=>name===val) ){ 
        setUserData({...userData,[name]:value})
      }
  
    }

    function inputsBorderReverse(elename,boolean){
      let name=document.getElementsByName(elename);
      if(boolean){
        name[0].style.border="2px solid red";
        name[0].focus();
      }else{
        name[0].style.border="2px solid transparent"
      }
    }

    function verifyUserData(){
      
      let confirm=[true,true,true,true,true,true,true];
    
      if(!userData.confirmpassword){
        inputsBorderReverse("confirmpassword",true);
        confirm[6]=false;
        setErrors((prevErrors)=>{let prev=[...prevErrors]; prev[6]=true; return prev;});
      }else if(userData.confirmpassword!==userData.password){
        inputsBorderReverse("confirmpassword",true);
        confirm[6]=false;
        setErrors((prevErrors)=>{let prev=[...prevErrors]; prev[6]=true; return prev;});
      }else if(userData.confirmpassword===userData.password){
        inputsBorderReverse("confirmpassword",false);
        confirm[6]=true;
        setErrors((prevErrors)=>{let prev=[...prevErrors]; prev[6]=false; return prev;});
      } 

      if(!userData.password){
        inputsBorderReverse("password",true);
        confirm[5]=false;
        setErrors((prevErrors)=>{let prev=[...prevErrors]; prev[5]=true; return prev;});
      }else if(userData.password){
        inputsBorderReverse("password",false);
        confirm[5]=true;
        setErrors((prevErrors)=>{let prev=[...prevErrors]; prev[5]=false; return prev;});
      }

      if(!/^\d{10}$/.test(userData.contact)){
        inputsBorderReverse("contact",true);
        confirm[4]=false;
        setErrors((prevErrors)=>{let prev=[...prevErrors]; prev[4]=true; return prev;});
      }else if(/^\d{10}$/.test(userData.contact)){
        inputsBorderReverse("contact",false);
        confirm[4]=true;
        setErrors((prevErrors)=>{let prev=[...prevErrors]; prev[4]=false; return prev;});
      }

      if(!userData.email.match(/(@\w+\d*.\w+\d*)/)){
        inputsBorderReverse("email",true);
        confirm[3]=false;
        setErrors((prevErrors)=>{let prev=[...prevErrors]; prev[3]=true; return prev;});
      }else if(userData.email.match(/(@\w+\d*.\w+\d*)/)){
        confirm[3]=true;
        inputsBorderReverse("email",false);
        setErrors((prevErrors)=>{let prev=[...prevErrors]; prev[3]=false; return prev;});
      }

      if(!userData.lastname){
        inputsBorderReverse("lastname",true);
        confirm[2]=false;
        setErrors((prevErrors)=>{let prev=[...prevErrors]; prev[2]=true; return prev;});
      }else if(userData.lastname){
        inputsBorderReverse("lastname",false);
        confirm[2]=true;
        setErrors((prevErrors)=>{let prev=[...prevErrors]; prev[2]=false; return prev;});
      }

      if(!userData.firstname){
        confirm[1]=false;
        inputsBorderReverse("firstname",true);
        setErrors((prevErrors)=>{let prev=[...prevErrors]; prev[1]=true; return prev;});
      }else if(userData.firstname){
        inputsBorderReverse("firstname",false);
        confirm[1]=true;
        setErrors((prevErrors)=>{let prev=[...prevErrors]; prev[1]=false; return prev;});
      }

      if(!userData.username){
       confirm[0]=false;
       inputsBorderReverse("username",true);
      setErrors((prevErrors)=>{let prev=[...prevErrors]; prev[0]=true; return prev;});
      }else if(userData.username){
        confirm[0]=true;
        inputsBorderReverse("username",false);
        setErrors((prevErrors)=>{let prev=[...prevErrors]; prev[0]=false; return prev;});
      }
 
      let form=document.getElementById('main-login');

      if(confirm.every(val=>val)){
        form.style.border="2px solid green";
        postUserData();
      }else{
        form.style.border="2px solid red";
      }
      
      userData['password']="";
      userData['confirmpassword']="";

        }


    function postUserData(){
        console.log("Data posted successfully");
     }

     function verifyUser(){
      let form=document.getElementById('main-login');
    
      if(userData.username && userData.password){
        form.style.border="2px solid green";
        getUserData();
      }else{
        form.style.border="2px solid red";
        if(!userData.password){
          inputsBorderReverse("password",true);
          setErrors((prevErrors)=>{let prev=[...prevErrors]; prev[5]=true; return prev;});
        }else if(userData.password){
          inputsBorderReverse("password",false);
          setErrors((prevErrors)=>{let prev=[...prevErrors]; prev[5]=false; return prev;});
        }
        
        if(!userData.username){   
          inputsBorderReverse("username",true);
         setErrors((prevErrors)=>{let prev=[...prevErrors]; prev[0]=true; return prev;});
         }else if(userData.username){
          inputsBorderReverse("username",false);
           setErrors((prevErrors)=>{let prev=[...prevErrors]; prev[0]=false; return prev;});
         }
      }
      

     }

    function getUserData(){
      console.log("Data get request->"+JSON.stringify({username:userData.username,password:userData.password}));
    }


  return (
    <>
  <div id='icon-top'></div>
    
    {isRegistered &&<div id='main-login'>
     <Loginheader setIsRegistered={setIsRegistered} />
      <LoginComp heading="Username" addData={addData} id={0} error="Please enter your username!" displayerrors={errorsArr} inpName="username" value={userData['username']} inpType="text" inpPlaceholder="Enter your username" /> 
      <LoginComp heading="Password" addData={addData} id={5} error="Please enter your password!" displayerrors={errorsArr} inpName="password" inpType="password" value={userData['password']} inpPlaceholder="Enter your password" /> 
      <button className='submit-button' onClick={verifyUser} type='button'>Login</button>
    </div>}

    {!isRegistered &&<div id='main-login'>
     <Registerheader setIsRegistered={setIsRegistered} />
      {userData && arr.map((obj)=><LoginComp id={obj.id} key={obj.id} heading={obj.heading} addData={addData} value={userData[obj.inpName]} inpName={obj.inpName} inpType={obj.inpType} inpPlaceholder={obj.inpPlaceholder} error={obj.error} displayerrors={errorsArr} />) }
      <button className='submit-button' onClick={verifyUserData} type='button'>Register</button>
    </div>}
    </>
  )
}

export default Login;