import React from "react";
import { BtnMyLocation } from "../BtnLocation";
import { Link } from "react-router-dom";
export const DispatcherNavbar = () => {
  return (
    <div className="w-full fixed bottom-4 z-50">
      <div className="navbar  bg-base-300 font-medium   md:w-10/12 lg:w-8/12 mx-auto  rounded-xl shadow-lg">
        <div className="navbar-start gap-3">
          
          <a className="btn  text-warning">crear sumario</a>
          <BtnMyLocation/>
        </div>
        <div className="navbar-center flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Mapa</Link>
            </li>

            <li>
              <Link to="/sumarios" className="focus:bg-base-300 active:bg-base-300 ">
                sumarios
              </Link>
            </li>
            <li>
              <Link to="/reportes" className="focus:bg-base-300 active:bg-base-300 ">
                reportes
              </Link>
            </li>
            <li>
            <Link to="/grupos" className="focus:bg-base-300 active:bg-base-300 ">
                grupos
              </Link>
            </li>
            <li>
              <Link to="/agentes" className="focus:bg-base-300 active:bg-base-300 ">
                agentes
              </Link>
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
