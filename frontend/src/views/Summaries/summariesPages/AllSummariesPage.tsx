import { TablesLayout } from "../../../components"
import { SummariesTable } from "../components/SummariesTable"
import { SummaryModal} from "../components/SummaryModal"

export const AllSummariesPage = () => {
  return (
    <TablesLayout roles={["OPERATOR", "DISPATCHER"]}>
       <h1 className='fixed left-6 font-semibold text-2xl text-warning top-4'>sumarios</h1>
<div className="h-20 my-6 flex justify-around md:w-10/12 lg:w-8/12 items-center"> 
        <input
        autoComplete="off"
          type="text"
          placeholder="buscar sumario...."
          className="input input-bordered"
        />

       <SummaryModal/>
      </div>
      <div className="md:w-10/12 lg:w-8/12">
        <SummariesTable/>
      </div>
    </TablesLayout>
  )
}
