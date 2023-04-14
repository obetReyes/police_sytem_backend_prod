import { useContext } from "react";
import { UserContext } from "../contexts";
import { Routes, Route } from "react-router-dom";
import { MapPage, NotFoundPage, AllReportsPage, SignInPage, SingUpPage } from "../views";
export const AppRouter = () => {
  const {user, role} = useContext(UserContext);
  return (
    <Routes> 
    {user  ? 
    <>
      <Route path="/" element={<MapPage/>} />
       <Route path="/reportes" element={  <AllReportsPage />} />
       
    </>
      :
      <>
    <Route path='/' element={<SignInPage/>} />
    <Route path='/crear/operador' element={<SingUpPage/>} />
    </>
    }
     <Route path="*" element={<NotFoundPage/>} /> 
    </Routes>
  )
}
