import React from 'react'

function Loginheader(props) {
    function switchfunction(e){
        e.preventDefault();
        if(e.target.className==="login-heading"){
         props.setIsRegistered(true);
        }else if(e.target.className==="register-button"){
           props.setIsRegistered(false);
        }
       }
  return (
    <>
        <div style={{marginTop:"6%",marginBottom:"2%"}}>
     <button className='login-heading' onClick={switchfunction} style={{fontSize:"3.2rem",color:"#1DA1F2"}} type='button'>Login</button>
     <span style={{fontSize:"2rem",marginRight:"3%"}}>/</span>
     <button className='register-button' style={{color:"gray",border:"1px solid white"}} onClick={switchfunction} type='button'>Register</button>
     <div id="form-icon"></div>
     </div>
    </>
  )
}

export default Loginheader