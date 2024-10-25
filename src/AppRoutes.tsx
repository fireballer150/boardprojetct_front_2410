import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import MyPage from "./components/MyPage";
import Layout from "./components/Layout";
import { useAuth } from "./contexts/AuthContext";
import { isAuthenticated } from "./utils/auth";
import GridDetail from "./components/Grid/GridDetail";
import GridPage from "./components/Grid/GridPage";
import PostPage from "./components/PostPage";
import { handleLogin, handleRegister } from "./utils/handlers";

function AppRoutes() {
  const { state, dispatch } = useAuth();

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
        path="/posts/*"
        element={
          isAuthenticated(state.accessToken) ? (
            <Layout>
              <PostPage />
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
              <PostPage />
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
      <Route
        path="/grids"
        element={
          isAuthenticated(state.accessToken) ? (
            <Layout>
              <GridPage />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/grid/:id"
        element={
          isAuthenticated(state.accessToken) ? (
            <Layout>
              <GridDetail />
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
