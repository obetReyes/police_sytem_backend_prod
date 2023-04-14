import React, { useContext, useState, useEffect } from 'react'
import { Navbar } from './Navbar'
import { UserContext } from '../contexts'
import { NotFoundPage } from '../views'

interface Props {
    children: JSX.Element | JSX.Element[]
    roles: string[]
}
export const ProtectedLayout = ({children, roles}:Props) => {
    const { role } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    useEffect(() => {
      let isMounted = true;
        setIsLoading(false)
        
      return () => { isMounted = false; }
      
    }, [isLoading])
  
  return (
    <>
    {isLoading ? <span className='loader'></span> : 
     roles.includes(role) ?
     <div>
          <Navbar/>  
          {children}
     </div>
     :
     <NotFoundPage/>
    }
    </>
  )
}
