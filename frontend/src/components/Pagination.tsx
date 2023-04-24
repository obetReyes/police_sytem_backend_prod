import { useEffect } from "react";
import { UseQueryResult } from "@tanstack/react-query";

interface Props{
    currentPage:number
    setCurrentPage:React.Dispatch<React.SetStateAction<number>>
    query:UseQueryResult<any, unknown>
}
export const Pagination = ({currentPage, setCurrentPage, query}:Props) => {

  useEffect(() => {
    const storedPage = localStorage.getItem("currentPage");
    if (storedPage) {
      setCurrentPage(Number(storedPage));
    }
  }, []);


  const nextPage = () => {
    setCurrentPage(currentPage + 20);
    localStorage.setItem("currentPage", String(currentPage + 20));
  };

  const previousPage = () => {
    if (currentPage > 0) 
    {
      setCurrentPage(currentPage - 20)
      localStorage.setItem("currentPage", String(currentPage - 20));
    };
    
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
