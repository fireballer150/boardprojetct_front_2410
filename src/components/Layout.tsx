import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={toggleSidebar}
            className="mb-4 p-2 bg-blue-500 text-white rounded-md"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-3xl font-bold mb-8 text-center">
            게시판 애플리케이션
          </h1>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
