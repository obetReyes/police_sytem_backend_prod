import { useContext } from "react";
import { UserContext } from "../contexts";
import { Routes, Route } from "react-router-dom";
import { NotFoundPage, ReportsPage, SignInPage, SingUpPage } from "../views";
export const AppRouter = () => {
  const {user, role} = useContext(UserContext);
  return (
    <Routes> 
    {user  ? 
    <>
       <Route path="/" element={  <ReportsPage />} />
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
