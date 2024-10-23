import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Post, Comment, PostsState } from "../types";
import { getCategories, getPosts, isAuthenticated } from "../utils/auth";

export const useAppState = () => {
  const { state } = useAuth();
  const [postsState, setPostsState] = useState<PostsState>({
    count: 0,
    next: null,
    previous: null,
    results: [],
    currentPage: 1,
  });
  const [comments, setComments] = useState<Comment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortField, setSortField] = useState<keyof Post>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [categories, setCategories] = useState<string[]>([]);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const location = useLocation();
  const [postsPerPage, setPostsPerPage] = useState(5);

  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchCategories = async () => {
    try {
      const fetchedCategories = await getCategories(state.accessToken!);
      setCategories(fetchedCategories.map((cat: any) => cat.name));
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const fetchPosts = useCallback(
    async (
      page = postsState.currentPage,
      newSortField = sortField,
      newSortDirection = sortDirection,
      newSearchTerm = searchTerm,
      newCategoryFilter = categoryFilter
    ) => {
      try {
        const fetchedPosts = await getPosts(
          state.accessToken!,
          page,
          postsPerPage,
          newSortField,
          newSortDirection,
          newSearchTerm,
          newCategoryFilter
        );
        setPostsState((prevState) => ({
          ...fetchedPosts,
          currentPage: page,
        }));
        setSortField(newSortField);
        setSortDirection(newSortDirection);
        setSearchTerm(newSearchTerm);
        setCategoryFilter(newCategoryFilter);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      }
    },
    [
      state.accessToken,
      postsPerPage,
      sortField,
      sortDirection,
      searchTerm,
      categoryFilter,
    ]
  );

  useEffect(() => {
    if (isAuthenticated(state.accessToken)) {
      const currentPath = location.pathname;
      if (
        currentPath === "/board" ||
        currentPath === "/posts" ||
        currentPath.startsWith("/post/") ||
        currentPath === "/create-post"
      ) {
        fetchCategories();
        fetchPosts(postsState.currentPage);
      }
    }
  }, [state.accessToken, location.pathname, fetchPosts]);

  useEffect(() => {
    fetchPosts(1);
  }, [postsPerPage, fetchPosts]);

  const handleSort = useCallback(
    (field: keyof Post) => {
      const newDirection =
        sortField === field && sortDirection === "asc" ? "desc" : "asc";
      fetchPosts(postsState.currentPage, field, newDirection);
    },
    [sortField, sortDirection, fetchPosts, postsState.currentPage]
  );

  const handleSearch = useCallback(
    (newSearchTerm: string) => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      searchTimeoutRef.current = setTimeout(() => {
        setSearchTerm(newSearchTerm);
        fetchPosts(1, sortField, sortDirection, newSearchTerm, categoryFilter);
      }, 300);
    },
    [fetchPosts, sortField, sortDirection, categoryFilter]
  );

  const handleCategoryChange = useCallback(
    (newCategory: string) => {
      fetchPosts(1, sortField, sortDirection, searchTerm, newCategory);
    },
    [fetchPosts, sortField, sortDirection, searchTerm]
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      fetchPosts(newPage, sortField, sortDirection, searchTerm, categoryFilter);
    },
    [fetchPosts, sortField, sortDirection, searchTerm, categoryFilter]
  );

  return {
    postsState,
    setPostsState,
    comments,
    setComments,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    categories,
    setCategories,
    isCreatePostModalOpen,
    setIsCreatePostModalOpen,
    fetchCategories,
    fetchPosts,
    postsPerPage,
    setPostsPerPage,
    handleSort,
    handleSearch,
    handleCategoryChange,
    handlePageChange,
  };
};
