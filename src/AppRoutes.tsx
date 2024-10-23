import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import PostList from "./components/PostList";
import Pagination from "./components/Pagination";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import PostDetail from "./components/PostDetail";
import Login from "./components/Login";
import Register from "./components/Register";
import CreatePost from "./components/CreatePost";
import MyPage from "./components/MyPage";
import Layout from "./components/Layout";
import { useAuth } from "./contexts/AuthContext";
import { isAuthenticated } from "./utils/auth";
import CreatePostModal from "./components/CreatePostModal";
import PostsPerPageSelector from "./components/PostsPerPageSelector";
import { useAppState } from "./hooks/useAppState";
import {
  handleLogin,
  handleRegister,
  handleAddCategory,
  handleAddComment,
  handleAddPost,
} from "./utils/handlers";

function AppRoutes() {
  const { state, dispatch } = useAuth();
  const appState = useAppState();

  const totalPages = Math.ceil(
    appState.postsState.count / appState.postsPerPage
  );

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <Login
            onLogin={(username, password) =>
              handleLogin(username, password, dispatch)
            }
          />
        }
      />
      <Route
        path="/register"
        element={
          <Register
            onRegister={(username, email, password) =>
              handleRegister(username, email, password, dispatch)
            }
          />
        }
      />
      <Route
        path="/"
        element={
          isAuthenticated(state.accessToken) ? (
            <Layout>
              <Home />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/posts"
        element={
          isAuthenticated(state.accessToken) ? (
            <Layout>
              <SearchBar
                searchTerm={appState.searchTerm}
                onSearchChange={appState.handleSearch}
              />
              <button
                onClick={() => appState.setIsCreatePostModalOpen(true)}
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
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/post/:id"
        element={
          isAuthenticated(state.accessToken) ? (
            <Layout>
              <PostDetail
                posts={appState.postsState.results}
                comments={appState.comments}
                onAddComment={(comment) =>
                  handleAddComment(
                    appState.comments,
                    appState.setComments,
                    comment
                  )
                }
              />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/create-post"
        element={
          isAuthenticated(state.accessToken) ? (
            <Layout>
              <CreatePost
                categories={appState.categories}
                onAddCategory={(categoryName) =>
                  handleAddCategory(
                    state.accessToken!,
                    categoryName,
                    appState.fetchCategories
                  )
                }
                onAddPost={(newPost) =>
                  handleAddPost(appState.posts, appState.setPosts, newPost)
                }
                onClose={() => appState.setIsCreatePostModalOpen(false)}
              />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/mypage"
        element={
          isAuthenticated(state.accessToken) ? (
            <Layout>
              <MyPage />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}

export default AppRoutes;
