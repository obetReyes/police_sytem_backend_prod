
import  {useContext, } from "react"
import { MapView } from "../components/Map"
import { ProtectedLayout } from "../../../components/ProtectedLayout"
import { UserContext } from "../../../contexts"
import { useAxiosPrivate } from "../../../hooks/useAxiosPrivate"
import { BtnMyLocation } from "../components/LocationBtn"

/*
const socket = io("http://localhost:8000",{
  auth:{
    token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbmZvIjp7InVzZXJuYW1lIjoidGVzdE9wZXJhdG9yMSIsInJvbGUiOiJPUEVSQVRPUiJ9LCJpYXQiOjE2Nzk1MDc4MzcsImV4cCI6MTY3OTUxMTQzN30.Q2Yvwk7xDczQi2W44QH6nmlVb_RqLC--JedLQtrDvFA"
  }
});
socket.on("connect", () => {
  // ...
  console.log("conectaod")
});
socket.on("disconnect", () => {
  console.log("desconectado"); // undefined
});
socket.on("connect_error", (err) => {
  console.log("bearer fallo")
})
*/
export const MapPage = () => {

  /* const [isConnected, setIsConnected] = useState(socket.connected); */
  const {token}  = useContext(UserContext)
  const axiosPrivate = useAxiosPrivate();

  return (
    <ProtectedLayout roles={["OPERATOR","OFFICER", "DISPATCHER"]}>
        <main className="overflow-hidden w-full h-screen">
         
        <MapView/>
        <BtnMyLocation/>   


    
        </main>
      
    </ProtectedLayout>
  )
}