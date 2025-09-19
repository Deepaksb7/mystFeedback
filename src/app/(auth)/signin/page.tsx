"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { useDebounceValue } from 'usehooks-ts'
import axios, {AxiosError} from "axios"

import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"
import { signupSchema } from "@/schemas/signupSchema"
import { ApiResponse } from "@/types/apiResponse"
  const [username, setUsername] = useState("")
  const [usernameMessage, setUsernameMessage] = useState("")
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [isSubmiting, setIsSubmiting] = useState(false)
  const debouncedUsername = useDebounceValue(username,300)
  const router = useRouter()

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver:zodResolver(signupSchema),
    defaultValues:{
      username:'',
      email:"",
      password:''
    }
  })

  useEffect(() => {
    const checkUsernameUnique = async ()=>{
      if(debouncedUsername){
        setIsCheckingUsername(true)
        setUsernameMessage('')
        try {
          const response = await axios.get(`/api/checkUniqueUsername?username=${debouncedUsername}`)
          setUsernameMessage(response.data.message)
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? "Error checking username"
          )
        }finally{
          setIsCheckingUsername(false)
        }
      }
    }

    checkUsernameUnique()

  }, [debouncedUsername])
  
  
const page = () => {
  return (
    <div>
      
    </div>
  )
}

export default page
