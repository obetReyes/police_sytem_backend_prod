import { UseQueryResult } from "@tanstack/react-query";
import { ReportsResI } from "../helpers";

interface Props{
    currentPage:number
    setCurrentPage:React.Dispatch<React.SetStateAction<number>>
    query:UseQueryResult<any, unknown>
}
export const Pagination = ({currentPage, setCurrentPage, query}:Props) => {


  const nextPage = () => {
    setCurrentPage(currentPage + 20);
    console.log(currentPage)
  };

  const previousPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 20);
  };
  return (
    <div className="flex justify-center gap-4 my-2">
      <button className="btn" onClick={previousPage} disabled={query.isPreviousData || currentPage <= 20}>
        Pagina Anterior
      </button>
      <button className="btn" onClick={nextPage} disabled={query.isPreviousData || currentPage + 20  >= query.data?.records! }>
        Pagina Siguiente
      </button>
    </div>
  );
};
