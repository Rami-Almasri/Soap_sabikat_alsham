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
import Signup from "./Login_signup/signup";
import Login from "./Login_signup/Login";
import ProductDetails from "./Cart/ProductDetails";
import CartPage from "./Cart/CartPage";
import OrdersPage from "./OrdersPage";
import OrderDetailsPage from "./OrderDetailsPage";
import AdminOrdersPage from "./AdminOrdersPage";
import Favorite from "./Favorite";

function Layout() {
  return (
    <>
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
        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/cart" element={<CartPage />} />
        <Route path="/shop/all" element={<Shop />} />
        <Route path="/Dashpoard" element={<Dashpoard />} />
        <Route path="/dashboard/:type" element={<DashpoardDetail />} />

        <Route path="/myorders" element={<OrdersPage />} />

        <Route path="/order/:id" element={<OrderDetailsPage />} />
        <Route path="/orders" element={<AdminOrdersPage />} />
        <Route path="/favorites" element={<Favorite />} />
      </Routes>

      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<Layout />} />
    </Routes>
  );
}

export default App;
