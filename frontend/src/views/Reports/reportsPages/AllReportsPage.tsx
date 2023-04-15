import { TablesLayout } from "../../../components";
import { ReportModal } from "../components/ReportModal";
import { ReportsTable } from "../components/ReportsTable";

export const AllReportsPage = () => {
  return (
    <TablesLayout roles={["OPERATOR", "DISPATCHER", "OFFICER"]}>
       <h1 className='fixed left-6 font-semibold text-2xl text-warning top-4'>reportes</h1>
      <div className="h-20 my-6 flex justify-around md:w-10/12 lg:w-8/12 items-center">
        <input
        autoComplete="off"
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
