import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Layout/Layout";
import ProfileDetailSection from "../MainPages/ProfileDetailSection";
import PostsSection from "../MainPages/PostsSection";
import ExperienceSection from "../MainPages/ExperienceSection";
import SkillsSection from "../MainPages/SkillsSection";
import AchievementsSection from "../MainPages/AchievementsSection";
import ProfileSidebar from "../MainPages/ProfileSidebar";
import { getMyProfile, updateProfile } from "../../api/profileApi";

export default function Profile() {
  const { state, dispatch, profile, setProfile } = useContext(UserContext);
  const navigate = useNavigate();
  
  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', headline: '', about: '', location: '', phone: '', email: '', college: '', branch: '', batch: '' });
  
  // Posts State
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [mediaPreviews, setMediaPreviews] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [postsCarouselIndex, setPostsCarouselIndex] = useState(0);
  const [openMenuId, setOpenMenuId] = useState(null);
  
  // Skills State
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [skillType, setSkillType] = useState("technical");
  
  // Achievements State
  const [showAddAch, setShowAddAch] = useState(false);
  const [achText, setAchText] = useState('');
  const [achMediaFiles, setAchMediaFiles] = useState([]);
  const [achMediaPreviews, setAchMediaPreviews] = useState([]);
  const [editingAchId, setEditingAchId] = useState(null);
  const [editingAchText, setEditingAchText] = useState('');
  const [isAchievementsEditMode, setIsAchievementsEditMode] = useState(false);
  
  // Tab State
  const [activeTab, setActiveTab] = useState("details");

  // Posts CRUD
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

  // Experience CRUD
  const addExperience = (exp) => {
    const newExp = { id: Date.now(), ...exp };
    updateAndSync({ experience: [newExp, ...(profile.experience || [])] });
  };

  const updateExperience = (id, updates) => {
    const updatedExperience = profile.experience.map(e => e.id === id ? { ...e, ...updates } : e);
    updateAndSync({ experience: updatedExperience });
  };

  const deleteExperience = (id) => {
    const updatedExperience = profile.experience.filter(e => e.id !== id);
    updateAndSync({ experience: updatedExperience });
  };

  // Skills CRUD
  const addSkill = (type, skill) => {
    if (!skill) return;
    const updatedSkills = { ...profile.skills, [type]: [...(profile.skills[type] || []), skill] };
    updateAndSync({ skills: updatedSkills });
  };

  const updateSkill = (type, index, newValue) => {
    const updatedSkills = { ...profile.skills, [type]: profile.skills[type].map((s, i) => i === index ? newValue : s) };
    updateAndSync({ skills: updatedSkills });
  };

  const deleteSkill = (type, index) => {
    const updatedSkills = { ...profile.skills, [type]: profile.skills[type].filter((_, i) => i !== index) };
    updateAndSync({ skills: updatedSkills });
  };

  // Achievements CRUD
  const addAchievement = (text) => {
    if (!text) return;
    const newAchievement = { id: Date.now(), text, media: achMediaPreviews.map((preview, idx) => ({ type: achMediaFiles[idx].type.startsWith('image') ? 'image' : 'video', url: preview })) };
    setAchMediaFiles([]);
    setAchMediaPreviews([]);
    setShowAddAch(false);
    updateAndSync({ achievements: [newAchievement, ...(profile.achievements || [])] });
  };

  const updateAchievement = (id, text) => {
    const updatedAchievements = profile.achievements.map(a => a.id === id ? { ...a, text } : a);
    updateAndSync({ achievements: updatedAchievements });
  };

  const deleteAchievement = (id) => {
    const updatedAchievements = profile.achievements.filter(a => a.id !== id);
    updateAndSync({ achievements: updatedAchievements });
  };

  // Helper function to update and sync with backend
  const updateAndSync = async (updates) => {
    try {
      const newProfile = { ...profile, ...updates };
      setProfile(newProfile);
      await updateProfile(updates);
    } catch (error) {
      console.error('Error syncing profile:', error);
    }
  };

  // Media Handlers
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

  // Logout Handler
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      try { sessionStorage.clear(); } catch (e) {}
      navigate('/login');
    }
  };

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getMyProfile();
        setProfile(data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div style={{ backgroundColor: "white", minHeight: "100vh", paddingTop: "20px", paddingBottom: "40px", marginLeft: 300, marginTop: 70, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", gap: 0, width: "100%" }}>
        
        {/* LEFT SIDEBAR - Fixed Position */}
        <ProfileSidebar 
          profile={profile} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          handleLogout={handleLogout} 
        />

        {/* RIGHT PANEL */}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 900, paddingRight: 30, paddingLeft: 24 }}>
          
          {/* Profile Details Section */}
          {activeTab === 'details' && (
            <ProfileDetailSection 
              profile={profile}
              setProfile={setProfile}
              isEditingProfile={isEditingProfile}
              setIsEditingProfile={setIsEditingProfile}
              editForm={editForm}
              setEditForm={setEditForm}
            />
          )}

          {/* Posts Section */}
          {activeTab === 'posts' && (
            <PostsSection
              state={state}
              profile={profile}
              dispatch={dispatch}
              isCreatingPost={isCreatingPost}
              setIsCreatingPost={setIsCreatingPost}
              postContent={postContent}
              setPostContent={setPostContent}
              mediaPreviews={mediaPreviews}
              setMediaPreviews={setMediaPreviews}
              mediaFiles={mediaFiles}
              setMediaFiles={setMediaFiles}
              removeMedia={removeMedia}
              handleMediaChange={handleMediaChange}
              handleNewPost={handleNewPost}
              openMenuId={openMenuId}
              setOpenMenuId={setOpenMenuId}
              selectedPost={selectedPost}
              setSelectedPost={setSelectedPost}
              postsCarouselIndex={postsCarouselIndex}
              setPostsCarouselIndex={setPostsCarouselIndex}
              carouselIndex={carouselIndex}
              setCarouselIndex={setCarouselIndex}
              handleUpdatePost={handleUpdatePost}
              handleDeletePost={handleDeletePost}
            />
          )}

          {/* Experience Section */}
          {activeTab === 'experience' && (
            <ExperienceSection 
              experience={profile.experience} 
              onAdd={addExperience} 
              onUpdate={updateExperience} 
              onDelete={deleteExperience} 
            />
          )}

          {/* Skills Section */}
          {activeTab === 'skills' && (
            <SkillsSection 
              skills={profile.skills} 
              onAddSkill={(type, skill) => addSkill(type, skill)} 
              onRemoveSkill={(type, index) => deleteSkill(type, index)} 
              onUpdateSkill={(type, index, newVal) => updateSkill(type, index, newVal)} 
              isAddingSkill={isAddingSkill} 
              setIsAddingSkill={setIsAddingSkill} 
              newSkill={newSkill} 
              setNewSkill={setNewSkill} 
              skillType={skillType} 
              setSkillType={setSkillType} 
            />
          )}

          {/* Achievements Section */}
          {activeTab === 'achievements' && (
            <AchievementsSection
              profile={profile}
              setProfile={setProfile}
              editingAchId={editingAchId}
              setEditingAchId={setEditingAchId}
              editingAchText={editingAchText}
              setEditingAchText={setEditingAchText}
              isAchievementsEditMode={isAchievementsEditMode}
              setIsAchievementsEditMode={setIsAchievementsEditMode}
              showAddAch={showAddAch}
              setShowAddAch={setShowAddAch}
              achText={achText}
              setAchText={setAchText}
              achMediaFiles={achMediaFiles}
              achMediaPreviews={achMediaPreviews}
              handleAchMediaChange={handleAchMediaChange}
              removeAchMedia={removeAchMedia}
              addAchievement={addAchievement}
              updateAchievement={updateAchievement}
              deleteAchievement={deleteAchievement}
            />
          )}
        </main>
      </div>
    </div>
  );
}