import React from 'react'
import { Navbar } from './Navbar'
import { Table } from './Table'
import { ReportsTable } from '../views/Reports/components/ReportsTable'

interface Props{
  children:JSX.Element | JSX.Element []
}

export const AppLayout = ({children}:Props) => {
  return (
    <div className='w-full h-screen p-4  overflow-y-hidden flex flex-col items-center  '>
      <h1 className='fixed left-6 font-semibold text-2xl text-warning top-4'>reportes</h1>
      <Navbar/>
      <div  className='h-20 flex justify-around md:w-10/12 lg:w-8/12 items-center'>
    
    <input type="text" placeholder="buscar reporte...." className="input input-bordered" />
  
<div className='btn btn-outline'>crear reporte</div>
      </div>
      <div className='md:w-10/12 lg:w-8/12  '>
      <ReportsTable/>
      </div>
      {children}
    </div>
  )
}
