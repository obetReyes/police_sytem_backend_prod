import { useState } from "react";

interface Props{
    currentPage:number
    setCurrentPage:React.Dispatch<React.SetStateAction<number>>
}
export const Pagination = ({currentPage, setCurrentPage}:Props) => {


  const nextPage = () => {
    setCurrentPage(currentPage + 10);
  };

  const previousPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 10);
  };
  return (
    <div className="flex justify-center gap-4 my-2">
      <button className="btn" onClick={previousPage}>
        Pagina Anterior
      </button>
      <button className="btn" onClick={nextPage}>
        Pagina Siguiente
      </button>
    </div>
  );
};
