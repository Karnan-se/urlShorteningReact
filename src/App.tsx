import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HeroUIProvider } from "@heroui/system";
import Login from "./pages/login";
import { Toaster, } from "sonner"
import { Provider as ReduxStoreProvider } from "react-redux";
import store from "./features/stores/store";
import UserPrivateRoute from "./components/protectedRoute";
import UserRegister from "./pages/register";
import Dashboard from "./pages/dashboard";
import StatsProvider from "./components/context";

function App() {


  return (
    <>
      <Toaster richColors position="bottom-center" />
      <ReduxStoreProvider store={store}>
        <HeroUIProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<UserRegister />}></Route>

              <Route element={<UserPrivateRoute />}>
                <Route path="/" element={ <StatsProvider> <Dashboard />  </StatsProvider>  }></Route>
              </Route>

            </Routes>

          </Router>
        </HeroUIProvider>
      </ReduxStoreProvider>
    </>
  )
}

export default App
