//import { SummariesTable } from "../components/SummariesTable"
import { Pagination, TablesLayout } from "../../../components";
import { SummaryModal } from "../components/SummaryModal";
import { SummariesTable } from "../components/SummariesTable";
import { useContext } from "react";
import { UserContext } from "../../../contexts";
import { useRecords, useSearchRecords,} from "../../../hooks/";
import { useSearchSummary, useSummaries } from "../../../hooks";
import { SummariesResI } from "../../../helpers";
export const AllSummariesPage = () => {
/*
  const { role } = useContext(UserContext);
  const { currentPage, setCurrentPage, recordsQuery } =
    useRecords<SummariesResI>("summaries");
  const filteredSummaries = searchRecords
    ? searchRecordsQuery
    : recordsQuery
  return (
    <TablesLayout roles={["OPERATOR", "DISPATCHER"]}>
      <h1 className="fixed left-6 font-semibold text-2xl text-warning top-4">
        sumarios
      </h1>
      <Topbar
        modal={<SummaryModal />}
        allowedRole="DISPATCHER"
        setSearchRecords={setSearchRecords}
        key={"summaryModal"}
      />
      
      <div className="md:w-10/12 lg:w-8/12">
      <SummariesTable query={filteredSummaries} />
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              query={recordsQuery}
            />
      </div>
    </TablesLayout>
  );*/
  return(
    <div>hopla</div>
  )
};
