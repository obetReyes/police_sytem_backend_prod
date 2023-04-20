
import { BtnMyLocation } from "../BtnLocation";
import { Link } from "react-router-dom";
import { NavbarLayout } from "./NavbarLayout";
import { ReportModal } from "../../views/Reports/components/ReportModal";

export const OfficerNavbar = () => {
  return (
    <NavbarLayout>
        <div className="navbar-start gap-3">
          <ReportModal/>
          <BtnMyLocation/>
        </div>
        <div className="navbar-center flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Mapa</Link>
            </li>

            <li>
              <Link to="/reportes" className="focus:bg-base-300 active:bg-base-300 ">
                mis Reportes
              </Link>
            </li>
          </ul>
        </div>
    </NavbarLayout>
  );
};
