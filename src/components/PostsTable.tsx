// src/components/PostsTable.tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { fetchPosts, deletePost } from "@/service/api";
import type { Post } from "@/types";
import PostForm from "./PostForm";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Icon } from "@iconify/react";

export default function PostsTable() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const data = await fetchPosts();
                setPosts(data);
            } catch (error) {
                console.error("Failed to load posts:", error);
            }
        };
        loadPosts();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await deletePost(id);
            setPosts(posts.filter(post => post.id !== id));
        } catch (error) {
            console.error("Failed to delete post:", error);
        }
    };

    const handleSuccess = () => {
        setIsDialogOpen(false);
        fetchPosts().then(data => setPosts(data));
    };

    return (
        <div className="space-y-4 mt-3 mx-3">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button onClick={() => setEditingPost(null)}>Add New Post</Button>
                </DialogTrigger>
                <DialogContent>
                    <PostForm 
                        post={editingPost} 
                        onSuccess={handleSuccess} 
                    />
                </DialogContent>
            </Dialog>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Body</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {posts.map((post) => (
                        <TableRow key={post.id}>
                            <TableCell>{post.id}</TableCell>
                            <TableCell>{post.title}</TableCell>
                            <TableCell>{post.body}</TableCell>
                            <TableCell className="flex gap-2">
                                <button
                                    type="button"
                                    className="p-2 rounded hover:bg-gray-100"
                                    aria-label="Edit"
                                    onClick={() => {
                                        setEditingPost(post);
                                        setIsDialogOpen(true);
                                    }}
                                >
                                    <Icon icon="mdi:pencil" width={20} height={20} />
                                </button>
                                <button
                                    type="button"
                                    className="p-2 rounded hover:bg-red-100"
                                    aria-label="Delete"
                                    onClick={() => handleDelete(post.id)}
                                >
                                    <Icon icon="mdi:delete" width={20} height={20} className=" text-gray-950" />
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}