import axios from "axios";

const Instance = axios.create({
    baseURL : 'https://candidates-exam.herokuapp.com/api/v1/',
    headers: { 
      "Content-Type": "application/json",
      timeout : 1000,
    }, 
  });
  
export { Instance };