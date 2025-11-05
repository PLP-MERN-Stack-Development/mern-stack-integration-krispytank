import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { postService } from '../services/api';

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postService.getAllPosts();
        setPosts(response.posts || []);
      } catch (err) {
        setError('Failed to load posts');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-text">Loading posts...</div>
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

  return (
    <div className="post-list">
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-container">
          <h1 className="hero-title">Welcome to Our Blog</h1>
          <p className="hero-subtitle">
            Discover amazing stories, insights, and perspectives from our community
          </p>
          <div className="hero-buttons">
            <Link
              to="/create"
              className="btn btn-outline"
            >
              Write a Post
            </Link>
            <Link
              to="/register"
              className="btn btn-primary"
            >
              Join Us
            </Link>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div className="posts-section">
        <div className="section-header">
          <h2 className="section-title">Latest Posts</h2>
          <p className="section-subtitle">
            Explore our collection of thought-provoking articles and stories
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="empty-state">
            <p>No posts available yet.</p>
            <p className="secondary">Be the first to share your story!</p>
          </div>
        ) : (
          <div className="posts-grid">
            {posts.map((post) => (
              <div
                key={post._id}
                className="post-card"
              >
                <div className="post-content">
                  <h3 className="post-title">
                    {post.title}
                  </h3>
                  <p className="post-excerpt">
                    {post.content.substring(0, 150)}...
                  </p>
                  <div className="post-footer">
                    <span className="post-author">
                      By {post.author?.username || 'Unknown'}
                    </span>
                    <Link
                      to={`/post/${post._id}`}
                      className="post-link"
                    >
                      Read more
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
