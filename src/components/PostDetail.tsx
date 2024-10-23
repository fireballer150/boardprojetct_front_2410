import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Post, Comment } from "../types";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { useAuth } from "../contexts/AuthContext";
import { getComments } from "../utils/auth";

interface PostDetailProps {
  posts: Post[];
  comments: Comment[];
  onAddComment: (comment: Comment) => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ posts }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const { state } = useAuth();

  useEffect(() => {
    const foundPost = posts.find((p) => p.id === Number(id));
    if (foundPost) {
      setPost(foundPost);
      fetchComments();
    }
  }, [id, posts]);

  const fetchComments = async () => {
    if (state.accessToken && id) {
      try {
        const fetchedComments = await getComments(
          state.accessToken,
          Number(id)
        );
        setComments(fetchedComments);
      } catch (error) {
        console.error("댓글 가져오기 실패:", error);
      }
    }
  };

  const handleCommentAdded = () => {
    fetchComments();
  };

  if (!post) {
    return <div>게시물을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
      <p className="text-sm text-gray-500 mb-4">
        작성자: {post.author} | 날짜: {post.date} | 카테고리: {post.category}
      </p>
      <p className="text-gray-700 mb-8">{post.content}</p>
      <h3 className="text-xl font-semibold mb-4">댓글</h3>
      <CommentForm postId={post.id} onCommentAdded={handleCommentAdded} />
      <CommentList
        comments={comments}
        postId={post.id}
        onCommentAdded={handleCommentAdded}
      />
      <button
        onClick={() => navigate("/posts/")}
        className="mt-8 px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
      >
        목록으로 돌아가기
      </button>
    </div>
  );
};

export default PostDetail;
