import { TablesLayout } from "../../../components"
//import { SummariesTable } from "../components/SummariesTable"
import { Pagination } from "../../../components"
import { SummaryModal} from "../components/SummaryModal"
import { SummariesTable } from "../components/SummariesTable"
import { useContext } from "react"
import { UserContext } from "../../../contexts"
import { useSummary, useSearchSummary ,useSummaries, useSummaryMutation } from "../../../hooks";
import { DecodedI } from "../../../helpers";
import jwt_decode from "jwt-decode";
export const AllSummariesPage = () => {
  const {role, token} = useContext(UserContext);
  const {summariesQuery, currentSummaries, setCurrentSummaries} = useSummaries()
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
        {role == "DISPATCHER" && <SummaryModal/>}

      </div>
      <div className="md:w-10/12 lg:w-8/12">
    {summariesQuery.isLoading ? (
      <div className="loader">
      </div>
    ) : summariesQuery.isError ? <p>{`${summariesQuery.error}`}</p> : <>
      <> 
      <div className="overflow-x-auto h-[40rem] w-full mx-auto rounded-lg shadow-xl">
        <SummariesTable data={summariesQuery.data} />  
        </div>
        <Pagination currentPage={currentSummaries} setCurrentPage={setCurrentSummaries}  query={summariesQuery}/>   
      </>
    </>}
      </div>
    </TablesLayout>
  )
}
