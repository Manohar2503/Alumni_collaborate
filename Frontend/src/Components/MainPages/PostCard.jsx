import { useState } from "react";
import PostPreview from "./PostPreview";

export default function PostCard({ post, profile, openMenuId, setOpenMenuId, dispatch, onOpenModal }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content || '');

  const handleLike = () => {
    const newLiked = !post.liked;
    const newLikes = newLiked ? (post.likes || 0) + 1 : (post.likes || 0) - 1;
    dispatch({
      type: "LIKE_POST",
      payload: { postId: post.id, likes: newLikes, liked: newLiked }
    });
  };

  return (
    <div
      style={{
        border: "2px solid #e0e0e0",
        borderRadius: "12px",
        padding: "24px",
        backgroundColor: "#f9f9f9"
      }}
    >
      <div style={{ display: "flex", gap: "16px", marginBottom: "16px", alignItems: "flex-start" }}>
        <img
          src={profile.profileImage}
          alt={post.name}
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%"
          }}
        />
        <div style={{ flex: 1 }}>
          <h4 style={{ fontSize: "16px", fontWeight: "700", margin: "0" }}>
            {post.name}
          </h4>
          <p style={{ fontSize: "13px", color: "#999", margin: "4px 0 0 0" }}>
            {post.time}
          </p>
        </div>
        <div style={{ position: 'relative' }}>
          <button onClick={() => setOpenMenuId(openMenuId === post.id ? null : post.id)} style={{ backgroundColor: "transparent", border: "none", cursor: "pointer", fontSize: "20px" }}>
            ⋯
          </button>
          {openMenuId === post.id && (
            <div style={{ position: 'absolute', right: 0, top: 28, background: 'white', boxShadow: '0 6px 18px rgba(0,0,0,0.08)', borderRadius: 6, zIndex: 30 }}>
              <button
                onClick={() => {
                  setOpenMenuId(null);
                  setIsEditing(true);
                }}
                style={{ display: 'block', padding: '10px 16px', border: 'none', background: 'transparent', cursor: 'pointer', width: 160, textAlign: 'left', fontSize: '14px' }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setOpenMenuId(null);
                  if (window.confirm('Delete this post?')) {
                    dispatch({ type: 'DELETE_POST', payload: post.id });
                  }
                }}
                style={{ display: 'block', padding: '10px 16px', border: 'none', background: 'transparent', cursor: 'pointer', width: 160, textAlign: 'left', fontSize: '14px' }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div onClick={() => onOpenModal && onOpenModal(post)} style={{ cursor: 'pointer', marginBottom: '12px' }}>
        <PostPreview content={post.content} limit={150} />
      </div>

      {post.media && post.media.length > 0 && (
        <div style={{ marginBottom: "16px", cursor: 'pointer' }} onClick={() => onOpenModal && onOpenModal(post)}>
          <img
            src={post.media[0].url}
            alt="post"
            style={{
              width: "100%",
              height: "280px",
              borderRadius: "8px",
              objectFit: "cover"
            }}
          />
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "12px", borderTop: "1px solid #e0e0e0", fontSize: "14px", color: "#666" }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {!isEditing ? (
            <button onClick={handleLike} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '14px', color: post.liked ? '#0A66C2' : '#666', fontWeight: post.liked ? '700' : '500' }}>👍 {post.likes || 0}</button>
          ) : (
            <div style={{ display: 'flex', gap: 8, width: '100%' }}>
              <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} style={{ flex: 1, minHeight: 80, padding: 10, fontSize: '14px' }} />
              <div style={{ display: 'flex', gap: 6, flexDirection: 'column' }}>
                <button onClick={() => { dispatch({ type: 'UPDATE_POST', payload: { postId: post.id, updates: { content: editContent } } }); setIsEditing(false); }} style={{ padding: '8px 12px', background: '#0A66C2', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>Save</button>
                <button onClick={() => { setIsEditing(false); setEditContent(post.content || '') }} style={{ padding: '8px 12px', background: '#f0f0f0', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
