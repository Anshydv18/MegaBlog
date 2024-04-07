import { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import authservice from './appwrite/auth'
import{login,logout} from "./store/authSlice"

function App() {
  const [loading,setLoading]=useState(true);
  const dispatch = useDispatch();


  useEffect(()=>{
    authservice.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login(userData))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(()=>setLoading(false))
    // finally runs everytime, it have no escape
  },[])

  return !loading?(
    <div className=' min-h-screen w-full bg-red-500'>Welcome</div>
  ):null
}

export default App

