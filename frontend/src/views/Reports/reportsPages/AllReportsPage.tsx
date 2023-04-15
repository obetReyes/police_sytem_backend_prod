import { TablesLayout } from "../../../components";
import { ReportModal } from "../components/ReportModal";
import { ReportsTable } from "../components/ReportsTable";

export const AllReportsPage = () => {
  return (
    <TablesLayout roles={["OPERATOR", "DISPATCHER", "OFFICER"]}>
      <div className="h-20 my-6 flex justify-around md:w-10/12 lg:w-8/12 items-center">
        <input
          type="text"
          placeholder="buscar reporte...."
          className="input input-bordered"
        />

       <ReportModal/>
      </div>
      <div className="md:w-10/12 lg:w-8/12">
        <ReportsTable />
      </div>
    </TablesLayout>
  );
};
