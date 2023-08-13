"use client"
import React, { useRef } from 'react'
import { useState } from 'react'
import emailjs from '@emailjs/browser';

/*
interface userDataTypes {
    user_name: string
    user_lastname: string
    user_email: string
}
*/
function Newsletter() {
    //const [userData, setUserData] = useState<userDataTypes>({user_name: '', user_lastname: '', user_email: '' })
    const [loading, setLoading] = useState<boolean>(false)
/*
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
       const target = e.target
       setUserData((prevData)=>({
            ...prevData,
            [target.name]: target.value  
       }))
    }
*/
  const form: any = useRef(null);
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    const template: string = process.env.TEMPLATE!
    const public_key = process.env.PLUBLIC_KEY

    e.preventDefault();
    setLoading(true)
    
    emailjs.sendForm('service_sari86b', template, form.current, public_key)
      .then((result: any) => {
        if(result.text === 'OK'){
            setLoading(false)
        }
          console.log(result.text);
      }, (error: any) => {
          console.log(error.text);
      });
  };

   /*
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
         e.preventDefault()
         const ruta = "/api/newsletter"
         fetch(ruta, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(userData)
         }).then((res)=>{
            if(res){
                console.log("res", res)
            }
         })
    }
*/
  return (
          <div className='flex flex-col gap-7 pb-5'>
               <h2 className='text-2xl font-bold'>Newsletter</h2>
               <form ref={form} onSubmit={sendEmail} className='flex flex-col justify-center items-center gap-5'>
                        <div className='flex gap-3'>
                                <input className="p-2 w-40 border-none outline-none" type="text" name="user_name" placeholder='name'/>
                                <input className="p-2 w-40 border-none outline-none" type="text" name="user_lastname" placeholder='lastname'/>
                        </div>
                        <div className='flex flex-col justify-center items-center gap-5'>
                            <input className="p-2 w-[333px] border-none outline-none" type="email" name="user_email" placeholder='email'/>
                         <button disabled={loading} className={loading ? 'flex items-center justify-center w-[170px] p-3 text-xl bg-slate-700 rounded-md hover:bg-slate-800 text-white cursor-not-allowed' : 'flex items-center justify-center w-[170px] p-3 text-xl bg-slate-700 rounded-md hover:bg-slate-800 text-white'}>
                            {loading && <svg className="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                             </svg>}
                                Subscribe
                            </button>
                        </div> 
               </form>
          </div>
  )
}

export default Newsletter