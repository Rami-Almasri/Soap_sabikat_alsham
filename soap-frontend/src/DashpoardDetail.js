import { useParams } from "react-router-dom";

import ProductsPage from "./Products";
import CategoriesPage from "./Categories";
import UsersPage from "./Users";
import AdminOrdersPage from "./AdminOrdersPage";

export default function DashpoardDetail() {
  var { type } = useParams();
  if (type === "products") {
    return <ProductsPage />;
  }
  if (type === "categories") {
    return <CategoriesPage />;
  }
  if (type === "users") {
    return <UsersPage />;
  }
  if (type === "orders") {
    return <AdminOrdersPage />;
  }
  return <div>{type}</div>;
}
