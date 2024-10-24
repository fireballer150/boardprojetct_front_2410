import React from "react";
import { useAuth } from "../contexts/AuthContext";

const Home: React.FC = () => {
  const { state } = useAuth();
  console.log(state);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">홈</h1>
      <p>
        {state.user?.username}님, 환영합니다! 사이드바에서 원하는 메뉴를
        선택해주세요.
      </p>
    </div>
  );
};

export default Home;
