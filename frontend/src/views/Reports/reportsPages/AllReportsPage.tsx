import { useEffect } from "react";
import { TablesLayout } from "../../../components";
import { ReportModal } from "../components/ReportModal";
import { ReportsTable } from "../components/ReportsTable";
import { useContext } from "react";
import { UserContext } from "../../../contexts";
import { useReports, useSearchReport } from "../../../hooks";
import { DecodedI } from "../../../helpers";
import jwt_decode from "jwt-decode";

export const AllReportsPage = () => {
  const { role, token } = useContext(UserContext);
  const reportsQuery = useReports();
  const { setOfficer, officerReportsQuery } = useSearchReport();
  const decoded: DecodedI = jwt_decode(token);

  {
    role == "OFFICER" &&
      useEffect(() => {
        setOfficer(decoded.info.username);
        console.log(reportsQuery.data);
      }, []);
  }

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

          />
        )}
        {role == "OFFICER" && <ReportModal />}
      </div>
      <div className="md:w-10/12 lg:w-8/12">
        {role == "OPERATOR" || role == "DISPATCHER" ? (
          reportsQuery.isError ? (
            <p>{`${reportsQuery.error}`}</p>
          ) : (
            <div className="overflow-x-auto h-[44rem] w-full mx-auto rounded-lg shadow-xl">
              <ReportsTable data={reportsQuery.data} />
            </div>
          )
        ) : officerReportsQuery.isError ? (
          <p>{`${officerReportsQuery.error}`}</p>
        ) : (
          <div className="overflow-x-auto h-[44rem] w-full mx-auto rounded-lg shadow-xl">
          <ReportsTable data={officerReportsQuery.data} />
          </div>
        )}
      </div>
    </TablesLayout>
  );
};
