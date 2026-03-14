import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Features from "./Features";
import Test from "./test";
import { Routes, Route } from "react-router-dom";
import Product from "./Product";
import Test2 from "./Test2";
import Footer from "./Footer";
import FoamCursor from "./FoamCursor";
import Shop from "./Shop";
import Sidebar from "./Sidebar";
import Dashpoard from "./Dashboard";
import DashpoardDetail from "./DashpoardDetail";

function App() {
  return (
    <div>
      <Navbar />
      <FoamCursor />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Features />
              <Test />
              <Test2 />
            </>
          }
        />
        <Route path="/products/:category" element={<Product />} />
        <Route path="/shop/all" element={<Shop />} />
        <Route path="/Dashpoard" element={<Dashpoard />} />
        <Route path="/dashboard/:type" element={<DashpoardDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
