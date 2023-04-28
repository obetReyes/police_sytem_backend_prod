import { Pagination, TablesLayout, Topbar } from "../../../components";
import { ReportModal } from "../components/ReportModal";
import { ReportsTable } from "../components/ReportsTable";
import { useContext } from "react";
import { UserContext } from "../../../contexts";
import { useRecords, useSearchRecords, useUserRecord } from "../../../hooks/";
import { ReportsResI } from "../../../helpers";
export const AllReportsPage = () => {
  const { role } = useContext(UserContext);
  const { currentPage, setCurrentPage, recordsQuery } =
    useRecords<ReportsResI>("reports");

  const {
    currentPage: currentPage2,
    setCurrentPage: setCurrentPage2,
    userRecordQuery,
  } = useUserRecord<ReportsResI>("reports");

  const { param, searchRecordsQuery,  setParam } =
    useSearchRecords<ReportsResI>("reports");

  const filteredReports = Object.keys(param).length > 0 ? searchRecordsQuery : recordsQuery;

  return (
    <TablesLayout roles={["OPERATOR", "DISPATCHER", "OFFICER"]}>
      <h1 className="fixed left-6 font-semibold text-2xl text-warning top-4">
        reportes
      </h1>
      <Topbar
        modal={<ReportModal />}
        allowedRole="OFFICER"
        setParam={setParam}
        param={param}
        key={"reportModal"}
      />
      <>
</>
      <div className="md:w-10/12 lg:w-8/12">
        {role == "OPERATOR" || role == "DISPATCHER" ? (
          <>
            <ReportsTable query={filteredReports} />
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              query={filteredReports}
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
