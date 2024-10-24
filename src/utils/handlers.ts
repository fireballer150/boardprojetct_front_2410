import { login, register, addCategory } from "./auth";
import { Post, Comment } from "../types";

export const handleLogin = async (
  username: string,
  password: string,
  dispatch: any
) => {
  try {
    const { access, refresh, user } = await login(username, password);
    dispatch({
      type: "SET_TOKENS",
      payload: { accessToken: access, refreshToken: refresh, user: user },
    });
    dispatch({
      type: "SET_USER",
      payload: { user: user },
    });
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
};

export const handleRegister = async (
  username: string,
  email: string,
  password: string,
  dispatch: any
) => {
  try {
    const { access, refresh } = await register(username, email, password);
    dispatch({
      type: "SET_TOKENS",
      payload: { accessToken: access, refreshToken: refresh },
    });
  } catch (error) {
    console.error("Registration failed", error);
    throw error;
  }
};

export const handleAddCategory = async (
  accessToken: string,
  categoryName: string,
  fetchCategories: () => Promise<void>
) => {
  try {
    await addCategory(accessToken, categoryName);
    await fetchCategories();
  } catch (error) {
    console.error("Category addition failed", error);
    throw error;
  }
};

export const handleAddComment = (
  comments: Comment[],
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
  newComment: Omit<Comment, "id" | "date">
) => {
  const commentWithIdAndDate: Comment = {
    ...newComment,
    id: comments.length + 1,
    date: new Date().toISOString().split("T")[0],
  };
  setComments([...comments, commentWithIdAndDate]);
};

export const handleAddPost = (
  posts: Post[],
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>,
  newPost: Post
) => {
  setPosts([newPost, ...posts]);
};
