import React from "react";
import { Link } from "react-router-dom";
// import { Post } from '../types';
import { ChevronUp, ChevronDown } from "lucide-react";
import { Post } from "../types";

interface PostListProps {
  posts: Post[];
  sortField: keyof Post;
  sortDirection: "asc" | "desc";
  onSort: (field: keyof Post) => void;
}

const PostList: React.FC<PostListProps> = ({
  posts,
  sortField,
  sortDirection,
  onSort,
}) => {
  const renderSortIcon = (field: keyof Post) => {
    if (sortField === field) {
      return sortDirection === "asc" ? (
        <ChevronUp size={16} />
      ) : (
        <ChevronDown size={16} />
      );
    }
    return null;
  };

  return (
    <table className="min-w-full">
      <thead>
        <tr>
          <th
            className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
            onClick={() => onSort("title")}
          >
            Title {renderSortIcon("title")}
          </th>
          <th
            className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
            onClick={() => onSort("author")}
          >
            Author {renderSortIcon("author")}
          </th>
          <th
            className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
            onClick={() => onSort("date")}
          >
            Date {renderSortIcon("date")}
          </th>
          <th
            className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
            onClick={() => onSort("category")}
          >
            Category {renderSortIcon("category")}
          </th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post) => (
          <tr key={post.id}>
            <td className="px-6 py-4 whitespace-nowrap">
              <Link
                to={`/post/${post.id}`}
                className="text-blue-600 hover:text-blue-800"
              >
                {post.title}
              </Link>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{post.author}</td>
            <td className="px-6 py-4 whitespace-nowrap">{post.date}</td>
            <td className="px-6 py-4 whitespace-nowrap">{post.category}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PostList;
