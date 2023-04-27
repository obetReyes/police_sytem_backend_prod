import { Pagination, TablesLayout, Topbar } from "../../../components";
import { ReportModal } from "../components/ReportModal";
import { ReportsTable } from "../components/ReportsTable";
import { useContext } from "react";
import { UserContext } from "../../../contexts";
import { useRecords, useSearchRecords, useUserRecord } from "../../../hooks/";
import { ReportsResI } from "../../../helpers";
import { ErrorsI } from "../../../helpers";
export const AllReportsPage = () => {
  const { role } = useContext(UserContext);
  const { currentPage, setCurrentPage, recordsQuery } =
    useRecords<ReportsResI>("reports");

  const {
    currentPage: currentPage2,
    setCurrentPage: setCurrentPage2,
    userRecordQuery,
  } = useUserRecord<ReportsResI>("reports");

  const { searchRecords, setSearchRecords, searchRecordsQuery,  setParam , setSubmit} =
    useSearchRecords<ReportsResI>("reports");

  const filteredReports = searchRecords ? searchRecordsQuery : recordsQuery;

  return (
    <TablesLayout roles={["OPERATOR", "DISPATCHER", "OFFICER"]}>
      <h1 className="fixed left-6 font-semibold text-2xl text-warning top-4">
        reportes
      </h1>
      <Topbar
        modal={<ReportModal />}
        allowedRole="OFFICER"
        setParam={setParam}
        setSubmit={setSubmit}
        setSearchRecords={setSearchRecords}
        key={"reportModal"}
      />
      <>
{searchRecordsQuery.isError ? <p className="absolute  text-sm  text-error font-semibold underline">{`${(searchRecordsQuery.error as ErrorsI).response.data.message}`}</p> : null}
</>
      <div className="md:w-10/12 lg:w-8/12">
        {role == "OPERATOR" || role == "DISPATCHER" ? (
          <>
            <ReportsTable query={filteredReports} />
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              query={recordsQuery}
            />
          </>
        ) : (
          <>
            <ReportsTable query={userRecordQuery} />
            <Pagination
              currentPage={currentPage2}
              setCurrentPage={setCurrentPage2}
              query={userRecordQuery}
            />
          </>
        )}
      </div>
    </TablesLayout>
  );
};
