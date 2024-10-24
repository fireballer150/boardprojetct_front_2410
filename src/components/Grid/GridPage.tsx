import React, { useEffect } from "react";
import PostGrid from "./PostGrid";
import { useAppState } from "../../hooks/useAppState";
import { Post } from "../../types";

const GridPage: React.FC = () => {
  const appState = useAppState();

  useEffect(() => {
    appState.fetchPosts();
  }, []);

  useEffect(() => {
    console.log("Posts in GridPage:", appState.postsState.results);
  }, [appState.postsState.results]);

  const handleSort = (columnKey: string, direction: "ASC" | "DESC") => {
    appState.handleSort(
      columnKey as keyof Post,
      direction.toLowerCase() as "asc" | "desc"
    );
  };

  return (
    <div className="h-[calc(100vh-200px)]">
      <h2 className="text-2xl font-bold mb-4">게시판 그리드</h2>
      <PostGrid posts={appState.postsState.results} onSort={handleSort} />
    </div>
  );
};

export default GridPage;
