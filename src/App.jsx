import React from 'react'
import { useState } from 'react';
import { ToastContainer,toast } from 'react-toastify';
import User from './components/User';
const App = () => {
 
  const [formData,setFormData] = useState({
    fullName:'',
    password:'',
    confirmPassword:'',
    email:''
  })
  
  const [error,setError]  = useState('')
  const [users,setUsers] = useState([])

  const handleChanges=(e)=>{
    const {name,value}=e.target
    setFormData((prevData)=>({
      ...prevData,
      [name]:value

    }))
  }

  const submitHandler=(e)=>{
    e.preventDefault();
   
    if(formData.password.length<8){
      setError("Password must be 8 characters long")
      return;
    }
    if(formData.password!==formData.confirmPassword){
      setError("Password didnot match");
      return;
    }
    if(!/[!@#$%^&*()<>,._"]/.test(formData.password)){
      setError("Password must contain a special character");
      return;
    }
    if(!/[A-Z]/.test(formData.password)){
      setError("Password must contain a capital letter");
      return;
    }

    setUsers((prevUsers)=>[
      ...prevUsers,{
        fullName:formData.fullName,
        email:formData.email,
        password:formData.password
      }
    ])
    setError("")
    setFormData({
      fullName:'',
      email:'',
      password:'',
      confirmPassword:''
    })
    
    
    toast.success('Login Successful✅', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }
  return (
    <>
    <div className=" bg-gray-700 h-screen flex items-center justify-center">
      <div className=' bg-white rounded-lg p-6 w-96'>
        <h1 className='text-2xl mb-3 text-center font-bold'>Create Account</h1>
      <form onSubmit={(e)=>{
        submitHandler(e);
      }} className='flex flex-col items-center gap-2'>
        <input className='w-full border-1 border-black outline-violet-600 px-3 py-1 text-xl rounded' type="text" placeholder ='Enter Name here'
        name='fullName'
        value={formData.fullName}
        onChange={handleChanges}
        required
        />
        <input className='w-full border-1 border-black outline-violet-600  px-3 py-1 text-xl rounded' type="email" placeholder='Enter Your Email'
          name='email'
          value={formData.email}
          onChange={handleChanges}
          required
        />
        <input className='w-full border-1 border-black outline-violet-600 px-3 py-1 text-xl rounded' type="password" placeholder='Enter Password'
          name='password'
          value={formData.password}
          onChange={handleChanges}
          required
        />
        <input className='w-full border-1 border-black outline-violet-600 px-3 py-1 text-xl rounded' type="password" placeholder='Confirm Password' 
          name='confirmPassword'
          value={formData.confirmPassword}
          onChange={handleChanges}
          required
        />
        {error && (
          <p className='text-medium text-pink-700'>{error}</p>
        )}
      <button className='text-white text-xl px-4 py-2 rounded bg-blue-600 cursor-pointer hover:bg-blue-800 font-semibold mt-3 w-full '>Submit</button>
      <p className='text-center mt-3'>By registering, you agree to our <span className='text-blue-700'>Terms & Conditions</span> and <span>Private Policy</span></p>
      </form>
      <ToastContainer>

      </ToastContainer>
      </div>
    
    </div>
      {users.map(function(elem,idx){
        return <User key={idx} elem={elem}></User>
      })}
    
    </>
    
      
  )
}

export default App
