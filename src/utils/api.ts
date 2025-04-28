import axios from 'axios'

const api = axios.create({
    baseURL : 'https://reqres.in/api',
    headers : {
        "Content-Type" : "application/json",
          "x-api-key": "reqres-free-v1"
    }
})





export  const loginUser = async(email:string , password:string) => {
    try {
       const response = await api.post(`/login`, { email, password })
       const data = response.data 
       return data
    } catch (error: any) {
        throw new Error(error.response?.data?.error || 'Something went wrong');
    }
}

export const fetchUserData = async(token : string | null  ) => {
    try {
     const response = await api.get("/users/1" , { 
        headers : {
            Authorization : `Bearer ${token}`
        }
     })
     const data = response.data.data
     return data
    } catch (error: any ) {
        throw new Error('Failed to fetch user data');
    }
}