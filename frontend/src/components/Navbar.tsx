import React from "react";

export const Navbar = () => {
  return (
    <div className="w-full fixed bottom-4 z-50">
      <div className="navbar  bg-base-300 font-medium   md:w-10/12 lg:w-8/12 mx-auto  rounded-xl shadow-lg">
        <div className="navbar-start">
          <a className="btn  text-warning">crear reporte</a>
        </div>
        <div className="navbar-center flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Mapa</a>
            </li>

            <li>
              <a className="focus:bg-base-300 active:bg-base-300 ">
                mis Reportes
              </a>
            </li>
            <li>
              <a className="focus:bg-base-300 active:bg-base-300">Grupo</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn">salir</a>
        </div>
      </div>
    </div>
  );
};
