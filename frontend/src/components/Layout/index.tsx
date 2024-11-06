import React, { ReactNode } from "react";
import SideBar from "../Chat/SideBar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <SideBar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
