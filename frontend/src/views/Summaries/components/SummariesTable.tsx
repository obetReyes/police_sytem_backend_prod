import { UseQueryResult } from "@tanstack/react-query";
import { customDate, customHour, SummariesResI } from "../../../helpers";
import { SummariesColumns } from "./SummariesColumns";
import { Link } from "react-router-dom";
interface Props{
  query: UseQueryResult<SummariesResI, unknown>
}
export const SummariesTable = ({query}:Props) => {
  return (
    <table className="table table-zebra w-full">
      <SummariesColumns/>
      <tbody>
        {query.isLoading && <div className="loader"></div>}
        {query.isError ?  <tr>
          <p>{`${query.error}`}</p>
          <td colSpan={100}>{`${query.error}`}</td>
          </tr>
          :
        
           query.data?.message.map((summarie) => {
            const eventSummary = summarie.incident.substring(0,40);
              return <tr key={summarie.id}>
                <td>{customDate(summarie.createdAt)}</td>
                <td>{customHour(summarie.createdAt)}</td>
                <td>{eventSummary} ...</td>
                <td>{summarie.userName}</td>
                <td>
                  <Link className="btn btn-outline btn-sm" to={`/sumarios/${summarie.id}`}>
                  ver sumario
                  </Link>
                  </td>
              </tr>
          })
        }
      </tbody>
    </table>
  )
}
