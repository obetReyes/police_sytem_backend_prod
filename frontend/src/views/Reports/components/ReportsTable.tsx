import { useEffect } from "react";
import { ReportI, ReportResI, ReportsResI } from "../../../helpers";
import { ReportsColumns } from "./ReportsColumns";

interface Props{
  data:ReportsResI | undefined
}

export const ReportsTable = ({data}:Props) => {
  return (
    <table>
      <ReportsColumns/>
      <tbody>
      { 
        data?.message.map((report) => {
            return <tr key={report.id}>
              <td>{report.createdAt}</td>
              <td>{report.createdAt}</td>
              <td>{report.event}</td>
              <td>{report.userName}</td>
            </tr>
        })
      }
      </tbody>
    </table>
  )
}