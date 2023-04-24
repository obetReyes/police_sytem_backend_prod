import { TablesLayout } from "../../../components"
//import { SummariesTable } from "../components/SummariesTable"
import { Pagination } from "../../../components"
import { SummaryModal} from "../components/SummaryModal"
import { SummariesTable } from "../components/SummariesTable"
import { useContext } from "react"
import { UserContext } from "../../../contexts"
import { useSearchSummary ,useSummaries } from "../../../hooks";
export const AllSummariesPage = () => {
  const {role, token} = useContext(UserContext);
  const {summariesQuery, currentSummaries, setCurrentSummaries} = useSummaries()
  const { searchDispatcherSummariesQuery, searchDispatcher, setSearchDispatcher} = useSearchSummary()
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchDispatcher(e.target.value);
  }
  const filteredSummaries = searchDispatcher!.length > 6 ? searchDispatcherSummariesQuery : summariesQuery
  return (
    <TablesLayout roles={["OPERATOR", "DISPATCHER"]}>
       <h1 className='fixed left-6 font-semibold text-2xl text-warning top-4'>sumarios</h1>
<div className="h-20 my-6 flex justify-around md:w-10/12 lg:w-8/12 items-center"> 
        <input
        autoComplete="off"
          type="text"
          placeholder="buscar sumario...."
          className="input input-bordered"
          value={searchDispatcher}
          onChange={handleSearch}
        />
        {role == "DISPATCHER" && <SummaryModal/>}

      </div>
      <div className="md:w-10/12 lg:w-8/12">
      <div className="overflow-x-auto h-2/6 w-full mx-auto rounded-lg shadow-xl">
        <SummariesTable query={filteredSummaries} />  
        </div>
        <Pagination currentPage={currentSummaries} setCurrentPage={setCurrentSummaries}  query={summariesQuery}/>   
      </div>
    </TablesLayout>
  )
}
