import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit2, FiMapPin, FiPhone, FiMail, FiPlus, FiX, FiHeart, FiMessageCircle, FiShare2 } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { UserContext } from "../../Layout/Layout";

export default function Profile() {
  const { state, dispatch, profile, setProfile } = useContext(UserContext);
  const navigate = useNavigate();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingExperience, setIsAddingExperience] = useState(false);
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [skillType, setSkillType] = useState("technical");
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [activeTab, setActiveTab] = useState("details");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [postsCarouselIndex, setPostsCarouselIndex] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [mediaPreviews, setMediaPreviews] = useState([]);
  const [editForm, setEditForm] = useState({ name: '', headline: '', about: '', location: '', phone: '', email: '', college: '', branch: '', batch: '' });
  const [achText, setAchText] = useState('');
  const [showAddAch, setShowAddAch] = useState(false);
  const [editingAchId, setEditingAchId] = useState(null);
  const [editingAchText, setEditingAchText] = useState('');
  const [achMediaFiles, setAchMediaFiles] = useState([]);
  const [achMediaPreviews, setAchMediaPreviews] = useState([]);
  const [isAchievementsEditMode, setIsAchievementsEditMode] = useState(false);

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setProfile({
        ...profile,
        skills: {
          ...profile.skills,
          [skillType]: [...profile.skills[skillType], newSkill.trim()]
        }
      });
      setNewSkill("");
      setIsAddingSkill(false);
    }
  };

  const handleRemoveSkill = (type, index) => {
    setProfile({
      ...profile,
      skills: {
        ...profile.skills,
        [type]: profile.skills[type].filter((_, i) => i !== index)
      }
    });
  };

  const handleNewPost = () => {
    if (postContent.trim()) {
      const newPost = {
        id: Date.now(),
        name: profile.name,
        headline: profile.headline,
        time: "now",
        content: postContent,
        media: mediaPreviews.map((preview, idx) => ({
          type: mediaFiles[idx].type.startsWith('image') ? 'image' : 'video',
          url: preview
        })),
        likes: 0,
        liked: false,
        comments: []
      };
      dispatch({ type: "ADD_POST", payload: newPost });
      setPostContent("");
      setMediaFiles([]);
      setMediaPreviews([]);
      setIsCreatingPost(false);
    }
  };

  const handleUpdatePost = (postId, updates) => {
    dispatch({ type: 'UPDATE_POST', payload: { postId, updates } });
  };

  const handleDeletePost = (postId) => {
    dispatch({ type: 'DELETE_POST', payload: postId });
  };

  // Experience CRUD (stored in local profile)
  const addExperience = (exp) => {
    setProfile((p) => ({ ...p, experience: [{ id: Date.now(), ...exp }, ...(p.experience || [])] }));
  };

  const updateExperience = (id, updates) => {
    setProfile((p) => ({ ...p, experience: p.experience.map(e => e.id === id ? { ...e, ...updates } : e) }));
  };

  const deleteExperience = (id) => {
    setProfile((p) => ({ ...p, experience: p.experience.filter(e => e.id !== id) }));
  };

  // Skills CRUD
  const addSkill = (type, skill) => {
    if (!skill) return;
    setProfile((p) => ({ ...p, skills: { ...p.skills, [type]: [...(p.skills[type] || []), skill] } }));
  };

  const updateSkill = (type, index, newValue) => {
    setProfile((p) => ({ ...p, skills: { ...p.skills, [type]: p.skills[type].map((s, i) => i === index ? newValue : s) } }));
  };

  const deleteSkill = (type, index) => {
    setProfile((p) => ({ ...p, skills: { ...p.skills, [type]: p.skills[type].filter((_, i) => i !== index) } }));
  };

  // Achievements CRUD
  const addAchievement = (text) => {
    if (!text) return;
    setProfile(p => ({ ...p, achievements: [{ id: Date.now(), text, media: achMediaPreviews.map((preview, idx) => ({ type: achMediaFiles[idx].type.startsWith('image') ? 'image' : 'video', url: preview })) }, ...(p.achievements || [])] }));
  };

  const updateAchievement = (id, text) => {
    setProfile(p => ({ ...p, achievements: p.achievements.map(a => a.id === id ? { ...a, text } : a) }));
  };

  const deleteAchievement = (id) => {
    setProfile(p => ({ ...p, achievements: (p.achievements || []).filter(a => a.id !== id) }));
  };

  const handlePostLike = (postId) => {
    setPostLikes(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    setMediaFiles(files);
    
    const previews = [];
    let loadedCount = 0;
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result);
        loadedCount++;
        if (loadedCount === files.length) {
          setMediaPreviews(previews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    try {
      localStorage.setItem('userProfileData', JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save profile to localStorage', e);
    }
  }, [profile]);

  const removeMedia = (index) => {
    setMediaFiles(mediaFiles.filter((_, i) => i !== index));
    setMediaPreviews(mediaPreviews.filter((_, i) => i !== index));
  };

  const handleAchMediaChange = (e) => {
    const files = Array.from(e.target.files);
    setAchMediaFiles(files);
    
    const previews = [];
    let loadedCount = 0;
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result);
        loadedCount++;
        if (loadedCount === files.length) {
          setAchMediaPreviews(previews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeAchMedia = (index) => {
    setAchMediaFiles(achMediaFiles.filter((_, i) => i !== index));
    setAchMediaPreviews(achMediaPreviews.filter((_, i) => i !== index));
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      // Clear only session storage (preserve local profile data)
      try { sessionStorage.clear(); } catch (e) {}
      navigate('/login');
    }
  };

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh", paddingTop: "20px", paddingBottom: "40px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", gap: 24, alignItems: "flex-start" }}>

        {/* LEFT SIDEBAR */}
        <aside style={{ width: 260, background: "white", borderRadius: 12, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "fit-content" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
              <img onClick={() => setActiveTab('details')} src={profile.profileImage} alt="profile" style={{ width: 120, height: 120, borderRadius: "50%", border: "4px solid white", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", cursor: 'pointer' }} />
            </div>
            <h3 style={{ textAlign: "center", margin: 0, fontSize: 18 }}>{profile.name}</h3>
            <p style={{ textAlign: "center", marginTop: 6, color: "#666", fontSize: 13 }}>{profile.headline}</p>

            <nav style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 8 }}>
              <button onClick={() => setActiveTab('posts')} style={{ textAlign: 'left', padding: '10px 12px', borderRadius: 8, border: 'none', background: activeTab === 'posts' ? '#e8f8ee' : 'transparent', cursor: 'pointer', fontWeight: 600 }}>→ Posts</button>
              <button onClick={() => { setIsAddingSkill(false); setActiveTab('skills'); }} style={{ textAlign: 'left', padding: '10px 12px', borderRadius: 8, border: 'none', background: activeTab === 'skills' ? '#e8f8ee' : 'transparent', cursor: 'pointer', fontWeight: 600 }}>→ Skills</button>
              <button onClick={() => setActiveTab('experience')} style={{ textAlign: 'left', padding: '10px 12px', borderRadius: 8, border: 'none', background: activeTab === 'experience' ? '#e8f8ee' : 'transparent', cursor: 'pointer', fontWeight: 600 }}>→ Experience</button>
              <button onClick={() => setActiveTab('achievements')} style={{ textAlign: 'left', padding: '10px 12px', borderRadius: 8, border: 'none', background: activeTab === 'achievements' ? '#e8f8ee' : 'transparent', cursor: 'pointer', fontWeight: 600 }}>→ Achievements</button>
            </nav>
          </div>

          <div style={{ marginTop: 18 }}>
            <button onClick={handleLogout} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', background: '#fff', cursor: 'pointer', color: '#c0392b', fontWeight: 700 }}>Logout</button>
          </div>
        </aside>

        {/* RIGHT PANEL */}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Show details only when activeTab === 'details' */}
          {activeTab === 'details' && (
            <div style={{ background: 'white', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
              {/* Cover Image Section */}
              <div style={{ background: profile.coverImage || 'linear-gradient(135deg, #667eea 0%, #d946ef 100%)', height: 200, position: 'relative', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <button onClick={() => { setEditForm({ name: profile.name, headline: profile.headline, about: profile.about, location: profile.location, phone: profile.phone, email: profile.email, college: profile.college, branch: profile.branch, batch: profile.batch }); setIsEditingProfile(true); }} style={{ position: 'absolute', right: 16, top: 16, background: 'white', border: 'none', width: 44, height: 44, borderRadius: '50%', boxShadow: '0 2px 8px rgba(0,0,0,0.12)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}><FiEdit2 color="#0A66C2" size={20} /></button>
              </div>

              {isEditingProfile ? (
                <div style={{ padding: 24 }}>
                  <h3 style={{ marginTop: 0, marginBottom: 20, fontSize: 18, fontWeight: 700 }}>Edit Profile</h3>
                  
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 6, color: '#333' }}>Cover Image</label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 12, border: '2px dashed #0A66C2', borderRadius: 8, cursor: 'pointer', backgroundColor: '#f0f8ff' }}>
                      <input type="file" accept="image/*" onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setProfile(p => ({ ...p, coverImage: reader.result }));
                          };
                          reader.readAsDataURL(file);
                        }
                      }} style={{ display: 'none' }} />
                      🖼️ Click to upload cover image
                    </label>
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 6, color: '#333' }}>Profile Image</label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 12, border: '2px dashed #0A66C2', borderRadius: 8, cursor: 'pointer', backgroundColor: '#f0f8ff' }}>
                      <input type="file" accept="image/*" onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setProfile(p => ({ ...p, profileImage: reader.result }));
                          };
                          reader.readAsDataURL(file);
                        }
                      }} style={{ display: 'none' }} />
                      📸 Click to upload profile image
                    </label>
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: '#333' }}>Name</label>
                    <input value={editForm.name} onChange={(e) => setEditForm(f => ({ ...f, name: e.target.value }))} style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 6, fontSize: 14, outline: 'none' }} />
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: '#333' }}>Headline (Professional Title)</label>
                    <input value={editForm.headline} onChange={(e) => setEditForm(f => ({ ...f, headline: e.target.value }))} placeholder="e.g., Software Engineer at Tech Corp" style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 6, fontSize: 14, outline: 'none' }} />
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: '#333' }}>Bio</label>
                    <textarea value={editForm.about} onChange={(e) => setEditForm(f => ({ ...f, about: e.target.value }))} placeholder="Tell us about yourself..." style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 6, fontSize: 14, minHeight: 100, outline: 'none', fontFamily: 'inherit' }} />
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: '#333' }}>Location</label>
                    <input value={editForm.location} onChange={(e) => setEditForm(f => ({ ...f, location: e.target.value }))} placeholder="City, Country" style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 6, fontSize: 14, outline: 'none' }} />
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: '#333' }}>Email</label>
                    <input value={editForm.email} onChange={(e) => setEditForm(f => ({ ...f, email: e.target.value }))} type="email" style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 6, fontSize: 14, outline: 'none' }} />
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: '#333' }}>Phone</label>
                    <input value={editForm.phone} onChange={(e) => setEditForm(f => ({ ...f, phone: e.target.value }))} style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 6, fontSize: 14, outline: 'none' }} />
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: '#333' }}>Batch</label>
                    <input value={editForm.batch} onChange={(e) => setEditForm(f => ({ ...f, batch: e.target.value }))} placeholder="e.g., 2023" style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 6, fontSize: 14, outline: 'none' }} />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: '#333' }}>Branch</label>
                    <input value={editForm.branch} onChange={(e) => setEditForm(f => ({ ...f, branch: e.target.value }))} placeholder="e.g., Computer Science" style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 6, fontSize: 14, outline: 'none' }} />
                  </div>

                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => { setProfile(p => ({ ...p, name: editForm.name, headline: editForm.headline, about: editForm.about, location: editForm.location, phone: editForm.phone, email: editForm.email, batch: editForm.batch, branch: editForm.branch })); setIsEditingProfile(false); }} style={{ padding: '12px 24px', background: '#0A66C2', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>Save Changes</button>
                    <button onClick={() => setIsEditingProfile(false)} style={{ padding: '12px 24px', background: '#f0f0f0', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div style={{ padding: 24, position: 'relative' }}>
                  <div style={{ display: 'flex', gap: 32 }}>
                    {/* Left Side - Profile Image */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 180 }}>
                      <div style={{ position: 'relative', display: 'inline-block', marginBottom: 16 }}>
                        <img src={profile.profileImage} alt="profile" style={{ width: 160, height: 160, borderRadius: '50%', border: '4px solid #0A66C2', boxShadow: '0 4px 12px rgba(0,0,0,0.12)', objectFit: 'cover' }} />
                        <label style={{ position: 'absolute', bottom: 0, right: 0, background: '#0A66C2', width: 48, height: 48, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '4px solid white', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}>
                          <input type="file" accept="image/*" onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setProfile(p => ({ ...p, profileImage: reader.result }));
                              };
                              reader.readAsDataURL(file);
                            }
                          }} style={{ display: 'none' }} />
                          <span style={{ color: 'white', fontSize: 20 }}>📷</span>
                        </label>
                      </div>
                    </div>

                    {/* Right Side - Information */}
                    <div style={{ flex: 1 }}>
                      {/* Name and Headline */}
                      <div style={{ marginBottom: 24 }}>
                        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 800, color: '#0A66C2' }}>{profile.name}</h1>
                        <p style={{ margin: '12px 0 0 0', fontSize: 17, color: '#666', fontWeight: 600 }}>{profile.headline}</p>
                      </div>

                      {/* Contact Information */}
                      <div style={{ backgroundColor: '#f9f9f9', borderRadius: 12, padding: 16, marginBottom: 20 }}>
                        <h3 style={{ margin: '0 0 12px 0', fontSize: 14, fontWeight: 700, color: '#333' }}>Contact Information</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#666' }}>
                            <FiMapPin size={18} style={{ color: '#0A66C2', flexShrink: 0 }} />
                            <span style={{ fontSize: 14 }}>{profile.location}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#666' }}>
                            <FiPhone size={18} style={{ color: '#0A66C2', flexShrink: 0 }} />
                            <span style={{ fontSize: 14 }}>{profile.phone}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#666' }}>
                            <FiMail size={18} style={{ color: '#0A66C2', flexShrink: 0 }} />
                            <span style={{ fontSize: 14 }}>{profile.email}</span>
                          </div>
                        </div>
                      </div>

                      {/* Bio Section */}
                      <div style={{ marginBottom: 20 }}>
                        <h3 style={{ margin: '0 0 8px 0', fontSize: 14, fontWeight: 700, color: '#333' }}>About</h3>
                        <p style={{ margin: 0, fontSize: 14, color: '#666', lineHeight: 1.6, backgroundColor: '#f9f9f9', padding: 12, borderRadius: 8 }}>{profile.about}</p>
                      </div>

                      {/* Education Info */}
                      <div style={{ backgroundColor: '#e8f4f8', borderRadius: 12, padding: 16 }}>
                        <h3 style={{ margin: '0 0 8px 0', fontSize: 14, fontWeight: 700, color: '#0A66C2' }}>📚 Education</h3>
                        <p style={{ margin: '4px 0', fontSize: 14, color: '#333', fontWeight: 600 }}>VVIT</p>
                        <p style={{ margin: '2px 0 0 0', fontSize: 13, color: '#666' }}>{profile.branch}</p>
                        <p style={{ margin: '2px 0 0 0', fontSize: 13, color: '#666' }}>Batch: {profile.batch}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Posts */}
          {activeTab === 'posts' && (
            <div style={{ background: 'white', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
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
                          {mediaFiles[i].type.startsWith('image') ? <img src={p} style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 6 }} /> : <video src={p} style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 6 }} />}
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
                      <PostCard post={post} profile={profile} openMenuId={openMenuId} setOpenMenuId={setOpenMenuId} dispatch={dispatch} onUpdate={handleUpdatePost} onDelete={handleDeletePost} onOpenModal={setSelectedPost} />
                    </div>
                  ))
                ) : (
                  // Carousel layout for 3+ posts
                  <div style={{ position: 'relative', width: '100%' }}>
                    <div style={{ overflow: 'hidden', borderRadius: 8 }}>
                      <div style={{ display: 'flex', transform: `translateX(-${postsCarouselIndex * 100}%)`, transition: 'transform 0.3s ease' }}>
                        {(state?.userPosts || []).map((post) => (
                          <div key={post.id} style={{ minWidth: '100%', flexShrink: 0, padding: '0 8px' }}>
                            <PostCard post={post} profile={profile} openMenuId={openMenuId} setOpenMenuId={setOpenMenuId} dispatch={dispatch} onUpdate={handleUpdatePost} onDelete={handleDeletePost} onOpenModal={setSelectedPost} />
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
          )}

          {/* Experience */}
          {activeTab === 'experience' && (
            <ExperienceSection experience={profile.experience} onAdd={addExperience} onUpdate={updateExperience} onDelete={deleteExperience} />
          )}

          {/* Skills */}
          {activeTab === 'skills' && (
            <SkillsSection skills={profile.skills} onAddSkill={(type, skill) => addSkill(type, skill)} onRemoveSkill={(type, index) => deleteSkill(type, index)} onUpdateSkill={(type, index, newVal) => updateSkill(type, index, newVal)} isAddingSkill={isAddingSkill} setIsAddingSkill={setIsAddingSkill} newSkill={newSkill} setNewSkill={setNewSkill} skillType={skillType} setSkillType={setSkillType} />
          )}

          {/* Achievements */}
          {activeTab === 'achievements' && (
            <div style={{ backgroundColor: "white", borderRadius: "16px", padding: "32px", marginBottom: "20px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
                <div>
                  <h2 style={{ fontSize: "24px", fontWeight: "800", margin: 0, color: "#1a1a1a" }}>🏆 Achievements</h2>
                  <p style={{ fontSize: "13px", color: "#999", marginTop: 8, textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>Professional Milestones</p>
                </div>
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <button onClick={() => setIsAchievementsEditMode(!isAchievementsEditMode)} style={{ padding: '8px 12px', borderRadius: '50%', background: 'white', border: 'none', width: 44, height: 44, boxShadow: '0 2px 8px rgba(0,0,0,0.12)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}><FiEdit2 color="#0A66C2" size={20} /></button>
                  <button
                    onClick={() => setShowAddAch(!showAddAch)}
                    style={{
                      backgroundColor: showAddAch ? "#c0392b" : "#0A66C2",
                      border: "none",
                      color: "white",
                      borderRadius: "8px",
                      padding: "10px 16px",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "700",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      transition: 'all 0.2s'
                    }}
                  >
                    {showAddAch ? '✕ Cancel' : <><FiPlus size={18} />Add Achievement</>}
                  </button>
                </div>
              </div>

              {/* Achievements List */}
              <div style={{ marginBottom: "28px" }}>
                {(profile.achievements || []).length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: '#f9f9f9', borderRadius: '12px' }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>🚀</div>
                    <p style={{ fontSize: 14, color: '#999', margin: 0 }}>No achievements added yet. Start showcasing your milestones!</p>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gap: '16px' }}>
                    {(profile.achievements || []).map((ach) => (
                      <div
                        key={ach.id}
                        style={{
                          backgroundColor: "#f9f9f9",
                          border: "2px solid #e0e0e0",
                          borderRadius: "12px",
                          padding: "20px",
                          transition: 'all 0.3s'
                        }}
                      >
                        {editingAchId === ach.id ? (
                          <div>
                            <textarea
                              value={editingAchText}
                              onChange={(e) => setEditingAchText(e.target.value)}
                              style={{
                                width: "100%",
                                padding: 12,
                                border: "1px solid #ddd",
                                borderRadius: 8,
                                minHeight: 80,
                                marginBottom: 12,
                                fontSize: 14,
                                fontFamily: 'inherit'
                              }}
                            />
                            <div style={{ display: 'flex', gap: 8 }}>
                              <button
                                onClick={() => {
                                  updateAchievement(ach.id, editingAchText);
                                  setEditingAchId(null);
                                  setEditingAchText('');
                                }}
                                style={{
                                  padding: '10px 16px',
                                  background: '#0A66C2',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: 6,
                                  cursor: 'pointer',
                                  fontWeight: 700
                                }}
                              >
                                Save
                              </button>
                              <button
                                onClick={() => {
                                  setEditingAchId(null);
                                  setEditingAchText('');
                                }}
                                style={{
                                  padding: '10px 16px',
                                  background: '#f0f0f0',
                                  border: 'none',
                                  borderRadius: 6,
                                  cursor: 'pointer',
                                  fontWeight: 700
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            {/* Achievement Text */}
                            <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                              <span style={{ fontSize: 28 }}>🏆</span>
                              <p style={{ fontSize: "15px", color: "#333", margin: 0, lineHeight: "1.6", fontWeight: 600, flex: 1 }}>{ach.text}</p>
                            </div>

                            {/* Achievement Media */}
                            {ach.media && ach.media.length > 0 && (
                              <div style={{ display: 'flex', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
                                {ach.media.map((m, i) => (
                                  <div key={i} style={{ borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                                    {m.type === 'image' ? (
                                      <img src={m.url} style={{ width: 140, height: 100, objectFit: 'cover' }} />
                                    ) : (
                                      <video src={m.url} style={{ width: 140, height: 100, objectFit: 'cover' }} />
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Edit/Delete Actions */}
                            {isAchievementsEditMode && (
                              <div style={{ display: 'flex', gap: 8 }}>
                                <button
                                  onClick={() => {
                                    setEditingAchId(ach.id);
                                    setEditingAchText(ach.text);
                                  }}
                                  style={{
                                    padding: '8px 12px',
                                    borderRadius: 6,
                                    border: '1px solid #0A66C2',
                                    background: 'transparent',
                                    color: '#0A66C2',
                                    cursor: 'pointer',
                                    fontSize: 13,
                                    fontWeight: 600
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => deleteAchievement(ach.id)}
                                  style={{
                                    padding: '8px 12px',
                                    borderRadius: 6,
                                    border: '1px solid #c0392b',
                                    background: 'transparent',
                                    color: '#c0392b',
                                    cursor: 'pointer',
                                    fontSize: 13,
                                    fontWeight: 600
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Add Achievement Form */}
              {showAddAch && (
                <div style={{ padding: "24px", backgroundColor: "#f9f9f9", borderRadius: "12px", border: "2px dashed #0A66C2" }}>
                  <h4 style={{ margin: '0 0 16px 0', fontSize: 14, fontWeight: 700, color: '#1a1a1a' }}>➕ Add New Achievement</h4>
                  <textarea
                    value={achText}
                    onChange={(e) => setAchText(e.target.value)}
                    placeholder="Describe your achievement..."
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      marginBottom: "12px",
                      fontSize: "14px",
                      minHeight: 100,
                      fontFamily: 'inherit'
                    }}
                  />
                  {achMediaPreviews.length > 0 && (
                    <div style={{ display: 'flex', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
                      {achMediaPreviews.map((p, i) => (
                        <div key={i} style={{ position: 'relative', borderRadius: 8, overflow: 'hidden' }}>
                          {achMediaFiles[i].type.startsWith('image') ? (
                            <img src={p} style={{ width: 120, height: 90, objectFit: 'cover' }} />
                          ) : (
                            <video src={p} style={{ width: 120, height: 90, objectFit: 'cover' }} />
                          )}
                          <button onClick={() => removeAchMedia(i)} style={{ position: 'absolute', right: 4, top: 4, background: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', width: 24, height: 24, borderRadius: 12, cursor: 'pointer', fontWeight: 700 }}>×</button>
                        </div>
                      ))}
                    </div>
                  )}
                  <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 12, border: '2px dashed #0A66C2', borderRadius: 8, background: '#f0f8ff', cursor: 'pointer', marginBottom: 12, fontWeight: 600, color: '#0A66C2' }}>
                    <input type="file" multiple accept="image/*,video/*" onChange={handleAchMediaChange} style={{ display: 'none' }} />
                    📸 Add images / videos
                  </label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={() => {
                        addAchievement(achText);
                        setAchText('');
                        setAchMediaFiles([]);
                        setAchMediaPreviews([]);
                        setShowAddAch(false);
                      }}
                      style={{
                        flex: 1,
                        backgroundColor: "#0A66C2",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        padding: "12px 16px",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "700"
                      }}
                    >
                      Save Achievement
                    </button>
                    <button
                      onClick={() => {
                        setShowAddAch(false);
                        setAchText('');
                        setAchMediaFiles([]);
                        setAchMediaPreviews([]);
                      }}
                      style={{
                        flex: 1,
                        backgroundColor: "#f0f0f0",
                        color: "#333",
                        border: "none",
                        borderRadius: "8px",
                        padding: "12px 16px",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: 700
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function ExperienceSection({ experience, onAdd, onUpdate, onDelete }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [form, setForm] = useState({ jobTitle: '', company: '', startDate: '', endDate: '', description: '', current: false });

  return (
    <div style={{ backgroundColor: "white", borderRadius: "16px", padding: "32px", marginBottom: "20px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
        <div>
          <h2 style={{ fontSize: "24px", fontWeight: "800", margin: 0, color: "#1a1a1a" }}>💼 Experience</h2>
          <p style={{ fontSize: "13px", color: "#999", marginTop: 8, textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>Professional Journey</p>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button onClick={() => setIsEditMode(!isEditMode)} style={{ padding: '8px 12px', borderRadius: '50%', background: 'white', border: 'none', width: 44, height: 44, boxShadow: '0 2px 8px rgba(0,0,0,0.12)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}><FiEdit2 color="#0A66C2" size={20} /></button>
          <button
            onClick={() => setIsAdding(!isAdding)}
            style={{
              backgroundColor: isAdding ? "#c0392b" : "#0A66C2",
              border: "none",
              color: "white",
              borderRadius: "8px",
              padding: "10px 16px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              transition: 'all 0.2s'
            }}
          >
            {isAdding ? '✕ Cancel' : <><FiPlus size={18} />Add Experience</>}
          </button>
        </div>
      </div>

      {/* Experience List */}
      <div style={{ marginBottom: "28px" }}>
        {(experience || []).length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: '#f9f9f9', borderRadius: '12px' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🚀</div>
            <p style={{ fontSize: 14, color: '#999', margin: 0 }}>No experience added yet. Start building your professional profile!</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '16px' }}>
            {(experience || []).map((exp) => (
              <div
                key={exp.id}
                style={{
                  backgroundColor: "#f9f9f9",
                  border: "2px solid #e0e0e0",
                  borderRadius: "12px",
                  padding: "20px",
                  transition: 'all 0.3s'
                }}
              >
                {editingId === exp.id ? (
                  <div>
                    <input
                      value={form.jobTitle}
                      onChange={(e) => setForm(f => ({ ...f, jobTitle: e.target.value }))}
                      placeholder="Job Title"
                      style={{
                        width: "100%",
                        padding: 12,
                        border: "1px solid #ddd",
                        borderRadius: 8,
                        marginBottom: 12,
                        fontSize: 14,
                        fontFamily: 'inherit'
                      }}
                    />
                    <input
                      value={form.company}
                      onChange={(e) => setForm(f => ({ ...f, company: e.target.value }))}
                      placeholder="Company"
                      style={{
                        width: "100%",
                        padding: 12,
                        border: "1px solid #ddd",
                        borderRadius: 8,
                        marginBottom: 12,
                        fontSize: 14,
                        fontFamily: 'inherit'
                      }}
                    />
                    <textarea
                      value={form.description}
                      onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
                      placeholder="Description"
                      style={{
                        width: "100%",
                        padding: 12,
                        border: "1px solid #ddd",
                        borderRadius: 8,
                        minHeight: 80,
                        marginBottom: 12,
                        fontSize: 14,
                        fontFamily: 'inherit'
                      }}
                    />
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        onClick={() => {
                          onUpdate(exp.id, form);
                          setEditingId(null);
                        }}
                        style={{
                          padding: '10px 16px',
                          background: '#0A66C2',
                          color: 'white',
                          border: 'none',
                          borderRadius: 6,
                          cursor: 'pointer',
                          fontWeight: 700
                        }}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        style={{
                          padding: '10px 16px',
                          background: '#f0f0f0',
                          border: 'none',
                          borderRadius: 6,
                          cursor: 'pointer',
                          fontWeight: 700
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Job Title and Company */}
                    <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
                      <span style={{ fontSize: 28 }}>💼</span>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: "16px", fontWeight: "700", margin: "0 0 4px 0", color: "#1a1a1a" }}>{exp.jobTitle}</h3>
                        <p style={{ fontSize: "14px", color: "#0A66C2", margin: "0 0 4px 0", fontWeight: 600 }}>{exp.company}</p>
                        <p style={{ fontSize: "13px", color: "#999", margin: 0 }}>
                          {exp.startDate} {exp.endDate && `- ${exp.current ? "Present" : exp.endDate}`}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    {exp.description && (
                      <p style={{ fontSize: "14px", color: "#666", margin: "12px 0 0 40px", lineHeight: "1.6" }}>{exp.description}</p>
                    )}

                    {/* Edit/Delete Actions */}
                    {isEditMode && (
                      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                        <button
                          onClick={() => {
                            setEditingId(exp.id);
                            setForm({
                              jobTitle: exp.jobTitle,
                              company: exp.company,
                              startDate: exp.startDate,
                              endDate: exp.endDate,
                              description: exp.description,
                              current: exp.current
                            });
                          }}
                          style={{
                            padding: '8px 12px',
                            borderRadius: 6,
                            border: '1px solid #0A66C2',
                            background: 'transparent',
                            color: '#0A66C2',
                            cursor: 'pointer',
                            fontSize: 13,
                            fontWeight: 600
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onDelete(exp.id)}
                          style={{
                            padding: '8px 12px',
                            borderRadius: 6,
                            border: '1px solid #c0392b',
                            background: 'transparent',
                            color: '#c0392b',
                            cursor: 'pointer',
                            fontSize: 13,
                            fontWeight: 600
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Experience Form */}
      {isAdding && (
        <div style={{ padding: "24px", backgroundColor: "#f9f9f9", borderRadius: "12px", border: "2px dashed #0A66C2" }}>
          <h4 style={{ margin: '0 0 16px 0', fontSize: 14, fontWeight: 700, color: '#1a1a1a' }}>➕ Add New Experience</h4>
          <input
            value={form.jobTitle}
            onChange={(e) => setForm(f => ({ ...f, jobTitle: e.target.value }))}
            type="text"
            placeholder="Job Title"
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              marginBottom: "12px",
              fontSize: "14px",
              fontFamily: 'inherit'
            }}
          />
          <input
            value={form.company}
            onChange={(e) => setForm(f => ({ ...f, company: e.target.value }))}
            type="text"
            placeholder="Company"
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              marginBottom: "12px",
              fontSize: "14px",
              fontFamily: 'inherit'
            }}
          />
          <textarea
            value={form.description}
            onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
            placeholder="Describe your role and achievements..."
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              marginBottom: "12px",
              fontSize: "14px",
              minHeight: 100,
              fontFamily: 'inherit'
            }}
          />
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => {
                onAdd(form);
                setIsAdding(false);
                setForm({ jobTitle: '', company: '', startDate: '', endDate: '', description: '', current: false });
              }}
              style={{
                flex: 1,
                backgroundColor: "#0A66C2",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "12px 16px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "700"
              }}
            >
              Save Experience
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setForm({ jobTitle: '', company: '', startDate: '', endDate: '', description: '', current: false });
              }}
              style={{
                flex: 1,
                backgroundColor: "#f0f0f0",
                color: "#333",
                border: "none",
                borderRadius: "8px",
                padding: "12px 16px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 700
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function SkillsSection({ skills, onAddSkill, onRemoveSkill, onUpdateSkill, isAddingSkill, setIsAddingSkill, newSkill, setNewSkill, skillType, setSkillType }) {
  const [editing, setEditing] = useState({ type: null, index: null });
  const [editValue, setEditValue] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <div style={{ backgroundColor: "white", borderRadius: "16px", padding: "32px", marginBottom: "20px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
        <div>
          <h2 style={{ fontSize: "24px", fontWeight: "800", margin: 0, color: "#1a1a1a" }}>💡 Skills</h2>
          <p style={{ fontSize: "13px", color: "#999", marginTop: 8, textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>Professional Expertise</p>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button onClick={() => setIsEditMode(!isEditMode)} style={{ padding: '8px 12px', borderRadius: '50%', background: 'white', border: 'none', width: 44, height: 44, boxShadow: '0 2px 8px rgba(0,0,0,0.12)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}><FiEdit2 color="#0A66C2" size={20} /></button>
          <button onClick={() => setIsAddingSkill(!isAddingSkill)} style={{ backgroundColor: "#0A66C2", border: "none", color: "white", borderRadius: "8px", padding: "10px 16px", cursor: "pointer", fontSize: "14px", fontWeight: "700", display: "flex", alignItems: "center", gap: "6px", transition: 'all 0.2s' }}><FiPlus size={18} />Add Skill</button>
        </div>
      </div>

      {/* Soft Skills Section */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div style={{ width: 4, height: 20, background: '#0A66C2', borderRadius: 2 }}></div>
          <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#1a1a1a", margin: 0 }}>Soft Skills</h3>
          <span style={{ fontSize: 12, background: '#f0f0f0', color: '#666', padding: '2px 8px', borderRadius: 12 }}>{skills.soft.length}</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {skills.soft.length === 0 ? (
            <p style={{ color: '#999', fontSize: 13 }}>No soft skills added yet</p>
          ) : (
            skills.soft.map((skill, index) => (
              <div key={index} style={{ backgroundColor: "#f0f8ff", border: "1px solid #0A66C2", padding: "10px 16px", borderRadius: "20px", fontSize: "14px", color: "#0A66C2", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px", transition: 'all 0.2s' }}>
                {editing.type === 'soft' && editing.index === index ? (
                  <>
                    <input value={editValue} onChange={(e) => setEditValue(e.target.value)} style={{ border: 'none', background: 'transparent', color: '#0A66C2', outline: 'none', fontWeight: 600 }} />
                    <button onClick={() => { onUpdateSkill('soft', index, editValue); setEditing({ type: null, index: null }); }} style={{ background: 'transparent', border: 'none', color: '#0A66C2', cursor: 'pointer', fontWeight: 700 }}>✓</button>
                    <button onClick={() => setEditing({ type: null, index: null })} style={{ background: 'transparent', border: 'none', color: '#999', cursor: 'pointer' }}>✕</button>
                  </>
                ) : (
                  <>
                    <span>•</span>
                    {skill}
                    {isEditMode && (
                      <>
                        <button onClick={() => { setEditing({ type: 'soft', index }); setEditValue(skill); }} style={{ backgroundColor: "transparent", border: "none", color: "#0A66C2", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", padding: "0", marginLeft: "4px", opacity: 0.6, hover: { opacity: 1 } }}><FiEdit2 size={14} /></button>
                        <button onClick={() => onRemoveSkill('soft', index)} style={{ backgroundColor: "transparent", border: "none", color: "#c0392b", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", padding: "0", opacity: 0.6 }}><FiX size={14} /></button>
                      </>
                    )}
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Technical Skills Section */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div style={{ width: 4, height: 20, background: '#0A66C2', borderRadius: 2 }}></div>
          <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#1a1a1a", margin: 0 }}>Technical Skills</h3>
          <span style={{ fontSize: 12, background: '#f0f0f0', color: '#666', padding: '2px 8px', borderRadius: 12 }}>{skills.technical.length}</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {skills.technical.length === 0 ? (
            <p style={{ color: '#999', fontSize: 13 }}>No technical skills added yet</p>
          ) : (
            skills.technical.map((skill, index) => (
              <div key={index} style={{ backgroundColor: "#f0f8ff", border: "1px solid #0A66C2", padding: "10px 16px", borderRadius: "20px", fontSize: "14px", color: "#0A66C2", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px", transition: 'all 0.2s' }}>
                {editing.type === 'technical' && editing.index === index ? (
                  <>
                    <input value={editValue} onChange={(e) => setEditValue(e.target.value)} style={{ border: 'none', background: 'transparent', color: '#0A66C2', outline: 'none', fontWeight: 600 }} />
                    <button onClick={() => { onUpdateSkill('technical', index, editValue); setEditing({ type: null, index: null }); }} style={{ background: 'transparent', border: 'none', color: '#0A66C2', cursor: 'pointer', fontWeight: 700 }}>✓</button>
                    <button onClick={() => setEditing({ type: null, index: null })} style={{ background: 'transparent', border: 'none', color: '#999', cursor: 'pointer' }}>✕</button>
                  </>
                ) : (
                  <>
                    <span>•</span>
                    {skill}
                    {isEditMode && (
                      <>
                        <button onClick={() => { setEditing({ type: 'technical', index }); setEditValue(skill); }} style={{ backgroundColor: "transparent", border: "none", color: "#0A66C2", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", padding: "0", marginLeft: "4px", opacity: 0.6 }}><FiEdit2 size={14} /></button>
                        <button onClick={() => onRemoveSkill('technical', index)} style={{ backgroundColor: "transparent", border: "none", color: "#c0392b", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", padding: "0", opacity: 0.6 }}><FiX size={14} /></button>
                      </>
                    )}
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add Skill Form */}
      {isAddingSkill && (
        <div style={{ padding: "24px", backgroundColor: "#f9f9f9", borderRadius: "12px", marginTop: "24px", border: "2px dashed #0A66C2" }}>
          <h4 style={{ margin: '0 0 16px 0', fontSize: 14, fontWeight: 700, color: '#1a1a1a' }}>➕ Add New Skill</h4>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "12px", fontWeight: "700", color: "#333", display: "block", marginBottom: "8px", textTransform: 'uppercase', letterSpacing: '0.5px' }}>Skill Category</label>
            <select value={skillType} onChange={(e) => setSkillType(e.target.value)} style={{ width: "100%", padding: "10px 12px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "14px", outline: "none", fontWeight: 600 }}>
              <option value="technical">Technical Skills</option>
              <option value="soft">Soft Skills</option>
            </select>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <input type="text" placeholder="e.g., React, JavaScript, Leadership..." value={newSkill} onChange={(e) => setNewSkill(e.target.value)} onKeyPress={(e) => e.key === "Enter" && onAddSkill(skillType, newSkill)} style={{ flex: 1, padding: "10px 12px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "14px", outline: "none" }} />
            <button onClick={() => { onAddSkill(skillType, newSkill); setNewSkill(''); setIsAddingSkill(false); }} style={{ backgroundColor: "#0A66C2", color: "white", border: "none", borderRadius: "8px", padding: "10px 20px", cursor: "pointer", fontSize: "14px", fontWeight: "700" }}>Add</button>
            <button onClick={() => { setIsAddingSkill(false); setNewSkill(""); }} style={{ backgroundColor: "#f0f0f0", color: "#333", border: "none", borderRadius: "8px", padding: "10px 20px", cursor: "pointer", fontSize: "14px", fontWeight: 700 }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

function PostPreview({ content, limit = 100 }) {
  const [expanded, setExpanded] = useState(false);
  if (!content) return null;
  const isLong = content.length > limit;
  return (
    <p style={{ fontSize: "13px", color: "#333", margin: "0 0 12px 0", lineHeight: "1.5", whiteSpace: "pre-wrap" }}>
      {isLong && !expanded ? content.slice(0, limit) + "... " : content}
      {isLong && (
        <span onClick={() => setExpanded((s) => !s)} style={{ color: "#0A66C2", cursor: "pointer", fontWeight: 600 }}>
          {expanded ? " show less" : "more"}
        </span>
      )}
    </p>
  );
}

function PostCard({ post, profile, openMenuId, setOpenMenuId, dispatch, postLikes, onOpenModal }) {
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