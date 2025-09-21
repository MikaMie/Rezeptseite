import { Outlet } from "react-router-dom";
import NavBar from "../navigation/NavBar";

export default function RootLayout() {
  return (
    <div className="flex h-screen">
      <NavBar />
      <div className="flex-1 md:ml-84 overflow-auto mt-10 sm:mt-0">
        <Outlet />
      </div>
    </div>
  );
}
