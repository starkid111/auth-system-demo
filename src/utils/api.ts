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