import "./App.css";
import { SignUpPage } from "./pages/SignUpPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { TransactionPage } from "./pages/TransactionPage";
import { LoginPage } from "./pages/LoginPage";
import { Header } from "./components/Header";
import { GET_AUTHENTICATED_USER } from "./graphql/queries/user.query";
import { useQuery } from "@apollo/client";
import { Toaster } from "react-hot-toast";
import { AuthProtectedRoute } from "./components/AuthProtectedRoute";

function App() {
  const { loading, data, error } = useQuery(GET_AUTHENTICATED_USER);

  console.log("Authenticated user: " + data);

  return (
    <>
      {data?.authUser && <Header />}
      <Routes>
        <Route
          path="/"
          element={data?.authUser ? <HomePage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/transaction/:id"
          element={
            data?.authUser ? <TransactionPage /> : <Navigate to={"/login"} />
          }
        />
        <Route
          path="/signup"
          element={data?.authUser ? <Navigate to={"/"} /> : <SignUpPage />}
        />
        <Route
          path="/login"
          element={data?.authUser ? <Navigate to={"/"} /> : <LoginPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
