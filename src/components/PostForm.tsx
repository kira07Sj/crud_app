// src/components/PostForm.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { createPost, updatePost } from "@/service/api";
import type { Post } from "@/types";

export default function PostForm({
  post,
  onSuccess,
}: {
  post: Post | null;
  onSuccess: () => void;
}) {
  const [title, setTitle] = useState(post?.title || "");
  const [body, setBody] = useState(post?.body || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (post) {
        await updatePost(post.id, { title, body });
      } else {
        await createPost({ title, body, userId: 1 });
      }
      onSuccess();
    } catch (error) {
      console.error("Operation failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="body">Content</Label>
        <Input
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Processing..." : post ? "Update Post" : "Create Post"}
      </Button>
    </form>
  );
}