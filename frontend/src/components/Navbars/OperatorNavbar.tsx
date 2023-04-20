import React from "react";
import { BtnMyLocation } from "../BtnLocation";
import { Link } from "react-router-dom";
import { NavbarLayout } from "./NavbarLayout";
export const OperatorNavbar = () => {
  return (
    <NavbarLayout>
        <div className="navbar-start gap-3">
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
     
    </NavbarLayout>
  );
};
