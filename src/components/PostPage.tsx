import React from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import SearchBar from "./SearchBar";
import DateRangeFilter from "./DateRangeFilter";
import CreatePostModal from "./CreatePostModal";
import CategoryFilter from "./CategoryFilter";
import PostsPerPageSelector from "./PostsPerPageSelector";
import PostList from "./PostList";
import Pagination from "./Pagination";
import PostDetail from "./PostDetail";
import CreatePost from "./CreatePost";
import { useAppState } from "../hooks/useAppState";
import { useAuth } from "../contexts/AuthContext";
import { handleAddCategory, handleAddComment } from "../utils/handlers";

const PostPage: React.FC = () => {
  const { state } = useAuth();
  const appState = useAppState();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const totalPages = Math.ceil(
    appState.postsState.count / appState.postsPerPage
  );

  if (id) {
    return (
      <PostDetail
        posts={appState.postsState.results}
        comments={appState.comments}
        onAddComment={(comment) =>
          handleAddComment(appState.comments, appState.setComments, comment)
        }
      />
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <SearchBar
              searchTerm={appState.searchTerm}
              onSearchChange={appState.handleSearch}
            />
            <DateRangeFilter
              onDateRangeChange={appState.handleDateRangeChange}
            />
            <button
              onClick={() => navigate("create")}
              className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              새 글 작성
            </button>
            <CreatePostModal
              isOpen={appState.isCreatePostModalOpen}
              onClose={() => appState.setIsCreatePostModalOpen(false)}
              categories={appState.categories}
              onAddCategory={(categoryName) =>
                handleAddCategory(
                  state.accessToken!,
                  categoryName,
                  appState.fetchCategories
                )
              }
              onAddPost={(newPost) => {
                appState.setPostsState((prev) => ({
                  ...prev,
                  results: [newPost, ...prev.results],
                  count: prev.count + 1,
                }));
              }}
            />
            <CategoryFilter
              categories={appState.categories}
              selectedCategory={appState.categoryFilter}
              onCategoryChange={appState.handleCategoryChange}
            />
            <PostsPerPageSelector
              postsPerPage={appState.postsPerPage}
              onPostsPerPageChange={appState.setPostsPerPage}
            />
            <PostList
              posts={appState.postsState.results}
              sortField={appState.sortField}
              sortDirection={appState.sortDirection}
              onSort={appState.handleSort}
            />
            <Pagination
              currentPage={appState.postsState.currentPage}
              totalPages={totalPages}
              onPageChange={appState.handlePageChange}
            />
          </>
        }
      />
      <Route
        path="create"
        element={
          <CreatePost
            categories={appState.categories}
            onAddCategory={(categoryName) =>
              handleAddCategory(
                state.accessToken!,
                categoryName,
                appState.fetchCategories
              )
            }
            onAddPost={(newPost) => {
              appState.setPostsState((prev) => ({
                ...prev,
                results: [newPost, ...prev.results],
                count: prev.count + 1,
              }));
              navigate("/posts");
            }}
            onClose={() => navigate("/posts")}
          />
        }
      />
    </Routes>
  );
};

export default PostPage;
