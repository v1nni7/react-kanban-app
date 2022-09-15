import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./assets/scss/reset.scss";
import "./assets/scss/styles.scss";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar/Navbar";
import PrivateRoute from "./components/Private/PrivateRoute";
import AuthContextProvider from "./hooks/context/AuthContext";
import BoardContextProvider from "./hooks/context/BoardContext";
import { Home, Boards, Login, SignUp, Workspace } from "./pages";
import GlobalStyles from "./assets/styles/Global";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        {/* <Navbar /> */}
        <AuthContextProvider>
          <BoardContextProvider>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/boards"
                element={
                  <PrivateRoute>
                    <Boards />
                  </PrivateRoute>
                }
              />
              <Route
                path="/workspace/:idWorkspace"
                element={
                  <PrivateRoute>
                    <Workspace />
                  </PrivateRoute>
                }
              />
              {/* <Route path="/testes" element={<Test />} /> */}
            </Routes>
          </BoardContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
