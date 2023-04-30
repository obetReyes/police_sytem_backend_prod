import { Pagination, TablesLayout, Topbar } from "../../../components";
import { ReportModal } from "../components/ReportModal";
import { ReportsTable } from "../components/ReportsTable";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts";
import { useRecords, useSearchRecords} from "../../../hooks/";
import { DecodedI, ReportsResI } from "../../../helpers";
import jwtDecode from "jwt-decode";
import { Outlet } from "react-router-dom"

export const AllReportsPage = () => {
  const { role,token } = useContext(UserContext);


  const { currentPage:currentPageAll, setCurrentPage:setCurrentPageAll, recordsQuery } =
    useRecords<ReportsResI>("reports");
    const decoded:DecodedI = jwtDecode(token);
  const { param, searchRecordsQuery,  
    currentPage:currentPageSearch, 
    setCurrentPage:setCurrentPageSearch
    , setParam } =
    useSearchRecords<ReportsResI>("reports");

    

    const [filteredReports, setFilteredReports] = useState(recordsQuery);

    useEffect(() => {
      setFilteredReports(Object.keys(param).length > 0 ? searchRecordsQuery : recordsQuery);
    }, [filteredReports,param, setParam,  recordsQuery, searchRecordsQuery]);


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
       
      <Outlet/>
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
              currentPage={Object.keys(param).length > 0 ? currentPageSearch : currentPageAll}
              setCurrentPage={Object.keys(param).length > 0 ? setCurrentPageSearch : setCurrentPageAll}
              query={filteredReports}
        />
      </div>
    </TablesLayout>
  );
};
