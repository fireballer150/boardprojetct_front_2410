export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
}

export interface Comment {
  id: number;
  postId: number;
  author: string;
  content: string;
  date: string;
  parent: number | null;
  replies?: Comment[];
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface PostsState extends PaginatedResponse<Post> {
  currentPage: number;
}
