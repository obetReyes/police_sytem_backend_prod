import { Pagination, TablesLayout } from "../../../components";
import { ReportModal } from "../components/ReportModal";
import { ReportsTable } from "../components/ReportsTable";
import { useContext } from "react";
import { UserContext } from "../../../contexts";
import { useReports, useSearchReport, useOfficerReports } from "../../../hooks";
import { useRecords, useUserRecord } from "../../../hooks/useQueries";
import { ReportsResI } from "../../../helpers";


export const AllReportsPage = () => {
  const { role, token } = useContext(UserContext);
  const {currentPage, setCurrentPage, recordsQuery} = useRecords<ReportsResI>("reports")
  const {currentPage:currentPage2, setCurrentPage:setCurrentPage2, userRecordQuery} = useUserRecord<ReportsResI>("reports")
  const { setSearchOfficer,searchOfficer,  searchOfficerReportsQuery } = useSearchReport();
  const filteredReports = searchOfficer ? searchOfficerReportsQuery :recordsQuery

  return (
    <TablesLayout roles={["OPERATOR", "DISPATCHER", "OFFICER"]}>
      <h1 className="fixed left-6 font-semibold text-2xl text-warning top-4">
        reportes
      </h1>
      <div className="h-20 my-6 flex justify-around md:w-10/12 lg:w-8/12 items-center">
        {role == "OPERATOR" && (
          <input
            autoComplete="off"
            type="text"
            placeholder="buscar reportes por oficial...."
            className="input input-bordered w-4/12 mx-auto"
            onChange={(e) => { if (e.target.value.length > 6) setSearchOfficer(e.target.value)
              if(e.target.value.length === 0){
                setSearchOfficer(e.target.value)
              }
              }}
          />
        )}
        {role == "OFFICER" && <ReportModal />}
      </div>
      <div className="md:w-10/12 lg:w-8/12">
        {role == "OPERATOR" || role == "DISPATCHER" ? (
          recordsQuery.isError ? (
            <p>{`${recordsQuery.error}`}</p>
          ) : ( 
            recordsQuery.isLoading ? <div className="loader">
            </div>
            :
            <>
             <div className="overflow-x-auto h-[40rem] w-full mx-auto rounded-lg shadow-xl">
              <ReportsTable query={filteredReports} />
            </div>
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage}
            query={recordsQuery}
            />
            </>
          )
        ) : userRecordQuery.isError ? (
          <p>{`${userRecordQuery.error}`}</p>
        ) : (
          userRecordQuery.isLoading ? <div className="loader">
            </div> :
            <> 
              <div className="overflow-x-auto h-[40rem] w-full mx-auto rounded-lg shadow-xl">
          <ReportsTable query={userRecordQuery} />
          </div>        
          <Pagination currentPage={currentPage2} setCurrentPage={setCurrentPage2}  query={userRecordQuery}/>   
            </>
        )}
      </div>
    </TablesLayout>
  );
};
