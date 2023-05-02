import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from 'axios'

export default function Home() {
  const signUp = async () => {
    const firstName = document.getElementById("firstName").value
    const lastName = document.getElementById("lastName").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    }
    axios.post("http://localhost:5550/users/signup", data).then((res) => {
      console.log(res)
      alert(res.data.message)
    }).catch((err) => {
      console.log(err)
      alert(err.response.data.message)
    })
  }
  return (
    <>
      <div className="col-7 shadow-lg mx-auto px-5">
        <h6 className="display-6 text-muted text-center">Sign Up</h6>
        <input placeholder="First name" className="my-2 form-control" id="firstName" type="text" />
        <input placeholder="Last name" className="my-2 form-control" id="lastName" type="text" />
        <input placeholder="Email" className="my-2 form-control" id="email" type="text" />
        <input placeholder="Password" className="my-2 form-control" id="password" type="text" />
        <button className="my-2 btn btn-outline-dark" onClick={signUp}>Sign Up</button>
      </div>
    </>
  )
}
