import { useState } from 'react';

const BlogSection = ({ blogs = [], onAddBlog, onEditBlog, onDeleteBlog, isEditable = false }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [blogForm, setBlogForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    tags: '',
    readTime: 5
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const blogData = {
      ...blogForm,
      tags: blogForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      publishedAt: new Date().toISOString(),
      id: editingBlog?.id || Date.now().toString()
    };

    if (editingBlog) {
      onEditBlog?.(editingBlog.id, blogData);
    } else {
      onAddBlog?.(blogData);
    }

    setBlogForm({ title: '', content: '', excerpt: '', tags: '', readTime: 5 });
    setEditingBlog(null);
    setShowForm(false);
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setBlogForm({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt,
      tags: blog.tags?.join(', ') || '',
      readTime: blog.readTime || 5
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setBlogForm({ title: '', content: '', excerpt: '', tags: '', readTime: 5 });
    setEditingBlog(null);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      {isEditable && (
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Blog & Articles ✍️
          </h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary"
          >
            {showForm ? 'Cancel' : 'Add Article'}
          </button>
        </div>
      )}

      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">
            {editingBlog ? 'Edit Article' : 'New Article'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Title</label>
              <input
                type="text"
                value={blogForm.title}
                onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                className="input"
                placeholder="Article title..."
                required
              />
            </div>
            
            <div>
              <label className="label">Excerpt</label>
              <textarea
                value={blogForm.excerpt}
                onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                className="input"
                rows={2}
                placeholder="Brief description..."
                required
              />
            </div>
            
            <div>
              <label className="label">Content</label>
              <textarea
                value={blogForm.content}
                onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                className="input"
                rows={8}
                placeholder="Write your article content..."
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Tags (comma separated)</label>
                <input
                  type="text"
                  value={blogForm.tags}
                  onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
                  className="input"
                  placeholder="React, JavaScript, Web Development"
                />
              </div>
              
              <div>
                <label className="label">Read Time (minutes)</label>
                <input
                  type="number"
                  value={blogForm.readTime}
                  onChange={(e) => setBlogForm({ ...blogForm, readTime: parseInt(e.target.value) })}
                  className="input"
                  min="1"
                  max="60"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <button type="submit" className="btn-primary">
                {editingBlog ? 'Update Article' : 'Publish Article'}
              </button>
              <button type="button" onClick={handleCancel} className="btn-ghost">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {blogs.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <p className="text-gray-500 dark:text-gray-400">
            {isEditable ? 'No articles yet. Share your thoughts!' : 'No articles published yet.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <article
              key={blog.id || index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 animate-fadeIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>📅</span>
                    <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{blog.readTime} min read</span>
                  </div>
                  {isEditable && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(blog)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDeleteBlog?.(blog.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {blog.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>
                
                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                    {blog.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs">
                        +{blog.tags.length - 3} more
                      </span>
                    )}
                  </div>
                )}
                
                <button className="text-blue-600 dark:text-blue-400 hover:underline font-medium text-sm">
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogSection;