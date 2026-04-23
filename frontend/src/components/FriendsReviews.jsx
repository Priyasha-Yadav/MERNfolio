import { useState } from 'react';

const StarIcon = ({ filled, onClick, hoverable }) => (
  <svg
    onClick={onClick}
    className={`w-5 h-5 cursor-pointer transition-all duration-200 ${
      filled ? 'text-amber-400 scale-110' : 'text-gray-300 dark:text-gray-600'
    } ${hoverable ? 'hover:scale-125' : ''}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <StarIcon key={s} filled={s <= rating} />
    ))}
  </div>
);

const ReviewForm = ({ onSubmit, variant = 'modern' }) => {
  const [form, setForm] = useState({ reviewerName: '', comment: '', rating: 0 });
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.reviewerName.trim() || !form.comment.trim() || form.rating === 0) {
      setError('Please fill all fields and select a rating.');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      await onSubmit(form);
      setForm({ reviewerName: '', comment: '', rating: 0 });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError('Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const isDev = variant === 'developer';
  const isMinimal = variant === 'minimal';

  const inputClass = isDev
    ? 'w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all text-sm font-mono'
    : isMinimal
    ? 'w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all text-sm'
    : 'w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all text-sm';

  const btnClass = isDev
    ? 'w-full py-3 bg-gradient-to-r from-green-500 to-cyan-500 text-gray-900 font-bold rounded-xl hover:shadow-lg hover:shadow-green-500/20 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 text-sm'
    : 'w-full py-3 bg-gradient-to-r from-violet-600 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-violet-500/25 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 text-sm';

  return (
    <form onSubmit={handleSubmit} className={`p-6 rounded-2xl border ${
      isDev
        ? 'bg-gray-900 border-gray-800'
        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm'
    }`}>
      <h3 className={`text-lg font-bold mb-5 ${isDev ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
        {isDev ? '$ write_review' : 'Leave a Review'}
      </h3>

      <div className="space-y-4">
        <div>
          <label className={`block text-xs font-semibold mb-1.5 ${isDev ? 'text-gray-400' : 'text-gray-500 dark:text-gray-400'}`}>
            Your Name
          </label>
          <input
            type="text"
            value={form.reviewerName}
            onChange={(e) => setForm({ ...form, reviewerName: e.target.value })}
            placeholder="Enter your name"
            className={inputClass}
            maxLength={50}
          />
        </div>

        <div>
          <label className={`block text-xs font-semibold mb-1.5 ${isDev ? 'text-gray-400' : 'text-gray-500 dark:text-gray-400'}`}>
            Rating
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <StarIcon
                key={s}
                filled={s <= (hoverRating || form.rating)}
                hoverable
                onClick={() => setForm({ ...form, rating: s })}
                onMouseEnter={() => setHoverRating(s)}
                onMouseLeave={() => setHoverRating(0)}
              />
            ))}
            {form.rating > 0 && (
              <span className={`text-xs ml-2 self-center ${isDev ? 'text-cyan-400' : 'text-violet-500'}`}>
                {form.rating}/5
              </span>
            )}
          </div>
        </div>

        <div>
          <label className={`block text-xs font-semibold mb-1.5 ${isDev ? 'text-gray-400' : 'text-gray-500 dark:text-gray-400'}`}>
            Your Review
          </label>
          <textarea
            value={form.comment}
            onChange={(e) => setForm({ ...form, comment: e.target.value })}
            placeholder="Share your experience..."
            rows={3}
            className={`${inputClass} resize-none`}
            maxLength={500}
          />
          <p className={`text-xs mt-1 ${isDev ? 'text-gray-600' : 'text-gray-400'}`}>
            {form.comment.length}/500
          </p>
        </div>

        {error && (
          <p className="text-red-500 text-xs font-medium animate-fadeIn">{error}</p>
        )}

        {success && (
          <div className="flex items-center gap-2 text-green-500 text-xs font-medium animate-fadeIn">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Review submitted successfully!
          </div>
        )}

        <button type="submit" disabled={submitting} className={btnClass}>
          {submitting ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Submitting...
            </span>
          ) : (
            'Submit Review'
          )}
        </button>
      </div>
    </form>
  );
};

const timeAgo = (dateStr) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
};

const avatarColors = [
  'from-violet-500 to-pink-500',
  'from-blue-500 to-cyan-500',
  'from-emerald-500 to-teal-500',
  'from-amber-500 to-orange-500',
  'from-rose-500 to-red-500',
  'from-indigo-500 to-purple-500',
];

const FriendsReviews = ({ reviews = [], onAddReview, variant = 'modern', portfolioId }) => {
  const isDev = variant === 'developer';
  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  return (
    <section id="reviews" className={variant === 'minimal' ? 'mb-16' : ''}>
      {/* Section header */}
      {isDev ? (
        <p className="text-green-400 mb-4 text-sm">$ cat reviews.log</p>
      ) : variant === 'minimal' ? (
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-8">
          Friends' Reviews
        </h2>
      ) : (
        <h2
          className="text-3xl font-bold text-center mb-2 text-gray-900 dark:text-white"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Friends' Reviews
        </h2>
      )}

      {/* Stats bar */}
      {reviews.length > 0 && variant !== 'minimal' && (
        <div className={`flex items-center justify-center gap-6 mb-10 ${isDev ? '' : ''}`}>
          <div className="flex items-center gap-2">
            <span className={`text-2xl font-bold ${isDev ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
              {avgRating}
            </span>
            <StarRating rating={Math.round(parseFloat(avgRating))} />
          </div>
          <span className={`text-sm ${isDev ? 'text-gray-500' : 'text-gray-400'}`}>
            {reviews.length} review{reviews.length !== 1 ? 's' : ''}
          </span>
        </div>
      )}

      {/* Reviews grid + form */}
      <div className={isDev ? 'space-y-4' : variant === 'minimal' ? 'space-y-6' : 'grid grid-cols-1 md:grid-cols-2 gap-6'}>
        {/* Existing reviews */}
        {reviews.map((review, i) => (
          <div
            key={review._id || i}
            className={`p-6 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 ${
              isDev
                ? 'bg-gray-900 border border-gray-800 hover:border-cyan-500/30'
                : variant === 'minimal'
                ? 'border border-gray-200 dark:border-gray-700 rounded-xl'
                : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md'
            }`}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="flex items-start justify-between mb-3">
              <StarRating rating={review.rating} />
              {review.createdAt && (
                <span className={`text-xs ${isDev ? 'text-gray-600' : 'text-gray-400'}`}>
                  {timeAgo(review.createdAt)}
                </span>
              )}
            </div>

            <p className={`mb-4 leading-relaxed ${
              isDev ? 'text-gray-300 text-sm italic' : 'text-gray-600 dark:text-gray-300 italic'
            }`}>
              "{review.comment}"
            </p>

            <div className="flex items-center gap-3">
              {review.reviewerProfile ? (
                <img
                  src={review.reviewerProfile}
                  alt={review.reviewerName}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${
                  avatarColors[i % avatarColors.length]
                } flex items-center justify-center text-white text-xs font-bold`}>
                  {review.reviewerName?.charAt(0)?.toUpperCase()}
                </div>
              )}
              <span className={`font-medium text-sm ${
                isDev ? 'text-cyan-400' : 'text-gray-900 dark:text-white'
              }`}>
                {variant === 'minimal' ? `— ${review.reviewerName}` : review.reviewerName}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Review form */}
      {onAddReview && (
        <div className={reviews.length > 0 ? 'mt-10' : 'mt-4'}>
          {reviews.length === 0 && (
            <div className={`text-center mb-6 ${isDev ? 'text-gray-500' : 'text-gray-400'}`}>
              <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
              <p className="text-sm">No reviews yet. Be the first to leave one!</p>
            </div>
          )}
          <div className="max-w-xl mx-auto">
            <ReviewForm onSubmit={onAddReview} variant={variant} />
          </div>
        </div>
      )}
    </section>
  );
};

export default FriendsReviews;
