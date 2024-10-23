import React, { useState } from "react";
import { Comment } from "../types";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

interface CommentItemProps {
  comment: Comment;
  postId: number;
  onCommentAdded: () => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  postId,
  onCommentAdded,
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);

  return (
    <div className="mt-4 ml-4 border-l-2 border-gray-200 pl-4">
      <div className="flex justify-between items-center">
        <p className="font-semibold">{comment.author}</p>
        <p className="text-sm text-gray-500">{comment.date}</p>
      </div>
      <p className="mt-1">{comment.content}</p>
      <button
        onClick={() => setShowReplyForm(!showReplyForm)}
        className="mt-2 text-sm text-blue-500 hover:text-blue-700"
      >
        {showReplyForm ? "취소" : "답글"}
      </button>
      {showReplyForm && (
        <CommentForm
          postId={postId}
          parentId={comment.id}
          onCommentAdded={() => {
            onCommentAdded();
            setShowReplyForm(false);
          }}
        />
      )}
      <CommentList
        comments={comment.replies || []}
        postId={postId}
        parentId={comment.id}
        onCommentAdded={onCommentAdded}
      />
    </div>
  );
};

export default CommentItem;
