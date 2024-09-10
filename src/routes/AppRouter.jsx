import { Route, Routes, useNavigate } from "react-router-dom";
import { Login } from "../container/login";
import { ProductContext } from "../context";
import { PreventDefault } from "../pages/PreventDefault";
import { Register } from "../container/login/register";
import { Home } from "../container/home";
import { useContext } from "react";

const AppRouter = () => {
  const { getTokenFromLocalStorage } = useContext(ProductContext);

  const user = getTokenFromLocalStorage();
  const url = localStorage.getItem("url");

  return (
    <>
      <Routes>
        {!user ? (
          <>
            <Route index path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={<PreventDefault />} />
          </>
        ) : (
          <>
            <Route index path={`/${url}`} element={<Home />} />
            <Route path="/*" element={<PreventDefault />} />
          </>
        )}
      </Routes>
    </>
  );
};

export { AppRouter };
