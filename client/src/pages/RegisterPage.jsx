import React, { useState } from 'react'
import { IoIosCloseCircle } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/uploadFile';
import axios from 'axios'
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [data,setData] = useState({
     name : "",
     email : "",
     password : "",
     profile_pic : ""
  })
   
    const [uploadPhoto, setUploadPhoto] = useState("")
    const navigate = useNavigate()

  const handleOnChange = (e)=>{
    const {name , value} = e.target
    setData((prev)=>{
      return {
        ...prev,
        [name] : value
      }
    })
  }

  const handleUploadPhoto = async(e)=>{
    const file = e.target.files[0]

    const uploadPhoto = await uploadFile(file)
    // console.log("uploadPhoto",uploadPhoto);    
    setUploadPhoto(file)

    setData((prev)=>{
      return{
        ...prev,
      profile_pic : uploadPhoto?.url
      }
    })
  }

  const handleClearUploadPhoto = (e)=>{
    e.stopPropagation()
    e.preventDefault()
    setUploadPhoto(null)
  }
  const handleSubmit = async(e) =>{
    e.preventDefault()
    e.stopPropagation()

    // const URL = `${process.env.VITE_BACKEND_URL}/api/register`

    const URL = `${import.meta.env.VITE_BACKEND_URL}/api/register`;

    try{
      const response = await axios.post(URL,data)
      console.log("response",response)

      toast.success(response.data.message)

      if(response.data.success){
        setData({
          name : "",
          email : "",
          password : "",
          profile_pic : ""
       })
       navigate('/email')
      }

    }catch(error){
      toast.error(error?.response?.data?.message)
      console.log("error",error);
    }

    console.log("data",data);

  }
  // console.log("uploadPhoto",uploadPhoto);
  return (
    <div className='mt-5'>
      <div className='bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto'>
      <h3 className='px-1' style={{ color: 'purple', fontWeight: 'bold', fontSize: '24px', textShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)'}}>
          🗿🗿WellCome to Σchat app 🗿🗿
      </h3>

        <form className='grid gap-4 mt-4' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-1'>
            <label htmlFor="name">Name :</label>
            <input type="text"
            id='name'
            name='name'
            placeholder='enter your Σ name' 
            className='bg-slate-100 px-2 py-1 focus:outline-primary'
            value={data.name}
            onChange={handleOnChange}
            required
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor="email">Email :</label>
            <input type="email"
            id='email'
            name='email'
            placeholder='enter your Σ email' 
            className='bg-slate-100 px-2 py-1 focus:outline-primary'
            value={data.email}
            onChange={handleOnChange}
            required
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor="password">Password :</label>
            <input type="password"
            id='password'
            name='password'
            placeholder='enter your Σ password' 
            className='bg-slate-100 px-2 py-1 focus:outline-primary'
            value={data.password}
            onChange={handleOnChange}
            required
            />
          </div>


          <div className='flex flex-col gap-1'>
            <label htmlFor="profile_pic">Photo :

              <div className='h-14 bg-slate-200 flex justify-center items-center border hover:border-primary rounded cursor-pointer'>
                <p className='text-sm max-w-[300px] text-ellipsis line-clamp-1'>
                {
                uploadPhoto?.name ? uploadPhoto?.name :"Upload Σ profile photo"
                  }
                 </p>
                 {
                  uploadPhoto?.name && (
                    <button className='text-lg ml-2 hover:text-red-600 cursor-pointer'onClick={handleClearUploadPhoto}>
                  <IoIosCloseCircle /></button>
                  )
                 }
                  </div>
            </label>
            <input type="file"
            id='profile_pic'
            name='profile_pic'
            className='bg-slate-100 px-2 py-1 focus:outline-primary hidden'
            onChange={handleUploadPhoto}
           />
          </div>
          <button
          className='bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wider'
          >Register</button>
        </form>
        <p className='my-3 text-center'>Already have account ? <Link to={"/email"} className='hover:text-primary font-semibold'>Login</Link></p>
      </div>
    </div>
  )
}

export default RegisterPage