import { customDate, customHour, SummariesResI } from "../../../helpers";
import { SummariesColumns } from "./SummariesColumns";
import { Link } from "react-router-dom";
interface Props{
  data: SummariesResI | undefined
}
export const SummariesTable = ({data}:Props) => {
  return (
    <table className="table table-zebra w-full">
      <SummariesColumns/>
      <tbody>
        {
           data?.message.map((summarie) => {
            const eventSummary = summarie.incident.substring(0,40);
              return <tr key={summarie.id}>
                <td>{customDate(summarie.createdAt)}</td>
                <td>{customHour(summarie.createdAt)}</td>
                <td>{eventSummary} ...</td>
                <td>{summarie.requestor}</td>
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
