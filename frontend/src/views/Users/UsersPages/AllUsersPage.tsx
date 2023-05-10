import { TablesLayout, Pagination } from "../../../components";
import { Outlet } from "react-router-dom";
import { UsersModal } from "../components/UsersModal";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../contexts";
import { UsersTable } from "../components/UsersTable";
import {useRecords, useSearchRecords} from "../../../hooks"
import {  UsersResI } from "../../../helpers";
import { useForm } from "react-hook-form";

export const AllUsersPage = () => {
  const {role} = useContext(UserContext);
  const {
    currentPage: currentPageAll,
    setCurrentPage: setCurrentPageAll,
    recordsQuery,
    limit:limitRecords,
    setLimit:setLimitRecords
  } = useRecords<UsersResI>("users");

  const {
    param,
    searchRecordsQuery,
    currentPage: currentPageSearch,
    setCurrentPage: setCurrentPageSearch,
    setParam,
    limit:limitSearch,
    setLimit:SetLimitSearch
  } = useSearchRecords<UsersResI>("users", "FoundUsers");

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

  const paramHandler = () => {
    if( Object.keys(param).length > 0){
      return true
    }
  };
  
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
    UsersModal,
  ]);
  return (
    <TablesLayout roles={["OPERATOR", "DISPATCHER"]}>
       <h1 className='fixed left-6 font-semibold text-2xl text-warning top-4'>Agentes</h1>
       <Outlet/>
      <div className="h-20 my-2 flex justify-around md:w-10/12 lg:w-8/12 items-center">
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
            <option value="agents">agente</option>
          </select>
          {paramHandler() ? (
            <button className="btn btn-outline" onClick={clearSearch}>
              eliminar busqueda
            </button>
          ) : (
            <input className="btn btn-outline" type="submit" value="buscar" />
          )}
        </form>
       {role == "OPERATOR" && <UsersModal/>}  
      </div>
      <div className="md:w-10/12 lg:w-8/12">
      <UsersTable query={filtered} />
        <Pagination
          currentPage={
            Object.keys(param).length > 0 ? currentPageSearch : currentPageAll
          }
          setCurrentPage={
            Object.keys(param).length > 0
              ? setCurrentPageSearch
              : setCurrentPageAll
          }
          limit={  Object.keys(param).length > 0
            ? limitSearch
            : limitRecords
          }
          setLimit={Object.keys(param).length > 0
          ? SetLimitSearch : setLimitRecords}
          query={filtered}
        />
      </div>
    </TablesLayout>
  );
};
