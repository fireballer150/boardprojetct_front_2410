import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { createComment } from "../utils/auth";

interface CommentFormProps {
  postId: number;
  parentId?: number | null;
  onCommentAdded: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({
  postId,
  parentId = null,
  onCommentAdded,
}) => {
  const [content, setContent] = useState("");
  const { state } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() && state.accessToken) {
      try {
        await createComment(state.accessToken, postId, content, parentId);
        setContent("");
        onCommentAdded();
      } catch (error) {
        console.error("댓글 작성 실패:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
        rows={4}
        placeholder="댓글을 작성하세요..."
      />
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        댓글 작성
      </button>
    </form>
  );
};

export default CommentForm;
