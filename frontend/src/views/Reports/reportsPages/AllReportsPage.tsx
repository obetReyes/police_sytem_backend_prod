import { Pagination, TablesLayout, Topbar } from "../../../components";
import { ReportModal } from "../components/ReportModal";
import { ReportsTable } from "../components/ReportsTable";
import { useContext, useEffect } from "react";
import { UserContext } from "../../../contexts";
import { useRecords, useSearchRecords} from "../../../hooks/";
import { DecodedI, ReportsResI } from "../../../helpers";
import jwtDecode from "jwt-decode";
export const AllReportsPage = () => {
  const { role,token } = useContext(UserContext);


  const { currentPage, setCurrentPage, recordsQuery } =
    useRecords<ReportsResI>("reports");
    const decoded:DecodedI = jwtDecode(token);
  const { param, searchRecordsQuery,  
    currentPage:crnt3, 
    setCurrentPage:setcrnt3
    , setParam } =
    useSearchRecords<ReportsResI>("reports");

    

    const filteredReports = Object.keys(param).length > 0 ? searchRecordsQuery : recordsQuery;

    useEffect(() => {
      if(role == "OFFICER"){
        setParam({"officer":decoded.info.username})
      }
    },[])

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
  
    
        <ReportsTable query={filteredReports} />
        <Pagination
              currentPage={Object.keys(param).length > 0 ? crnt3 : currentPage}
              setCurrentPage={Object.keys(param).length > 0 ? setcrnt3 : setCurrentPage}
              query={filteredReports}
        />
      </div>
    </TablesLayout>
  );
};
