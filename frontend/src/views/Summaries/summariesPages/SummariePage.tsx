import { useParams, useNavigate } from "react-router-dom";
import { useSummary } from "../../../hooks";
import { ProtectedLayout } from "../../../components";
import { customDate, customHour } from "../../../helpers";

export const SummariePage = () => {
  const { sumarioId } = useParams();
  const navigate = useNavigate();

  const summaryQuery = useSummary(Number(sumarioId));
  return (
    <ProtectedLayout roles={["OPERATOR", "DISPATCHER"]}>
      <div className="flex items-center justiy-center mi-h-screen">
        <div className=" py-8 w-12/12 prose lg:prose-lg">
          <h1>{`${Number(sumarioId)}`}</h1>
          {summaryQuery.isLoading ? <span className="loader"></span> : null}
          {summaryQuery.isError ? <h1>{`${summaryQuery.error}`}</h1> : null}

          <h1>Incidente {summaryQuery.data?.message.incident}</h1>
          <span className=' underline'>creado el {customDate(summaryQuery.data?.message?.createdAt)} {customHour(summaryQuery.data?.message?.createdAt)}</span>
        
        <p>el sumario de la llamada fue hecho por {summaryQuery.data?.message.username}</p>

        <h2>lugar de los hechos</h2>
        <p>{summaryQuery.data?.message.location}</p>
        <h2>solicitante</h2>
        <p>{summaryQuery.data?.message.requestor}</p>
        <h2></h2>
        <h2>notas</h2>
        <p> {summaryQuery.data?.message.notes}</p>
        </div>
      </div>
    </ProtectedLayout>
  );
};
