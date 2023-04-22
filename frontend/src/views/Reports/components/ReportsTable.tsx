import { useEffect } from "react";
import { customDate, customHour, ReportsResI, ReportResI } from "../../../helpers";
import { ReportsColumns } from "./ReportsColumns";
import { Link } from "react-router-dom";
interface Props{
  data:ReportsResI | undefined
}

export const ReportsTable = ({data}:Props) => {
  return (
    <table className="table table-zebra w-full">
      <ReportsColumns/>
      <tbody>
      { 
        data?.message.map((report) => {
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
  )
}