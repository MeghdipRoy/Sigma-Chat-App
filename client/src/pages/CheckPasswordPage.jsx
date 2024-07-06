import React, { useEffect, useState } from 'react'
import { IoIosCloseCircle } from "react-icons/io";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/uploadFile';
import axios from 'axios'
import toast from 'react-hot-toast';
import { PiUserCircle } from "react-icons/pi";
import Avatar from '../component/Avatar';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../redux/userSlice';

const CheckPasswordPage = () => {
  const [data,setData] = useState({
    password : "",
   })
    
     const navigate = useNavigate()
     const location = useLocation()
     const dispatch = useDispatch()

    //  console.log("locaton",location.state);

     useEffect(()=>{
      if(!location?.state?.name){
        navigate('/email')
      }
     },[])
  
   const handleOnChange = (e)=>{
     const {name , value} = e.target
     setData((prev)=>{
       return {
         ...prev,
         [name] : value
       }
     })
   }
  
  
   const handleSubmit = async(e) =>{
     e.preventDefault()
     e.stopPropagation()
  
     // const URL = `${process.env.VITE_BACKEND_URL}/api/register`
  
     const URL = `${import.meta.env.VITE_BACKEND_URL}/api/password`;
  
     try{
      const response = await axios({
        method :'post',
        url : URL,
        data : {
          userId : location?.state?._id,
          password : data.password
        },
        withCredentials : true
      })  
       toast.success(response.data.message)

       
  
       if(response.data.success){
        dispatch(setToken(response?.data?.token))
        localStorage.setItem('token',response?.data?.token)

         setData({
         password : "",    
        })
        navigate('/')
       }
  
     }catch(error){
       toast.error(error?.response?.data?.message)
    }
   }
    return (
      <div className='mt-5'>
      <div className='bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto'>
      <div className='w-fit mx-auto mb-2 flex justify-center items-center flex-col'>
          {/* <PiUserCircle 
          size={80}/> */}
          <Avatar
          width={70}
          height={70}
          name={location.state?.name}
          imageUrl={location.state?.profile_pic}
          />
          <h2 className='font-semibold text-lg mt-1'>{location.state?.name}</h2>
          </div>
  
      <h3 className='px-1' style={{ color: 'purple', fontWeight: 'bold', fontSize: '24px', textShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)'}}>
          🗿🗿WellCome to Σchat app 🗿🗿
      </h3>
  
        <form className='grid gap-4 mt-4' onSubmit={handleSubmit}>
        
          <div className='flex flex-col gap-1'>
            <label htmlFor="password">Password :</label>
            <input type="password"
            id='password'
            name='password'
            placeholder='enter your Σ passwod' 
            className='bg-slate-100 px-2 py-1 focus:outline-primary'
            value={data.password}
            onChange={handleOnChange}
            required
            />
          </div>
  
      
          <button
          className='bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wider'
          >Log in Σ</button>
        </form>
        <p className='my-3 text-center'><Link to={"/forgot-password"} className='hover:text-primary font-semibold'>Forgot passwod ?</Link></p>
      </div>
    </div>
    )
}

export default CheckPasswordPage

