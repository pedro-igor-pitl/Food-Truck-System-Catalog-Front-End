import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./containers/LoginAdmin/AdminLogin";
import DashBoardAdmin from "./containers/DashBoardAdmin";
import NovaCategoria from "./containers/NovaCategoriaAdmin";
import DashBoardCategoria from "./containers/CategoriaAdmin";
import ProdutoAdmin from "./containers/ProdutoAdmin";
export default function App() {
  return (
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/dashboard" element={<DashBoardAdmin />} />
        <Route path="/categoria" element={<NovaCategoria />} />
        <Route path="/dashboard/categoria" element={<DashBoardCategoria />} />
        <Route path="/dashboard/produto" element={<ProdutoAdmin />}/>
      </Routes>
  );
}
console.log("App component rendered");