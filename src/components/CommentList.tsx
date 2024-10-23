import React from "react";
import { Comment } from "../types";
import CommentItem from "./CommentItem";

interface CommentListProps {
  comments: Comment[];
  postId: number;
  parentId?: number | null;
  onCommentAdded: () => void;
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
  postId,
  parentId = null,
  onCommentAdded,
}) => {
  const filteredComments = comments.filter(
    (comment) => comment.parent === parentId
  );

  return (
    <div className="mt-4">
      {filteredComments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          postId={postId}
          onCommentAdded={onCommentAdded}
        />
      ))}
    </div>
  );
};

export default CommentList;
