import { UseQueryResult } from "@tanstack/react-query";
import { customDate, customHour, ErrorsI, ReportI, ReportsResI} from "../../../helpers";
import { ReportsColumns } from "./ReportsColumns";
import { Link } from "react-router-dom";
interface Props{
  query: UseQueryResult<ReportsResI, unknown>
}

export const ReportsTable = ({query}:Props) => {

  return (
     <div className="overflow-x-auto h-[40rem] w-full mx-auto rounded-lg shadow-xl">
    <table className="table  table-zebra w-full">
      <ReportsColumns/>
      <tbody>
      {query.isLoading && <tr className="loader"></tr>}
      {query.isError ?  <tr>
        
        <td colSpan={100}>{`${(query.error as ErrorsI).response.data.message}`}</td>
        </tr>
      :
       
        query.data?.message.map((report) => {
          const eventSummary = report.event.substring(0,40);
            return <tr key={report.id}>
              <td>{customDate(report.createdAt)}</td>
              <td>{customHour(report.createdAt)}</td>
              <td>{eventSummary} ...</td>
              <td>{report.userName}</td>
              <td>
                <Link className="btn btn-outline btn-sm" to={`/reportes/${report.id}`}>
                ver reporte
                </Link>
                </td>
            </tr>
        })
        
       
      }
      </tbody>
    </table>
    </div>
  )
}