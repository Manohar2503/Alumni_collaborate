import { FiX } from "react-icons/fi";
import PostCard from "./PostCard";

export default function PostsSection({
  state,
  profile,
  dispatch,
  isCreatingPost,
  setIsCreatingPost,
  postContent,
  setPostContent,
  mediaPreviews,
  setMediaPreviews,
  mediaFiles,
  setMediaFiles,
  removeMedia,
  handleMediaChange,
  handleNewPost,
  openMenuId,
  setOpenMenuId,
  selectedPost,
  setSelectedPost,
  postsCarouselIndex,
  setPostsCarouselIndex,
  carouselIndex,
  setCarouselIndex,
  handleUpdatePost,
  handleDeletePost
}) {
  return (
    <div style={{ background: 'white', borderRadius: 12, padding: 32, border: '1px solid #e5e5e5', marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h3 style={{ margin: 0 }}>Activity</h3>
          <p style={{ margin: 0, color: '#0A66C2' }}>731 followers</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setIsCreatingPost(true)} style={{ padding: '8px 12px', borderRadius: 8, background: '#0A66C2', color: 'white', border: 'none', cursor: 'pointer' }}>Create</button>
        </div>
      </div>

      {/* Create Post area */}
      {isCreatingPost && (
        <div style={{ marginTop: 16, padding: 12, background: '#f9f9f9', borderRadius: 8 }}>
          <textarea placeholder="What's on your mind?" value={postContent} onChange={(e) => setPostContent(e.target.value)} style={{ width: '100%', minHeight: 80, padding: 12, borderRadius: 8, border: '1px solid #ddd', resize: 'vertical' }} />
          {mediaPreviews.length > 0 && (
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              {mediaPreviews.map((p, i) => (
                <div key={i} style={{ position: 'relative' }}>
                  {mediaFiles[i].type.startsWith('image') ? <img src={p} style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 6 }} alt="preview" /> : <video src={p} style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 6 }} />}
                  <button onClick={() => removeMedia(i)} style={{ position: 'absolute', right: 4, top: 4, background: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', width: 20, height: 20, borderRadius: 10 }}>×</button>
                </div>
              ))}
            </div>
          )}
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <label style={{ padding: 10, borderRadius: 8, background: '#e8f4f8', border: '2px dashed #0A66C2', color: '#0A66C2', cursor: 'pointer' }}>
              <input type="file" multiple accept="image/*,video/*" onChange={handleMediaChange} style={{ display: 'none' }} />
              Add images / videos
            </label>
            <button onClick={handleNewPost} style={{ padding: '10px 12px', borderRadius: 8, background: '#0A66C2', color: 'white', border: 'none', cursor: 'pointer' }}>Post</button>
            <button onClick={() => { setIsCreatingPost(false); setPostContent(''); setMediaFiles([]); setMediaPreviews([]); }} style={{ padding: '10px 12px', borderRadius: 8, background: '#f0f0f0', border: 'none', cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Posts list */}
      <div style={{ marginTop: 16 }}>
        {(state?.userPosts || []).length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999' }}>No posts yet. Create one to get started!</p>
        ) : (state?.userPosts || []).length <= 2 ? (
          // Vertical layout for 1-2 posts
          (state?.userPosts || []).map((post) => (
            <div key={post.id} style={{ marginBottom: 12 }}>
              <PostCard post={post} profile={profile} openMenuId={openMenuId} setOpenMenuId={setOpenMenuId} dispatch={dispatch} onOpenModal={setSelectedPost} />
            </div>
          ))
        ) : (
          // Carousel layout for 3+ posts
          <div style={{ position: 'relative', width: '100%' }}>
            <div style={{ overflow: 'hidden', borderRadius: 8 }}>
              <div style={{ display: 'flex', transform: `translateX(-${postsCarouselIndex * 100}%)`, transition: 'transform 0.3s ease' }}>
                {(state?.userPosts || []).map((post) => (
                  <div key={post.id} style={{ minWidth: '100%', flexShrink: 0, padding: '0 8px' }}>
                    <PostCard post={post} profile={profile} openMenuId={openMenuId} setOpenMenuId={setOpenMenuId} dispatch={dispatch} onOpenModal={setSelectedPost} />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Carousel Controls */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginTop: 16 }}>
              <button 
                onClick={() => setPostsCarouselIndex(prev => (prev === 0 ? (state?.userPosts || []).length - 1 : prev - 1))}
                style={{ width: 40, height: 40, borderRadius: '50%', background: '#0A66C2', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18 }}
              >
                ←
              </button>
              
              <div style={{ display: 'flex', gap: 8 }}>
                {(state?.userPosts || []).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPostsCarouselIndex(idx)}
                    style={{ width: 10, height: 10, borderRadius: '50%', background: postsCarouselIndex === idx ? '#0A66C2' : '#ddd', border: 'none', cursor: 'pointer' }}
                  />
                ))}
              </div>
              
              <button 
                onClick={() => setPostsCarouselIndex(prev => (prev === (state?.userPosts || []).length - 1 ? 0 : prev + 1))}
                style={{ width: 40, height: 40, borderRadius: '50%', background: '#0A66C2', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18 }}
              >
                →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Post Modal */}
      {selectedPost && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }} onClick={() => setSelectedPost(null)}>
          <div style={{ background: 'white', borderRadius: 12, maxWidth: 700, width: '100%', maxHeight: '90vh', overflow: 'auto', position: 'relative', boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }} onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button onClick={() => setSelectedPost(null)} style={{ position: 'absolute', right: 16, top: 16, background: 'white', border: 'none', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.12)', zIndex: 10 }}>
              <FiX color="#999" size={20} />
            </button>

            {/* Post Content */}
            <div style={{ padding: 32 }}>
              <div style={{ display: 'flex', gap: 12, marginBottom: 20, alignItems: 'center' }}>
                <img src={profile.profileImage} alt={selectedPost.name} style={{ width: 56, height: 56, borderRadius: '50%' }} />
                <div>
                  <h4 style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>{selectedPost.name}</h4>
                  <p style={{ fontSize: 12, color: '#666', margin: '2px 0 0 0' }}>{selectedPost.time}</p>
                </div>
              </div>

              {/* Post Text */}
              <p style={{ fontSize: 16, color: '#333', lineHeight: 1.6, marginBottom: 20, whiteSpace: 'pre-wrap' }}>{selectedPost.content}</p>

              {/* Post Media - Carousel */}
              {selectedPost.media && selectedPost.media.length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ position: 'relative', background: '#f0f0f0', borderRadius: 8, overflow: 'hidden' }}>
                    {selectedPost.media[carouselIndex]?.type === 'image' ? (
                      <img src={selectedPost.media[carouselIndex].url} alt="post" style={{ width: '100%', maxHeight: 500, objectFit: 'cover' }} />
                    ) : (
                      <video src={selectedPost.media[carouselIndex].url} style={{ width: '100%', maxHeight: 500, objectFit: 'cover' }} controls />
                    )}
                    
                    {selectedPost.media.length > 1 && (
                      <>
                        <button onClick={() => setCarouselIndex(prev => (prev === 0 ? selectedPost.media.length - 1 : prev - 1))} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.8)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                          ←
                        </button>
                        <button onClick={() => setCarouselIndex(prev => (prev === selectedPost.media.length - 1 ? 0 : prev + 1))} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.8)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                          →
                        </button>
                        <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
                          {selectedPost.media.map((_, idx) => (
                            <button key={idx} onClick={() => setCarouselIndex(idx)} style={{ width: 8, height: 8, borderRadius: '50%', background: carouselIndex === idx ? '#0A66C2' : 'rgba(255,255,255,0.6)', border: 'none', cursor: 'pointer' }} />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Post Actions */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid #e0e0e0' }}>
                <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 14, color: '#666', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                  👍 {selectedPost.likes || 0}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
