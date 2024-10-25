import axios from "axios";

const API_URL = "http://127.0.0.1:8002/api";

export const login = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/login/`, {
    username,
    password,
  });
  return response.data;
};

export const refreshToken = async (refreshToken: string) => {
  try {
    const response = await axios.post(`${API_URL}/token/refresh/`, {
      refresh: refreshToken,
    });
    return response.data.access;
  } catch (error) {
    throw error;
  }
};

export const register = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(`${API_URL}/register/`, {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const isAuthenticated = (accessToken: string | null) => {
  return !!accessToken;
};

export const createPost = async (
  accessToken: string,
  postData: { title: string; content: string; category: string }
) => {
  try {
    const response = await axios.post(`${API_URL}/posts/`, postData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Post creation error:", error);
    throw error;
  }
};

export const addCategory = async (
  accessToken: string,
  categoryName: string
) => {
  try {
    const response = await axios.post(
      `${API_URL}/categories/`,
      { name: categoryName },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Category creation error:", error);
    throw error;
  }
};

export const getCategories = async (accessToken: string) => {
  try {
    const response = await axios.get(`${API_URL}/categories/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getPosts = async (
  accessToken: string,
  page = 1,
  pageSize = 5,
  sortField: string = "date",
  sortDirection: "asc" | "desc" = "desc",
  searchTerm: string = "",
  category: string = "",
  startDate: string | null = null,
  endDate: string | null = null
) => {
  try {
    let url = `${API_URL}/posts/?page=${page}&page_size=${pageSize}&ordering=${
      sortDirection === "desc" ? "-" : ""
    }${sortField}&search=${searchTerm}&category=${category}`;

    if (startDate) url += `&start_date=${startDate}`;
    if (endDate) url += `&end_date=${endDate}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const getComments = async (accessToken: string, postId: number) => {
  try {
    const response = await axios.get(`${API_URL}/comments/?post=${postId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("댓글 가져오기 오류:", error);
    throw error;
  }
};

export const createComment = async (
  accessToken: string,
  postId: number,
  content: string,
  parentId: number | null = null
) => {
  try {
    const response = await axios.post(
      `${API_URL}/comments/`,
      { post: postId, content, parent: parentId },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("댓글 작성 오류:", error);
    throw error;
  }
};
