import React from "react";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <div
      className={`bg-gray-800 text-white w-64 min-h-screen ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="p-4">
        <h2 className="text-2xl font-semibold">메뉴</h2>
        <nav className="mt-8">
          <ul className="space-y-2">
            <li>
              <Link to="/" className="block py-2 px-4 hover:bg-gray-700">
                홈
              </Link>
            </li>
            <li>
              <Link to="/posts" className="block py-2 px-4 hover:bg-gray-700">
                게시판
              </Link>
            </li>
            <li>
              <Link to="/grids" className="block py-2 px-4 hover:bg-gray-700">
                그리드
              </Link>
            </li>
            <li>
              <Link to="/mypage" className="block py-2 px-4 hover:bg-gray-700">
                마이페이지
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
