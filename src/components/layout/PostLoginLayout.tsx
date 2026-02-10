import { Outlet } from "react-router";
import NavBar from "@/components/NavBar";
import { AuthWatcher } from "@/components/AuthWatcher";
import Footer from "@/components/Footer";

export default function PostLoginLayout() {
  return (
    <div className="bg-main full-height flex flex-row justify-content-space-between gap-8">
      <div>
        <AuthWatcher />
        <NavBar />
        <div className="px-2 py-3 flex justify-content-center">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}
