
import React from 'react'

function LoginComp(props) {
console.log(props.displayerrors)
console.log(props.id);
  return (
    <>
        <span className="name-heading">{props.heading}</span>
        <input onChange={props.addData} value={props.value} className="login-input" name={props.inpName} type={props.inpType} placeholder={props.inpPlaceholder} />
       { props.displayerrors && props.displayerrors[Number(props.id)] && <aside><div>{props.error}</div></aside>}

    </>
  )
}

export default LoginComp;


