import React from "react";


export const GroupsModal = () => {
  // common styles
  const inputStyles =
    "w-full rounded-lg rounded-sm border-gray-300 p-4 pr-12 text-sm text-warning shadow-sm focus:border-zinc-800 focus:ring-transparent";
  const errorStyles = "absolute  text-sm  text-error font-semibold underline";

  return (
    <>
      <label htmlFor="myModalGroups" className="btn">
        crear grupo
      </label>

      <input type="checkbox" id="myModalGroups" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative">
          <label
            htmlFor="myModalGroups"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg">Nuevo Grupo</h3>
          <form>

            <div className="pb-4">
              <label htmlFor="groupNameInput" className="sr-only">
                Nombre Del Grupo
              </label>

              <div className="relative">
                <input
                  type="text"
                  id="groupNameInput"
                  className={inputStyles}
                  placeholder="Nombre Del Grupo"
                  autoComplete="off"
                  //register goes here
                />
              </div>
            </div>

            <div className="pb-4">
              <label htmlFor="operationsAreaInput" className="sr-only">
                Area de Operaciones
              </label>

              <div className="relative">
                <input
                type="text"
                  id="operationsAreaInput"
                  className={inputStyles}
                  placeholder="Area de Operaciones"
                  autoComplete="off"
                  //register goes here
                />
              </div>
            </div>
            <input type='submit' className='btn float-right' value="crear Grupo"></input>
          </form>
        </div>
      </div>
    </>
  );
};
