import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Dashboard = () => {
    const url = "http://localhost:5550/users/verifytoken"
    const url2 = "http://localhost:5550/users/upload"

    // useEffect(() => {
    //     axios.get(url, {
    //         headers:{
    //             'Authorization': 'Bearer ' + localStorage.getItem('token'),
    //             'Content-Type': 'application/json'
    //         }
    //     }).then((res)=>{
    //         console.log(res)
    //     })
    // }, [])

   
    // const authenticate = () => {
    //     let token = localStorage.getItem('token')
    //     console.log(token)
    //     axios.post(url, {token:token}).then((res)=>{
    //         console.log(res)
    //     }).catch((err)=>{
    //         console.log(err)
    //     })
    // }

    const [files, setFiles] = useState('')
    const [data, setData] = useState([])

    const pickfile = (e) => {
        const file = e.target.files[0]
        // console.log(file)
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            const result = reader.result
            setFiles(result)
        }
    }

    console.log(files)

    const uploadPicture = () =>{
        axios.post(url2, {files:files}).then((result)=>{
            console.log(result.data)
            setData(result.data)
        }).catch((error)=>{
            console.log(error)
        })
    }
    console.log(data, 33)

    return (
        <>
            <h1>Dashboard</h1>
            <input type="file" onChange={(e)=>pickfile(e)} />
            <button onClick={uploadPicture}>Upload picture</button>
        </>
    )
}

export default Dashboard