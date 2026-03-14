import Middlebar from "./middlebar";
import Sidebar from "./Sidebar";

export default function Dashpoard() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar style={{ display: "flex" }} />
      <Middlebar />
    </div>
  );
}
