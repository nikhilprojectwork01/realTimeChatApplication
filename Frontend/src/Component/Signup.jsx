import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import toast from 'react-hot-toast';
import axios from "axios"
import { USER_API_ENDPOINT } from "./utils/utils.jsx"

export default function Signup() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    fullName: '',
    userName: '',
    password: '',
    confirmPassword: '',
    gender: '',
  })

  const handleInput = (e) => {
    return setInput({ ...input, [e.target.name]: e.target.value })
  }
  const onsubmitData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", input.fullName)
    formData.append("userName", input.userName)
    formData.append("password", input.password);
    formData.append("confirmPassword", input.confirmPassword);
    formData.append("gender", input.gender)
    try {
      const response = await axios.post(`${USER_API_ENDPOINT}/register`, formData, { headers: { 'Content-Type': "application/json" }, withCredentials: true, })
      if (response?.data?.success) {
        navigate("/login")
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  return (
    <>
      <div className="min-w-96 mx-auto">
        <div className='h-full w-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 rounded-3xl p-4'>
          <h1 className='text-3xl font-bold text-center'>Signup</h1>
          <form onSubmit={onsubmitData} action="">
            <div>
              <label className='label p-2'>
                <span className='text-base label-text text-blue-700'>Full Name</span>
              </label>
              <input
                name='fullName'
                value={input.fullName}
                onChange={handleInput}
                className='w-full input  h-10'
                type="text"
                placeholder='Full Name' />
            </div>
            <div className='outline-none'>
              <label className='label p-2'>
                <span className='text-blue-700 label-text'>Username</span>
              </label>
              <input
                name='userName'
                value={input.userName}
                onChange={handleInput}
                className='w-full input input-bordered h-10'
                type="text"
                placeholder='Username' />
            </div>
            <div>
              <label className='label p-2'>
                <span className='text-base label-text text-blue-700'>Password</span>
              </label>
              <input
                name='password'
                value={input.password}
                onChange={handleInput}
                className='w-full input input-bordered h-10'
                type="password"
                placeholder='Password' />
            </div>
            <div>
              <label className='label p-2'>
                <span className='text-base label-text text-blue-700'>Confirm Password</span>
              </label>
              <input
                name='confirmPassword'
                value={input.confirmPassword}
                onChange={handleInput}
                className='w-full input input-bordered h-10'
                type="password"
                placeholder='Confirm Password' />
            </div>
            <div className='flex items-center my-4'>
              <div className='flex items-center'>
                <p className='text-blue-700'>Male</p>
                <input
                  type="radio"
                  name='gender'
                  value='male'
                  checked={input.gender === "male"}
                  onChange={handleInput}
                  className="checkbox mx-2 checkbox-neutral" />
              </div>
              <div className='flex items-center'>
                <p className='text-blue-700'>Female</p>
                <input
                  type="radio"
                  name='gender'
                  value='female'
                  checked={input.gender === "female"}
                  onChange={handleInput}
                  className="checkbox mx-2 checkbox-secondary" />

              </div>
            </div>
            <p className='text-center my-2 text-red-700 font-bold'>Already have an account? <Link to="/login"> login </Link></p>
            <div>
              <button type='submit' className='btn btn-block btn-sm mt-2 border border-slate-700'>Singup</button>
            </div>
          </form>
        </div> 
      </div>
    </>
  )
}
