import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const userToken = localStorage.getItem("token")
 return (
  <BrowserRouter>
<Routes>
{
  userToken && 
<Route path="/:user" element={<HomePage/>}  />
}
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
</Routes>
</BrowserRouter>
 ) 
}
export default App;