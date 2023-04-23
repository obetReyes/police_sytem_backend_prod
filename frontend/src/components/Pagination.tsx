import { UseQueryResult } from "@tanstack/react-query";
import { ReportsResI } from "../helpers";

interface Props{
    currentPage:number
    setCurrentPage:React.Dispatch<React.SetStateAction<number>>
    query:UseQueryResult<ReportsResI, unknown>
}
export const Pagination = ({currentPage, setCurrentPage, query}:Props) => {


  const nextPage = () => {
    setCurrentPage(currentPage + 10);
  };

  const previousPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 10);
  };
  return (
    <div className="flex justify-center gap-4 my-2">
      <button className="btn" onClick={previousPage} disabled={query.isPreviousData || currentPage <= 10}>
        Pagina Anterior
      </button>
      <button className="btn" onClick={nextPage} disabled={ query.data?.message == undefined || query.data.message.length < 1}>
        Pagina Siguiente
      </button>
    </div>
  );
};
