import React, { useContext } from 'react'

import { UserContext } from '../contexts'
interface Props{
    setSearchRecords:(value: React.SetStateAction<string | undefined>) => void
    allowedRole:string
    modal:JSX.Element
}

export const Topbar = ({setSearchRecords, allowedRole, modal}:Props) => {
  const {role} = useContext(UserContext);
  let currentRole;
  if(role == "DISPATCHER") currentRole = "emisario";
  if(role == "OPERATOR") currentRole = "operador";
  if(role == "OFFICER") currentRole = "oficial";
  return (
    <div className="h-20 my-6 flex justify-around md:w-10/12 lg:w-8/12 items-center">
    <input
            autoComplete="off"
            type="text"
            placeholder={`buscar por ${currentRole}`}
            className="input input-bordered w-4/12 mx-auto"
            onChange={(e) => { if (e.target.value.length > 6) setSearchRecords(e.target.value)
              if(e.target.value.length === 0){
                setSearchRecords(e.target.value)
              }
              }}
        />
          {allowedRole == role && modal}
    </div>
  )
}
