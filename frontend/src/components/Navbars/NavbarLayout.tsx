import React, {useContext} from "react";
import { UserContext } from "../../contexts";
import { DecodedI } from "../../helpers";
import jwt_decode from "jwt-decode";
import { useSignOutMutation } from "../../hooks";
interface Props{
    children: JSX.Element | JSX.Element []
}
export const NavbarLayout = ({children}:Props) => {
  const {token} = useContext(UserContext);
  const {mutate} = useSignOutMutation()
  const decoded:DecodedI = jwt_decode(token);
  const user = decoded.info.username;
  
  return (
    <div className="w-full fixed bottom-4 z-50">
      <div className="navbar  bg-base-300 font-medium   md:w-10/12 lg:w-8/12 mx-auto  rounded-xl shadow-lg">
        {children}
        <div className="navbar-end">
          <button className="btn" onClick={() => {mutate()}}>salir</button>
        </div>
      </div>
      
    </div>
  );
};
