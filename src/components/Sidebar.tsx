import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">메뉴</h2>
      <ul>
        <li className="mb-2">
          <Link to="/posts" className="hover:text-gray-300">
            게시판
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/mypage" className="hover:text-gray-300">
            마이페이지
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
