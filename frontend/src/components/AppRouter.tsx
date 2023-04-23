import { useContext } from "react";
import { UserContext } from "../contexts";
import { Routes, Route } from "react-router-dom";
import { MapPage, NotFoundPage, AllReportsPage, SignInPage, SingUpPage,ReportPage, AllSummariesPage, SummariePage, AllUsersPage, UserPage, AllGroupsPage, GroupPage } from "../views";
export const AppRouter = () => {
  const {user, role} = useContext(UserContext);
  return (
    <Routes> 
    {user  ? 
    <>
      <Route path="/" element={<MapPage/>} />
      <Route path="/reportes" element={  <AllReportsPage />} />
      <Route path="/reportes/:reporteId" element={  <ReportPage />} />
      <Route path="/sumarios" element={<AllSummariesPage/>} />
      <Route path="/sumarios/:sumarioId" element={<SummariePage/>} />
      <Route path="/grupos" element={<AllGroupsPage/>} />
      <Route path="/grupos/:grupo" element={<GroupPage/>} />
      <Route path="/agentes" element={<AllUsersPage/>} />
      <Route path="/agentes/:agente" element={<UserPage/>} />
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
