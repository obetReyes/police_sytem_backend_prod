import { TablesLayout } from '../../../components'
import { GroupsModal } from '../components/GroupsModal'
import { useContext } from 'react'
import { UserContext } from '../../../contexts'
//import { GroupsTable } from '../components/GroupsTable'

export const AllGroupsPage = () => {
  const {role} = useContext(UserContext)
  return (
    <TablesLayout roles={["OPERATOR", "DISPATCHER"]}>
      <h1 className='fixed left-6 font-semibold text-2xl text-warning top-4'>Grupos</h1>
      <div className="h-20 my-6 flex justify-around md:w-10/12 lg:w-8/12 items-center">
        <input
        autoComplete="off"
          type="text"
          placeholder="buscar Grupo...."
          className="input input-bordered"
        />
       {role == "OPERATOR" && <GroupsModal/>}
      </div>
      <div className="md:w-10/12 lg:w-8/12">
     
      </div>
      </TablesLayout>
  )
}
