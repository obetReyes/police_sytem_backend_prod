import jwt_decode from "jwt-decode";
import { DecodedI } from "../helpers";
import { useContext } from "react";
import { UserContext } from "../contexts";
export const useUsername = () => {
    const {token} = useContext(UserContext)
    const decoded:DecodedI = jwt_decode(token);
    const username = decoded.info.username;
    return {
        username
    }
}