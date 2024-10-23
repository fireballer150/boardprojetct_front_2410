import React from "react";

interface PostsPerPageSelectorProps {
  postsPerPage: number;
  onPostsPerPageChange: (newPostsPerPage: number) => void;
}

const PostsPerPageSelector: React.FC<PostsPerPageSelectorProps> = ({
  postsPerPage,
  onPostsPerPageChange,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor="postsPerPage" className="mr-2">
        게시물 수:
      </label>
      <select
        id="postsPerPage"
        value={postsPerPage}
        onChange={(e) => onPostsPerPageChange(Number(e.target.value))}
        className="px-2 py-1 border rounded"
      >
        <option value={5}>5개</option>
        <option value={10}>10개</option>
        <option value={20}>20개</option>
      </select>
    </div>
  );
};

export default PostsPerPageSelector;
