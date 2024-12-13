import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import CartPages from "./pages/CartPages";
import Layout from "./app/Layouts/Layout";
import DetailsPage from "./pages/DetailsPages";
import AdminPages from "./pages/AdminPages";


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/cart" element={<CartPages />} />
          <Route path="/product/:productId" element={<DetailsPage />} />
          <Route path="/admin/*" element={<AdminPages/>}/>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
