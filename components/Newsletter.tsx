"use client"
import React, { useRef } from 'react'
import { useState } from 'react'
import { t, getLocaleFromPath } from '@/lib/intl'
import emailjs from '@emailjs/browser';


function Newsletter() {
    //const [userData, setUserData] = useState<userDataTypes>({user_name: '', user_lastname: '', user_email: '' })
    const [loading, setLoading] = useState<boolean>(false)
    const [subscription, setSubscription] = useState<boolean>(false)
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
    const sendEmail = (e: React.SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
    const template: string | undefined = process.env.NEXT_PUBLIC_TEMPLATE!
    const public_key: string | undefined = process.env.NEXT_PUBLIC_KEY
    
    setLoading(true)
    emailjs.sendForm('service_sari86b', template, form.current, public_key)
      .then((result: any) => {
        if(result.text === 'OK'){
            setLoading(false)
            setSubscription(true)
            form.current.reset();
        }
        setTimeout(() => {
            setSubscription(false);
          }, 3000);        
      }, (error: any) => {
          console.log(error.text);
      });
  };


  return (
                    <div className="card max-w-xl mx-auto">
                             <div className="flex items-start gap-4">
                                 <div className="flex-1">
                                     <h2 className="text-2xl font-semibold mb-1">{t('newsletter.subscribe', typeof window !== 'undefined' ? getLocaleFromPath() : 'es')}</h2>
                                     <p className="text-sm muted mb-4">{t('newsletter.placeholder', typeof window !== 'undefined' ? getLocaleFromPath() : 'es')}</p>

                                     <form ref={form} onSubmit={sendEmail} className="grid gap-3">
                                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                             <label className="sr-only" htmlFor="user_name">Nombre</label>
                                             <input id="user_name" name="user_name" className="w-full p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-black placeholder:text-muted" type="text" placeholder="Nombre" />
                                             <label className="sr-only" htmlFor="user_lastname">Apellido</label>
                                             <input id="user_lastname" name="user_lastname" className="w-full p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-black placeholder:text-muted" type="text" placeholder="Apellido" />
                                         </div>

                                         <div>
                                             <label className="sr-only" htmlFor="user_email">Email</label>
                                             <input id="user_email" name="user_email" className="w-full p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-black placeholder:text-muted" type="email" placeholder={t('newsletter.placeholder', typeof window !== 'undefined' ? getLocaleFromPath() : 'es')} required />
                                         </div>

                                         <div className="flex items-center justify-between gap-4">
                                             <button disabled={loading} type="submit" className={`inline-flex items-center gap-3 px-5 py-2 rounded-md text-white font-medium shadow-sm transition ${loading ? 'opacity-70 cursor-not-allowed bg-primary' : 'bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary'}`}>
                                                 {loading && <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                     </svg>}
                                                 <span>{loading ? t('newsletter.subscribing', typeof window !== 'undefined' ? getLocaleFromPath() : 'es') : t('newsletter.subscribe_cta', typeof window !== 'undefined' ? getLocaleFromPath() : 'es')}</span>
                                             </button>

                                             <div className="text-sm muted">{subscription && <span className="text-green-600">{t('newsletter.success', typeof window !== 'undefined' ? getLocaleFromPath() : 'es')}</span>}</div>
                                         </div>
                                     </form>
                                 </div>
                             </div>
                             <p className="text-xs muted mt-4">No compartimos tu correo. Puedes darte de baja en cualquier momento.</p>
                    </div>
  )
}

export default Newsletter