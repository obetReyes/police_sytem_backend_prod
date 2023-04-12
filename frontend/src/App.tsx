import { AppRouter } from "./components"
import {BrowserRouter} from "react-router-dom"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "./contexts";
function App() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <ReactQueryDevtools/>
    <BrowserRouter>
    <UserProvider>
    <AppRouter/>
    </UserProvider>
    </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
