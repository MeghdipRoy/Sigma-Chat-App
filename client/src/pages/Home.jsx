// import axios from 'axios';
// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { Outlet, useLocation, useNavigate } from 'react-router-dom'
// import { logout, setOnlineUser, setUser } from '../redux/userSlice';
// import Sidebar from '../component/Sidebar';
// import logo from '../assets/logo.png';
// import io from 'socket.io-client'

// const Home = () => {

//   const user = useSelector(state => state.user)
//   console.log("user",user)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const location = useLocation()

//   // console.log(("redux-user",user));

//   const fetchUserDetails = async()=>{
//     try{
//       const URL = `${import.meta.env.VITE_BACKEND_URL}/api/user-details`;
//         const response = await axios({
//           url : URL,
//           withCredentials : true
//         })

//         dispatch(setUser(response.data.data))
//         if(response.data.data.logout){
//           dispatch(logout())
//           navigate("/email")
//         }

//         console.log("cuurent user details",response);
//     }catch(error){
//       console.log("errror",error);
//     }
//   }

//   useEffect(()=>{
//     fetchUserDetails()
//   },[])
//   // console.log("location",location)

//   {/**socket connection */}
//   useEffect(()=>{
//     const socketConnection = io(import.meta.env.VITE_BACKEND_URL,{
//       auth : {
//         token : localStorage.getItem('token')
//       }
//     })

//     socketConnection.on('onlineUser',(data)=>{
//       console.log(data)
//       dispatch(setOnlineUser(data))
//     })

//     return ()=>{
//       socketConnection.disconnect()
//     }
//   },[])

//     const basePath = location.pathname === '/'
//     return (
//       <div className='grid lg:grid-cols-[400px,1fr] h-screen max-h-screen'>
//         <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
//           <Sidebar />
//         </section>
  
//         <section className={`${basePath && "hidden"}`}>
//           <Outlet />
//         </section>
//         <div className={`justify-center items-center flex-col gap-2 hidden ${!basePath ? "hidden" : "lg:flex"}`}>
//           <div>
//             <img src={logo} width={250}
//              alt="logo" 
//           />
//           </div>
//           <p className='text-lg mt-2 text-slate-500'>Select user to send message</p>
//         </div>
//       </div>
//     );
//   };

// export default Home

import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { logout, setOnlineUser, setSocketConnection, setUser } from '../redux/userSlice';
import Sidebar from '../component/Sidebar';
import logo from '../assets/logo.png';
import io from 'socket.io-client';

const Home = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch user details on component mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const URL = `${import.meta.env.VITE_BACKEND_URL}/api/user-details`;
        const response = await axios({
          url: URL,
          withCredentials: true
        });

        dispatch(setUser(response.data.data));
        if (response.data.data.logout) {
          dispatch(logout());
          navigate('/email');
        }

        console.log('Current user details', response.data);
      } catch (error) {
        console.log('Error fetching user details', error);
      }
    };

    fetchUserDetails();
  }, [dispatch, navigate]);

  // Establish socket connection on component mount
  useEffect(() => {
    const socketConnection = io(import.meta.env.VITE_BACKEND_URL, {
      auth: {
        token: localStorage.getItem('token')
      }
    });

    // Listen for 'onlineUser' event
    socketConnection.on('onlineUser', data => {
      console.log('Online users:', data);
      dispatch(setOnlineUser(data));
    });

    dispatch(setSocketConnection(socketConnection))

    // Clean up socket connection on component unmount
    return () => {
      socketConnection.disconnect(socketConnection);
    };
  }, [dispatch]);

  // Determine if current path is base path ('/')
  const basePath = location.pathname === '/';

  return (
    <div className='grid lg:grid-cols-[400px,1fr] h-screen max-h-screen'>
      <section className={`bg-white ${!basePath && 'hidden'} lg:block`}>
        <Sidebar />
      </section>

      <section className={`${basePath && 'hidden'}`}>
        <Outlet />
      </section>

      <div className={`justify-center items-center flex-col gap-2 hidden ${!basePath ? 'hidden' : 'lg:flex'}`}>
        <div>
          <img src={logo} width={250} alt='logo' />
        </div>
        <p className='text-lg mt-2 text-slate-500'>Select user to send message</p>
      </div>
    </div>
  );
};

export default Home;
