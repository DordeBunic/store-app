import { Outlet } from "react-router";
import { AuthWatcher } from "@/app/providers/AuthWatcher";
import Footer from "@shared/layout/Footer";
import Logo from "@shared/components/Logo";
import { PRE_LOGIN_PAGES } from "@shared/constants/pageRoutes";

export default function PreLoginLayout() {
  return (
    <div className="bg-main full-height flex flex-row justify-content-space-between gap-8">
      <AuthWatcher />
      <div className="p-3 flex flex-row align-items-center bg-subtile">
        <Logo link={PRE_LOGIN_PAGES.HOME_PAGE}/>
      </div>
      <Outlet />
      <Footer />
    </div>
  );
}
