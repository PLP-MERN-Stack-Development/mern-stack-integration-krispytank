// src/context/PostContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { postService } from '../services/api';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await postService.getAllPosts();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData) => {
    await postService.createPost(postData);
    await fetchPosts();
  };

  const updatePost = async (id, postData) => {
    await postService.updatePost(id, postData);
    await fetchPosts();
  };

  const deletePost = async (id) => {
    await postService.deletePost(id);
    await fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PostContext.Provider value={{ posts, fetchPosts, createPost, updatePost, deletePost, loading }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => useContext(PostContext);
