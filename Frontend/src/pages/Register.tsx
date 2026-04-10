import { useState } from "react";

import { useAppDispatch,useAppSelector } from "../store/hooks";

import { registerUser } from "../store/slices/authSlice";

import { useNavigate } from "react-router-dom";

import React from 'react'

export const Register = () => {

const dispatch = useAppDispatch()
const navigate = useNavigate()

const {loading, error}= useAppSelector((state)=>state.auth)

const [name,setName]=useState("");
const [email,setEmail]=useState("")
const[password,setPassword]=useState("")
  const[role,setRole]=useState("")

const handleRegister =async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

    if(!name|| !email|| !password){
        alert("All fields are Required")
        return 
    }

    const result =await dispatch(
        registerUser({
            name,
            email,
             password,
            role:"user",
        })
    )

 if (registerUser.fulfilled.match(result)) {
      alert("Registration successful! Please login.");
      navigate("/login");
    }

}



  return (
    <div style={{maxWidth:"400px",margin:"50px auto"}}>
<h2>Register</h2>
<form action="" onSubmit={handleRegister}>


<input 
type="text" 
placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}
style={{display:"block", marginBottom:"10px",width:"100%"}}
/>

 <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />



<input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />


<button type="submit" disabled={loading} style={{ width: "100%" }}>
          {loading ? "Creating account..." : "Register"}
        </button>

        


</form>


{error&&(
    <p style={{color:"red", marginTop:"10px" }}>
        {error}
    </p>
)
}

<p style={{marginTop:"10px",}}>

      Already have an account?{" "}

<span style={{color:"blue",cursor:"pointer",}}
onClick={()=>navigate("/login")}>
     Login
</span>

</p>



    </div>

  )
}
