import React from 'react'
import { PiUserCircle } from "react-icons/pi";
import { useSelector } from 'react-redux';


const Avatar = ({userId,name,imageUrl,width,height}) => {

    const onlineUser = useSelector(state=>state?.user?.onlineUser)
  
    let avatarName = ""

    if(name){
        const splitName = name?.split(" ")

        if(splitName.length > 1){
            avatarName = splitName[0][0]+splitName[1][0]
        }else{
            avatarName = splitName[0][0]
        }
    }
    const bgColor = [
        'bg-purple-100', // Light purple
        'bg-purple-200',
        'bg-purple-300',
        'bg-purple-400',
        'bg-purple-500', // Medium purple
        'bg-purple-600',
        'bg-purple-700',
        'bg-purple-800',
        'bg-purple-900', // Dark purple
        'bg-indigo-200', // Light indigo
        'bg-indigo-300',
        'bg-indigo-400',
        'bg-indigo-500', // Medium indigo
        'bg-pink-200',   // Light pink
        'bg-pink-300',
        'bg-pink-400',
        'bg-pink-500',   // Medium pink
        'bg-blue-200',   // Light blue
        'bg-blue-300',
        'bg-blue-400',
        'bg-blue-500',   // Medium blue
      ];
      
      const randomNumber = Math.floor(Math.random() * bgColor.length)

      const isOnline = onlineUser.includes(userId)
    return (
    <div className={`text-slate-900  rounded-full  font-bold relative`} style={{width: width+"px", height: height+"px"}}>
        {
            imageUrl ? (
                <img src={imageUrl} 
                width={width}
                height={height}
                alt={name}
                className='overflow-hidden rounded-full'
                />
            ) : (
                name ? (
                    <div style={{width: width+"px", height: height+"px"}} className={`overflow-hidden rounded-full flex justify-center items-center text-lg ${bgColor[randomNumber]}`}>
                    {avatarName}
                    </div>
                ) : (
                    <PiUserCircle 
                    size={width}/>
                )
            )
        }
        {
            isOnline && (
                <div className='bg-green-600 p-1 absolute bottom-2 -right-1 z-10 rounded-full'></div>

            )   
        }
    </div>
  )
}

export default Avatar