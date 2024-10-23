import React from "react";
import CreatePost from "./CreatePost";
import { Post } from "../types";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  onAddCategory: (categoryName: string) => Promise<void>;
  onAddPost: (newPost: Post) => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  categories,
  onAddCategory,
  onAddPost,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-lg w-full">
        <CreatePost
          categories={categories}
          onAddCategory={onAddCategory}
          onAddPost={onAddPost}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default CreatePostModal;
