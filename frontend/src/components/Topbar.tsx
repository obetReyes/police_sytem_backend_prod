import React from 'react'

interface Props{
    setSearchRecords:(value: React.SetStateAction<string | undefined>) => void
    role:string
    modal:JSX.Element
}

export const Topbar = ({setSearchRecords, role, modal}:Props) => {
  return (
    <div className="h-20 my-6 flex justify-around md:w-10/12 lg:w-8/12 items-center">
    <input
            autoComplete="off"
            type="text"
            placeholder="buscar reportes por oficial...."
            className="input input-bordered w-4/12 mx-auto"
            onChange={(e) => { if (e.target.value.length > 6) setSearchRecords(e.target.value)
              if(e.target.value.length === 0){
                setSearchRecords(e.target.value)
              }
              }}
        />
          {role == "OFFICER" && modal}
    </div>
  )
}
