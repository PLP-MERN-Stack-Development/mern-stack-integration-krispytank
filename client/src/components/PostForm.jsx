import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postService } from '../services/api';

export default function PostForm({ isEdit = false }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      const fetchPost = async () => {
        try {
          const response = await postService.getPost(id);
          setForm({
            title: response.post.title,
            content: response.post.content
          });
        } catch (error) {
          console.error('Error fetching post:', error);
        }
      };
      fetchPost();
    }
  }, [isEdit, id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        await postService.updatePost(id, form);
      } else {
        await postService.createPost(form);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-form-container">
      <h2 className="post-form-title">{isEdit ? 'Edit Post' : 'Create Post'}</h2>
      <form onSubmit={handleSubmit} className="post-form">
        <input
          name="title"
          placeholder="Post Title"
          value={form.title}
          onChange={handleChange}
          required
          className="form-input"
        />

        <textarea
          name="content"
          placeholder="Write your content..."
          value={form.content}
          onChange={handleChange}
          required
          rows="10"
          className="form-textarea"
        />
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary"
        >
          {loading ? 'Saving...' : (isEdit ? 'Update Post' : 'Create Post')}
        </button>
      </form>
    </div>
  );
}
