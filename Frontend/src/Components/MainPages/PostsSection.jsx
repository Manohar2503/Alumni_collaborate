import ProfilePostCard from "../MainPages/PostCard";


export default function PostsSection({ state }) {
  const posts = state?.userPosts || [];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 mb-4">
      {/* ✅ Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Your Posts</h3>
          <p className="text-sm text-blue-600">Only posts created by you</p>
        </div>
      </div>

      {/* ✅ Empty State */}
      {posts.length === 0 ? (
        <p className="text-center text-gray-500 py-6">
          No posts yet. Create posts in the main feed!
        </p>
      ) : (
        <>
          {/* ✅ Horizontal Scroll Row */}
          <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide snap-x snap-mandatory">
            {posts.map((post) => (
              <div
                key={post._id}
                className="snap-start shrink-0 w-[260px] sm:w-[280px] md:w-[320px]"
              >
                <ProfilePostCard post={post} />
              </div>
            ))}
          </div>

          {/* ✅ Small Hint (mobile friendly UX) */}
          <p className="text-xs text-gray-400 mt-2">
            Swipe → to see more posts
          </p>
        </>
      )}
    </div>
  );
}
