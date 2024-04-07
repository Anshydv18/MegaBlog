import { useState } from 'react';
import authService from '../appwrite/auth'
import { Link,useNavigate } from "react-router-dom";
import {} from './index'
import {login} from '../store/authSlice'
import {useDispatch } from "react-redux";
import {useForm} from 'react-hook-form'
import React from 'react';
function Signup(){
    const[error,setError]=useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register,handleSubmit} = useForm();

    const create = async(data)=>{
        setError("");
        try {
           const userData= await authService.createAccount(data);
           if(userData){
            await authService.getCurrentUser();
            if(userData) dispatch(login(userData));
            navigate("/")
           }
        } catch (error) {
            setError(error.message);
        }
    }

    return(
        <div className="flex justify-center items-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black`}>
                 <div className="mb-2 flex justify-center">
                    <span className="inline-blocl w-full max-w-[100px">
                        <Logo width="100px" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">
                    sign in to your account
                </h2>
                <p className="mt-2 text-center text-base  text-black">
                     have any account?&nbsp;
                    <Link 
                    to="/login"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                    Login
                    </Link>
                </p>
                { error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className=" space-y-5">
                        <Input
                        label="Full Name :"
                        placeholder="ENter your email"
                        type="email"
                        {...register("name",{
                            required:true,
                        })}
                        />
                        {/* for email */}

                        <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register("email",{
                            required:true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />

                        {/* for password */}
                        <Input
                        label="Password: "
                        placeholder="Enter Your Password"
                        type="password"
                        {...register("password",{
                            required:true,
                        })}
                        />

                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>

            </div>

        </div>
    )
}

export default Signup();