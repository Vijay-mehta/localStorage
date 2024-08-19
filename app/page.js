'use client'

import { useEffect, useState } from "react";
import Modal from "./components/Modal";

export default function Home() {



  const [data, setData] = useState({
    name: "", email: "",userId:""
  })

  const [isModal,setIsModal] =useState(false)
  


  const [userData, setUserData] = useState([])
  const [currentUser,setCurrentUser] =useState('')
   const [search,setSearch] =useState('')

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData((prev) => ({ ...prev, [name]: value }))
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    let userData = JSON.parse(localStorage.getItem('user')) ?? [];
    userData.push(data)
    localStorage.setItem('user', JSON.stringify(userData));
    setUserData(userData)
    setData({
      name: "",
      email: "",
      userId: ""
    })
  };


  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem('user')))
  }, [])

  const handleRemove = (index) => {
    let newUser = [...userData]
    newUser.splice(index, 1)
    localStorage.setItem('user', JSON.stringify(newUser));
    setUserData(newUser)
  }

  const handleEdite=(user)=>{
   setCurrentUser(user)
    setIsModal(true)
  }


  const filteredData = userData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  
  );

  const handleSearch=(e)=>{
    setSearch(e.target.value)
  }

  return (
    <>
  {isModal && <Modal currentUser={currentUser} setIsModal={setIsModal} setUserData={setUserData}/>}
      <div className=" flex flex-col">
        <form onSubmit={handleSubmit} className=" flex flex-col md:w-[500px]   md:m-auto  mt-10  bg-white ">
          
        <h1 className=" font-bold text-2xl text-center mb-5">Create User</h1>
          <input type="text" value={data.name} placeholder="Enter Name" name="name" onChange={handleChange} className="border-2 m-3 p-2 " />
          <input type="email" value={data.email} placeholder="Enter Email" name="email" onChange={handleChange} className="border-2 mx-3 p-2" />
          <input type="number" value={data.userId} placeholder="Enter UserId" name="userId" onChange={handleChange} className="border-2 mx-3 my-2 p-2" />

          <div className=" text-center "><button type="submit" className={`bg-black text-white w-[100px] px-2 py-3 mt-2 ${data.name && data.email && data.userId ? '' : " cursor-not-allowed"}`

          } disabled={!data.name && !data.email && !data.userId}>Submit</button></div>
        </form>
      </div>
     {userData.length> 0 ?<div className=" text-center"><input type="text" placeholder="Search By Name" onChange={handleSearch} className=" px-3 py-3  border-2   mt-5"/></div>:null}
     <div className="  grid  grid-cols-1 md:grid-cols-4  gap-2"> {
       
       filteredData && userData && (
        filteredData.map((user, index) => (
            <div key={index} className=" p-3 mt-3 w-[350px]  shadow-lg   m-auto">
             <div className=" flex flex-row justify-end"> 
             <span className="mr-5 cursor-pointer " onClick={()=>handleEdite(user)} >&#9998;</span>
              <span className="cursor-pointer " onClick={() => handleRemove(index)}>&times;</span>
              
              </div>
              <h2 className=" text-black" >{user.userId}</h2>
              <h2>{user.name}</h2>
              <h2>{user.email}</h2>

            </div>))
        )
        
      }</div>
    </>
  );
}

