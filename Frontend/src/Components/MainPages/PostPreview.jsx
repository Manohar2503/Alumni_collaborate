import { FiX } from "react-icons/fi";
import PostCard from "./PostCard";

export default function PostsSection({
  state,
  profile,
  dispatch,

  openMenuId,
  setOpenMenuId,

  selectedPost,
  setSelectedPost,

  postsCarouselIndex,
  setPostsCarouselIndex,

  carouselIndex,
  setCarouselIndex,
}) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 12,
        padding: 32,
        border: "1px solid #e5e5e5",
        marginBottom: 20,
      }}
    >
      {/* ✅ Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <div>
          <h3 style={{ margin: 0 }}>Your Posts</h3>
          <p style={{ margin: 0, color: "#0A66C2" }}>
            Only posts created by you
          </p>
        </div>
      </div>

      {/* ✅ Posts list */}
      <div style={{ marginTop: 16 }}>
        {(state?.userPosts || []).length === 0 ? (
          <p style={{ textAlign: "center", color: "#999" }}>
            No posts yet. Create posts in the main feed!
          </p>
        ) : (state?.userPosts || []).length <= 2 ? (
          // ✅ Vertical layout for 1-2 posts
          (state?.userPosts || []).map((post) => (
            <div key={post._id} style={{ marginBottom: 12 }}>
              <PostCard
                post={post}
                profile={profile}
                openMenuId={openMenuId}
                setOpenMenuId={setOpenMenuId}
                dispatch={dispatch}
                onOpenModal={setSelectedPost}
              />
            </div>
          ))
        ) : (
          // ✅ Carousel layout for 3+ posts
          <div style={{ position: "relative", width: "100%" }}>
            <div style={{ overflow: "hidden", borderRadius: 8 }}>
              <div
                style={{
                  display: "flex",
                  transform: `translateX(-${postsCarouselIndex * 100}%)`,
                  transition: "transform 0.3s ease",
                }}
              >
                {(state?.userPosts || []).map((post) => (
                  <div
                    key={post._id}
                    style={{ minWidth: "100%", flexShrink: 0, padding: "0 8px" }}
                  >
                    <PostCard
                      post={post}
                      profile={profile}
                      openMenuId={openMenuId}
                      setOpenMenuId={setOpenMenuId}
                      dispatch={dispatch}
                      onOpenModal={setSelectedPost}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* ✅ Carousel Controls */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 12,
                marginTop: 16,
              }}
            >
              <button
                onClick={() =>
                  setPostsCarouselIndex((prev) =>
                    prev === 0 ? state.userPosts.length - 1 : prev - 1
                  )
                }
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "#0A66C2",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: 18,
                }}
              >
                ←
              </button>

              <div style={{ display: "flex", gap: 8 }}>
                {(state?.userPosts || []).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPostsCarouselIndex(idx)}
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background:
                        postsCarouselIndex === idx ? "#0A66C2" : "#ddd",
                      border: "none",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>

              <button
                onClick={() =>
                  setPostsCarouselIndex((prev) =>
                    prev === state.userPosts.length - 1 ? 0 : prev + 1
                  )
                }
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "#0A66C2",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: 18,
                }}
              >
                →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ✅ Post Modal (same as your code) */}
      {selectedPost && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: 20,
          }}
          onClick={() => setSelectedPost(null)}
        >
          <div
            style={{
              background: "white",
              borderRadius: 12,
              maxWidth: 700,
              width: "100%",
              maxHeight: "90vh",
              overflow: "auto",
              position: "relative",
              boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPost(null)}
              style={{
                position: "absolute",
                right: 16,
                top: 16,
                background: "white",
                border: "none",
                width: 36,
                height: 36,
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                zIndex: 10,
              }}
            >
              <FiX color="#999" size={20} />
            </button>

            <div style={{ padding: 32 }}>
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  marginBottom: 20,
                  alignItems: "center",
                }}
              >
                <img
                  src={profile.profileImage}
                  alt={selectedPost.name}
                  style={{ width: 56, height: 56, borderRadius: "50%" }}
                />
                <div>
                  <h4 style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>
                    {selectedPost.name}
                  </h4>
                  <p style={{ fontSize: 12, color: "#666", margin: "2px 0 0 0" }}>
                    {selectedPost.time}
                  </p>
                </div>
              </div>

              <p
                style={{
                  fontSize: 16,
                  color: "#333",
                  lineHeight: 1.6,
                  marginBottom: 20,
                  whiteSpace: "pre-wrap",
                }}
              >
                {selectedPost.content}
              </p>

              {selectedPost.media && selectedPost.media.length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <div
                    style={{
                      position: "relative",
                      background: "#f0f0f0",
                      borderRadius: 8,
                      overflow: "hidden",
                    }}
                  >
                    {selectedPost.media[carouselIndex]?.type === "image" ? (
                      <img
                        src={selectedPost.media[carouselIndex].url}
                        alt="post"
                        style={{
                          width: "100%",
                          maxHeight: 500,
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <video
                        src={selectedPost.media[carouselIndex].url}
                        style={{
                          width: "100%",
                          maxHeight: 500,
                          objectFit: "cover",
                        }}
                        controls
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
