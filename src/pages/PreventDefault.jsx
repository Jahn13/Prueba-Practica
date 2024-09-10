import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PreventDefault = () => {
    const navigate = useNavigate();
    const login = localStorage.getItem("login");
  
    useEffect(() => {
      if (!login) {
        navigate("/login");
      }
    }, []);
    return <h1 className='text-center'>Not Found 404</h1>;
  };
  

export {PreventDefault};