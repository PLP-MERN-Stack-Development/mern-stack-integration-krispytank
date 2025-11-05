import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { postService } from '../services/api';

export default function PostView() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await postService.getPost(id);
        setPost(response.post);
      } catch (err) {
        setError('Failed to load post');
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-text">Loading post...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="empty-state">
        <p>Post not found.</p>
        <Link to="/" className="post-link">
          Back to posts
        </Link>
      </div>
    );
  }

  return (
    <div className="post-view-container">
      <article className="post-article">
        <h1 className="post-article-title">
          {post.title}
        </h1>
        <div className="post-meta">
          <span>By {post.author?.username || 'Unknown'}</span>
          <span>•</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="post-content">
          {post.content}
        </div>
        <div className="post-back">
          <Link
            to="/"
            className="post-back-link"
          >
            ← Back to posts
          </Link>
        </div>
      </article>
    </div>
  );
}
