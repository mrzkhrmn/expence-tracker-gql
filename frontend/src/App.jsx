import "./App.css";
import { SignUpPage } from "./pages/SignUpPage";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { TransactionPage } from "./pages/TransactionPage";
import { LoginPage } from "./pages/LoginPage";
import { Header } from "./components/Header";

function App() {
  const authUser = true;

  return (
    <>
      {authUser && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/transaction/:id" element={<TransactionPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
