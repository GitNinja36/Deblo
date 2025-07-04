"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useUser } from '@clerk/nextjs';
import { UserDetailContext } from '@/context/UserDetailContext';

export type UsersDetail = {
  name : string,
  email: string,
  credits : number
}

function Provider({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    const {user} = useUser();
    const [userDetail, setUserDetail ] = useState<any >();
    useEffect(()=>{
      CreateNewUser();
    }, [user])

    const CreateNewUser = async () => {
      const result  = await axios.post('/api/users');
      setUserDetail(result.data);
    }

  return (
    <div>
      <UserDetailContext.Provider value={{userDetail, setUserDetail}}>
        {children}
      </UserDetailContext.Provider>
    </div>
  )
}

export default Provider
