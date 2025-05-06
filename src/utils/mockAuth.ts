import React from 'react'
import toast from 'react-hot-toast'

export interface User {
    email: string
    password:string
}



export const registerUser = (email: string , password : string) : void => {
        const users : User[] = JSON.parse(localStorage.getItem("users") || "[]")
        const userExists = users.find(user => user.email === email)

        if (userExists) {
            throw new Error("User already existed")
         
        }

        users.push({email , password});
        localStorage.setItem("users" , JSON.stringify(users))
        
}

export const  loginUser = (email : string , password : string  ) : {token : string } => {
    const users : User[] = JSON.parse(localStorage.getItem("users") || "[]")
    const user = users.find(u => u.email === email && u.password === password)

    if (!user) {
        throw new Error("Invalid credentials")
        
    }

    return {token : "mock-token" + Date.now()}
}

