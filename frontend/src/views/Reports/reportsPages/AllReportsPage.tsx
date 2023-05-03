import { Pagination, TablesLayout } from "../../../components";
import { ReportModal } from "../components/ReportModal";
import { ReportsTable } from "../components/ReportsTable";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts";
import { useRecords, useSearchRecords } from "../../../hooks/";
import { DecodedI, ReportsResI } from "../../../helpers";
import { useForm } from "react-hook-form";
import jwtDecode from "jwt-decode";
import { Outlet } from "react-router-dom";

export const AllReportsPage = () => {

  const { role, token } = useContext(UserContext);
  
  const {
    currentPage: currentPageAll,
    setCurrentPage: setCurrentPageAll,
    recordsQuery,
  } = useRecords<ReportsResI>("reports");

  const decoded: DecodedI = jwtDecode(token);
  
  const {
    param,
    searchRecordsQuery,
    currentPage: currentPageSearch,
    setCurrentPage: setCurrentPageSearch,
    setParam,
  } = useSearchRecords<ReportsResI>("reports");


  const { register, handleSubmit, reset } = useForm({
    mode: "onSubmit",
  });

  const [filtered, SetFiltered] = useState(recordsQuery);

  const onSubmit = handleSubmit(async (data, e) => {
    setParam({ [data.param]: data.searchRecords });
  });

  const clearSearch = () => {
    reset();
    setParam({});
    SetFiltered(recordsQuery);
    if (searchRecordsQuery.data?.message.length == 0) {
      SetFiltered(recordsQuery);
    }
  };

  const buttonHandle = () => {
    if (role == "OFFICER" && Object.keys(param).includes("event")) {
      return true;
    }
    if(role !== "OFFICER" && Object.keys(param).length > 0){
      return true
    }
  };

  useEffect(() => {
    if (decoded.info.role == "OFFICER") {
      SetFiltered(searchRecordsQuery);
      setParam({ officer: decoded.info.username });
    }
  }, []);

  useEffect(() => {
    if (Object.keys(param).length > 0) {
      SetFiltered(searchRecordsQuery);
    } else {
      SetFiltered(recordsQuery);
    }
  }, [
    filtered.data,
    param,
    setParam,
    searchRecordsQuery.data,
    recordsQuery.data,
    ReportModal,
  ]);

  return (
    <TablesLayout roles={["OPERATOR", "DISPATCHER", "OFFICER"]}>
      <h1 className="fixed left-6 font-semibold text-2xl text-warning top-4">
        reportes
      </h1>

      <Outlet />

      <div className="h-20 my-6 flex justify-around md:w-10/12 lg:w-8/12 items-center">
        <form className="flex items-center gap-4" onSubmit={onSubmit}>
          <input
            autoComplete="off"
            type="text"
            placeholder="barra de busqueda"
            className="input  text-yellow-400 font-semibold input-bordered mx-auto w-[25rem]"
            {...register("searchRecords")}
            required
            minLength={6}
          />
          <select
            id="param"
            {...register("param")}
            className="select select-bordered "
            name="param"
            required
          >
            {role !== "OFFICER" && <option value="officer">oficial</option>}
            <option value="event">suceso</option>
          </select>
          {buttonHandle() ? (
            <button className="btn btn-outline" onClick={clearSearch}>
              eliminar busqueda
            </button>
          ) : (
            <input className="btn btn-outline" type="submit" value="buscar" />
          )}
        </form>

        {role == "OFFICER" && <ReportModal />}
      </div>
      <div className="md:w-10/12 lg:w-8/12">
        <ReportsTable query={filtered} />
        <Pagination
          currentPage={
            Object.keys(param).length > 0 ? currentPageSearch : currentPageAll
          }
          setCurrentPage={
            Object.keys(param).length > 0
              ? setCurrentPageSearch
              : setCurrentPageAll
          }
          query={filtered}
        />
      </div>
    </TablesLayout>
  );
};
