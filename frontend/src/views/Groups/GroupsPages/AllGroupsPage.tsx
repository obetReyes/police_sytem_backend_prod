import { TablesLayout, Pagination } from '../../../components'
import { Outlet } from 'react-router-dom'
import { GroupsModal } from '../components/GroupsModal'
import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../../contexts'
import { useRecords, useSearchRecords } from '../../../hooks'
import { GroupsResI, DecodedI } from '../../../helpers'
import { useForm } from "react-hook-form";
import jwtDecode from "jwt-decode";
import { GroupsTable } from '../components/GroupsTable'

export const AllGroupsPage = () => {
  const { role, token } = useContext(UserContext);

  const {
    currentPage: currentPageAll,
    setCurrentPage: setCurrentPageAll,
    recordsQuery,
  } = useRecords<GroupsResI>("groups");

  const decoded: DecodedI = jwtDecode(token);
  
  const {
    param,
    searchRecordsQuery,
    currentPage: currentPageSearch,
    setCurrentPage: setCurrentPageSearch,
    setParam,
  } = useSearchRecords<GroupsResI>("groups", "FoundGroups");

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
    GroupsModal,
  ]);

  return (
    <TablesLayout roles={["OPERATOR", "DISPATCHER"]}>
      <h1 className='fixed left-6 font-semibold text-2xl text-warning top-4'>Grupos</h1>
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
          {paramHandler() ? (
            <button className="btn btn-outline" onClick={clearSearch}>
              eliminar busqueda
            </button>
          ) : (
            <input className="btn btn-outline" type="submit" value="buscar" />
          )}
        </form>

        {role == "OPERATOR" && <GroupsModal />}
      </div>
      <div className="md:w-10/12 lg:w-8/12">
        <GroupsTable query={filtered} />
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
  )
}
