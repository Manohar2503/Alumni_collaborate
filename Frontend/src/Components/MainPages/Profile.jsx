import { useState, useContext } from "react";
import { FiEdit2, FiMapPin, FiPhone, FiMail, FiPlus, FiX, FiHeart, FiMessageCircle, FiShare2 } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { userProfileData } from "../../data/userProfile";
import { UserContext } from "../../Layout/Layout";

export default function Profile() {
  const { state, dispatch } = useContext(UserContext);
  const [profile, setProfile] = useState(userProfileData);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingExperience, setIsAddingExperience] = useState(false);
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [skillType, setSkillType] = useState("technical");
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [activeTab, setActiveTab] = useState("posts");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [mediaPreviews, setMediaPreviews] = useState([]);

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

  const removeMedia = (index) => {
    setMediaFiles(mediaFiles.filter((_, i) => i !== index));
    setMediaPreviews(mediaPreviews.filter((_, i) => i !== index));
  };

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh", paddingTop: "20px", paddingBottom: "40px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Profile Header */}
        <div style={{ backgroundColor: "white", borderRadius: "12px", overflow: "hidden", marginBottom: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          {/* Cover Image */}
          <div
            style={{
              background: profile.coverImage,
              height: "200px",
              position: "relative"
            }}
          >
            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                backgroundColor: "white",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
              }}
            >
              <FiEdit2 size={20} color="#0A66C2" />
            </button>
          </div>

          {/* Profile Info */}
          <div style={{ position: "relative", padding: "0 24px 24px 24px" }}>
            <div style={{ display: "flex", gap: "20px", marginTop: "-50px", marginBottom: "20px", alignItems: "flex-end" }}>
              <img
                src={profile.profileImage}
                alt="Profile"
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  border: "4px solid white",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                }}
              />
              <div>
                <h1 style={{ fontSize: "28px", fontWeight: "700", margin: "0", color: "#000" }}>{profile.name}</h1>
                <p style={{ fontSize: "16px", color: "#666", margin: "4px 0 0 0" }}>{profile.headline}</p>
              </div>
            </div>

            {/* Info Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#666" }}>
                <FiMapPin size={16} />
                {profile.location}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#666" }}>
                <FiMail size={16} />
                {profile.email}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#666" }}>
                <FiPhone size={16} />
                {profile.phone}
              </div>
              <div style={{ fontSize: "14px", color: "#0A66C2", fontWeight: "600" }}>
                {profile.connections} connections
              </div>
            </div>

            {/* About Section */}
            <div style={{ marginTop: "20px", paddingTop: "20px", borderTop: "1px solid #e0e0e0" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px 0" }}>About</h3>
              <p style={{ fontSize: "14px", color: "#666", margin: 0, lineHeight: "1.6" }}>{profile.about}</p>
            </div>

            {/* College Info */}
            <div style={{ marginTop: "16px" }}>
              <p style={{ fontSize: "14px", color: "#0A66C2", fontWeight: "600", margin: 0 }}>
                📚 {profile.college}
              </p>
              <p style={{ fontSize: "13px", color: "#666", margin: "4px 0 0 0" }}>
                Batch: {profile.batch} | Branch: {profile.branch}
              </p>
            </div>
          </div>
        </div>

        {/* Activity/Posts Section */}
        <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "24px", marginBottom: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
            <div>
              <h2 style={{ fontSize: "24px", fontWeight: "700", margin: "0 0 8px 0" }}>Activity</h2>
              <p style={{ fontSize: "14px", color: "#0A66C2", margin: 0 }}>731 followers</p>
            </div>
            <button
              onClick={() => setIsCreatingPost(true)}
              style={{
                backgroundColor: "white",
                color: "#0A66C2",
                border: "2px solid #0A66C2",
                borderRadius: "20px",
                padding: "8px 20px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "6px"
              }}
            >
              Create a post
            </button>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: "16px", marginBottom: "20px", borderBottom: "1px solid #e0e0e0", paddingBottom: "12px" }}>
            <button
              onClick={() => setActiveTab("posts")}
              style={{
                backgroundColor: activeTab === "posts" ? "#0B7839" : "white",
                color: activeTab === "posts" ? "white" : "#666",
                border: activeTab === "posts" ? "none" : "1px solid #ccc",
                borderRadius: "20px",
                padding: "8px 16px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "600"
              }}
            >
              Posts
            </button>
            <button
              onClick={() => setActiveTab("comments")}
              style={{
                backgroundColor: "white",
                color: "#666",
                border: "1px solid #ccc",
                borderRadius: "20px",
                padding: "8px 16px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "600"
              }}
            >
              Comments
            </button>
            <button
              onClick={() => setActiveTab("images")}
              style={{
                backgroundColor: "white",
                color: "#666",
                border: "1px solid #ccc",
                borderRadius: "20px",
                padding: "8px 16px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "600"
              }}
            >
              Images
            </button>
          </div>

          {/* Create Post Form */}
          {isCreatingPost && (
            <div style={{ padding: "16px", backgroundColor: "#f9f9f9", borderRadius: "8px", marginBottom: "20px", border: "1px solid #ddd" }}>
              <textarea
                placeholder="What's on your mind?"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontFamily: "inherit",
                  resize: "vertical",
                  minHeight: "80px",
                  outline: "none"
                }}
              />

              {/* Media Previews */}
              {mediaPreviews.length > 0 && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))", gap: "8px", marginTop: "12px", marginBottom: "12px" }}>
                  {mediaPreviews.map((preview, idx) => (
                    <div key={idx} style={{ position: "relative", borderRadius: "6px", overflow: "hidden", backgroundColor: "#e0e0e0" }}>
                      {mediaFiles[idx].type.startsWith('image') ? (
                        <img src={preview} alt="preview" style={{ width: "100%", height: "80px", objectFit: "cover" }} />
                      ) : (
                        <video src={preview} style={{ width: "100%", height: "80px", objectFit: "cover" }} />
                      )}
                      <button
                        onClick={() => removeMedia(idx)}
                        style={{
                          position: "absolute",
                          top: "2px",
                          right: "2px",
                          backgroundColor: "rgba(0,0,0,0.7)",
                          color: "white",
                          border: "none",
                          borderRadius: "50%",
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px"
                        }}
                      >
                        <FiX size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* File Upload */}
              <label style={{ display: "block", marginBottom: "12px", cursor: "pointer" }}>
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleMediaChange}
                  style={{ display: "none" }}
                />
                <div style={{
                  padding: "12px",
                  backgroundColor: "#e8f4f8",
                  border: "2px dashed #0A66C2",
                  borderRadius: "6px",
                  textAlign: "center",
                  color: "#0A66C2",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: "600"
                }}>
                  📸 Add Images or Videos
                </div>
              </label>

              <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                <button
                  onClick={handleNewPost}
                  style={{
                    backgroundColor: "#0A66C2",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    padding: "8px 16px",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: "600"
                  }}
                >
                  Post
                </button>
                <button
                  onClick={() => {
                    setIsCreatingPost(false);
                    setPostContent("");
                    setMediaFiles([]);
                    setMediaPreviews([]);
                  }}
                  style={{
                    backgroundColor: "#f0f0f0",
                    color: "#333",
                    border: "none",
                    borderRadius: "6px",
                    padding: "8px 16px",
                    cursor: "pointer",
                    fontSize: "13px"
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Posts Grid or Carousel */}
          {activeTab === "posts" && (
            <>
              {(state?.userPosts || []).length === 0 ? (
                <p style={{ textAlign: "center", color: "#999", padding: "20px" }}>
                  No posts yet. Create one to get started!
                </p>
              ) : (state?.userPosts || []).length <= 2 ? (
                // Grid layout for 2 or fewer posts
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  {(state?.userPosts || []).map((post) => (
                    <PostCard key={post.id} post={post} profile={profile} openMenuId={openMenuId} setOpenMenuId={setOpenMenuId} dispatch={dispatch} />
                  ))}
                </div>
              ) : (
                // Carousel layout for more than 2 posts
                <div style={{ position: "relative", display: "flex", alignItems: "center", gap: "16px", paddingLeft: "60px", paddingRight: "60px" }}>
                  <button
                    onClick={() => setCarouselIndex((i) => (i - 1 + (state?.userPosts || []).length) % (state?.userPosts || []).length)}
                    style={{
                      position: "absolute",
                      left: "0px",
                      background: "#999",
                      border: "none",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      fontSize: "24px",
                      color: "white",
                      zIndex: 10
                    }}
                  >
                    ‹
                  </button>

                  <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    {[0, 1].map((offset) => {
                      const idx = (carouselIndex + offset) % (state?.userPosts || []).length;
                      const post = (state?.userPosts || [])[idx];
                      return post ? <PostCard key={post.id} post={post} profile={profile} openMenuId={openMenuId} setOpenMenuId={setOpenMenuId} dispatch={dispatch} /> : null;
                    })}
                  </div>

                  <button
                    onClick={() => setCarouselIndex((i) => (i + 1) % (state?.userPosts || []).length)}
                    style={{
                      position: "absolute",
                      right: "0px",
                      background: "#999",
                      border: "none",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      fontSize: "24px",
                      color: "white",
                      zIndex: 10
                    }}
                  >
                    ›
                  </button>
                </div>
              )}
            </>
          )}

          {activeTab === "comments" && (
            <p style={{ textAlign: "center", color: "#999", padding: "20px" }}>
              No comments yet
            </p>
          )}

          {activeTab === "images" && (
            <p style={{ textAlign: "center", color: "#999", padding: "20px" }}>
              No images yet
            </p>
          )}
        </div>

        {/* Experience Section */}
        <ExperienceSection experience={profile.experience} />

        {/* Skills Section */}
        <SkillsSection
          skills={profile.skills}
          onAddSkill={handleAddSkill}
          onRemoveSkill={handleRemoveSkill}
          isAddingSkill={isAddingSkill}
          setIsAddingSkill={setIsAddingSkill}
          newSkill={newSkill}
          setNewSkill={setNewSkill}
          skillType={skillType}
          setSkillType={setSkillType}
        />
      </div>
    </div>
  );
}

function ExperienceSection({ experience }) {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "24px", marginBottom: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "700", margin: 0 }}>Experience</h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          style={{
            backgroundColor: "transparent",
            border: "1px solid #0A66C2",
            color: "#0A66C2",
            borderRadius: "20px",
            padding: "8px 16px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "4px"
          }}
        >
          <FiPlus size={18} />
          Add experience
        </button>
      </div>

      <p style={{ fontSize: "13px", color: "#666", marginBottom: "16px" }}>
        Showcase your accomplishments and get up to 2X as many profile views and connections
      </p>

      {experience.map((exp) => (
        <div
          key={exp.id}
          style={{
            display: "flex",
            gap: "16px",
            paddingBottom: "16px",
            marginBottom: "16px",
            borderBottom: "1px solid #e0e0e0"
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "8px",
              backgroundColor: "#e0e0e0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              flexShrink: 0
            }}
          >
            💼
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: "15px", fontWeight: "600", margin: "0 0 4px 0" }}>{exp.jobTitle}</h4>
            <p style={{ fontSize: "13px", color: "#666", margin: "0 0 4px 0" }}>
              {exp.company}
            </p>
            <p style={{ fontSize: "12px", color: "#999", margin: 0 }}>
              {exp.startDate} - {exp.current ? "Present" : exp.endDate}
            </p>
            <p style={{ fontSize: "13px", color: "#666", margin: "8px 0 0 0", lineHeight: "1.5" }}>{exp.description}</p>
          </div>
        </div>
      ))}

      {isAdding && (
        <div style={{ padding: "16px", backgroundColor: "#f9f9f9", borderRadius: "8px", marginTop: "16px" }}>
          <input
            type="text"
            placeholder="Job Title"
            style={{
              width: "100%",
              padding: "8px 12px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginBottom: "8px",
              fontSize: "13px"
            }}
          />
          <input
            type="text"
            placeholder="Company"
            style={{
              width: "100%",
              padding: "8px 12px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginBottom: "8px",
              fontSize: "13px"
            }}
          />
          <button
            style={{
              backgroundColor: "#0A66C2",
              color: "white",
              border: "none",
              borderRadius: "6px",
              padding: "8px 16px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: "600"
            }}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}

function SkillsSection({
  skills,
  onAddSkill,
  onRemoveSkill,
  isAddingSkill,
  setIsAddingSkill,
  newSkill,
  setNewSkill,
  skillType,
  setSkillType
}) {
  return (
    <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "24px", marginBottom: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "700", margin: 0 }}>Skills</h2>
        <button
          onClick={() => setIsAddingSkill(!isAddingSkill)}
          style={{
            backgroundColor: "transparent",
            border: "1px solid #0A66C2",
            color: "#0A66C2",
            borderRadius: "20px",
            padding: "8px 16px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "4px"
          }}
        >
          <FiPlus size={18} />
          Add skills
        </button>
      </div>

      <p style={{ fontSize: "13px", color: "#666", marginBottom: "20px" }}>
        Communicate your fit for new opportunities – 50% of hirers use skills data to fill their roles
      </p>

      {/* Soft Skills */}
      <div style={{ marginBottom: "24px" }}>
        <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#666", marginBottom: "12px" }}>Soft skills</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {skills.soft.map((skill, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#f0f0f0",
                padding: "8px 12px",
                borderRadius: "20px",
                fontSize: "13px",
                color: "#666",
                display: "flex",
                alignItems: "center",
                gap: "6px"
              }}
            >
              {skill}
              <button
                onClick={() => onRemoveSkill("soft", index)}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "#999",
                  cursor: "pointer",
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  padding: "0",
                  marginLeft: "4px"
                }}
              >
                <FiX size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Skills */}
      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#666", marginBottom: "12px" }}>Technical skills</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {skills.technical.map((skill, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#f0f0f0",
                padding: "8px 12px",
                borderRadius: "20px",
                fontSize: "13px",
                color: "#666",
                display: "flex",
                alignItems: "center",
                gap: "6px"
              }}
            >
              {skill}
              <button
                onClick={() => onRemoveSkill("technical", index)}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "#999",
                  cursor: "pointer",
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  padding: "0",
                  marginLeft: "4px"
                }}
              >
                <FiX size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Add Skill Form */}
      {isAddingSkill && (
        <div style={{
          padding: "16px",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          marginTop: "16px",
          border: "1px solid #ddd"
        }}>
          <div style={{ marginBottom: "12px" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#333", display: "block", marginBottom: "6px" }}>
              Skill Type
            </label>
            <select
              value={skillType}
              onChange={(e) => setSkillType(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                fontSize: "13px",
                outline: "none"
              }}
            >
              <option value="technical">Technical Skills</option>
              <option value="soft">Soft Skills</option>
            </select>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              type="text"
              placeholder="Enter skill name"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && onAddSkill()}
              style={{
                flex: 1,
                padding: "8px 12px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                fontSize: "13px",
                outline: "none"
              }}
            />
            <button
              onClick={onAddSkill}
              style={{
                backgroundColor: "#0A66C2",
                color: "white",
                border: "none",
                borderRadius: "6px",
                padding: "8px 16px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "600"
              }}
            >
              Add
            </button>
            <button
              onClick={() => {
                setIsAddingSkill(false);
                setNewSkill("");
              }}
              style={{
                backgroundColor: "#f0f0f0",
                color: "#333",
                border: "none",
                borderRadius: "6px",
                padding: "8px 16px",
                cursor: "pointer",
                fontSize: "13px"
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

function PostCard({ post, profile, openMenuId, setOpenMenuId, dispatch, postLikes }) {
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
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        padding: "16px",
        backgroundColor: "#f9f9f9"
      }}
    >
      <div style={{ display: "flex", gap: "12px", marginBottom: "12px", alignItems: "flex-start" }}>
        <img
          src={profile.profileImage}
          alt={post.name}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%"
          }}
        />
        <div style={{ flex: 1 }}>
          <h4 style={{ fontSize: "13px", fontWeight: "600", margin: "0" }}>
            {post.name}
          </h4>
          <p style={{ fontSize: "11px", color: "#666", margin: "2px 0 0 0" }}>
            {post.time}
          </p>
        </div>
        <div style={{ position: 'relative' }}>
          <button onClick={() => setOpenMenuId(openMenuId === post.id ? null : post.id)} style={{ backgroundColor: "transparent", border: "none", cursor: "pointer", fontSize: "16px" }}>
            ⋯
          </button>
          {openMenuId === post.id && (
            <div style={{ position: 'absolute', right: 0, top: 22, background: 'white', boxShadow: '0 6px 18px rgba(0,0,0,0.08)', borderRadius: 6, zIndex: 30 }}>
              <button
                onClick={() => {
                  setOpenMenuId(null);
                  if (window.confirm('Delete this post?')) {
                    dispatch({ type: 'DELETE_POST', payload: post.id });
                  }
                }}
                style={{ display: 'block', padding: '8px 12px', border: 'none', background: 'transparent', cursor: 'pointer', width: 140, textAlign: 'left' }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <PostPreview content={post.content} limit={100} />

      {post.media && post.media.length > 0 && (
        <div style={{ marginBottom: "12px" }}>
          <img
            src={post.media[0].url}
            alt="post"
            style={{
              width: "100%",
              height: "150px",
              borderRadius: "6px",
              objectFit: "cover"
            }}
          />
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "8px", borderTop: "1px solid #e0e0e0", fontSize: "12px", color: "#666" }}>
        <button
          onClick={handleLike}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "12px",
            color: post.liked ? "#0A66C2" : "#666",
            fontWeight: post.liked ? "600" : "400"
          }}
        >
          👍 {post.likes || 0}
        </button>
        <span>💬 {post.comments.length}</span>
      </div>
    </div>
  );
}