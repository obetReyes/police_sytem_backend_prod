import { Pagination, TablesLayout, Topbar } from "../../../components";
import { ReportModal } from "../components/ReportModal";
import { ReportsTable } from "../components/ReportsTable";
import { useContext } from "react";
import { UserContext } from "../../../contexts";
import { useReports, useSearchReport, useOfficerReports } from "../../../hooks";
import { useRecords, useSearchRecords, useUserRecord } from "../../../hooks/useQueries";
import { ReportsResI } from "../../../helpers";


export const AllReportsPage = () => {
  const { role, token } = useContext(UserContext);
  const {currentPage, setCurrentPage, recordsQuery} = useRecords<ReportsResI>("reports");
  
  const {currentPage:currentPage2, setCurrentPage:setCurrentPage2, userRecordQuery} = useUserRecord<ReportsResI>("reports");

  const {searchRecords, setSearchRecords, searchRecordsQuery} = useSearchRecords<ReportsResI>("reports");

  const filteredReports = searchRecords ? searchRecordsQuery:recordsQuery

  return (
    <TablesLayout roles={["OPERATOR", "DISPATCHER", "OFFICER"]}>
      <h1 className="fixed left-6 font-semibold text-2xl text-warning top-4">
        reportes
      </h1>
    <Topbar
    modal={<ReportModal/>}
    role="OFFICER"
    setSearchRecords={setSearchRecords}
    key={}
    />
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
