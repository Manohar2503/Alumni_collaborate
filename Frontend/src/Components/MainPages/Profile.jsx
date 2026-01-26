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
import { getMyPosts } from "../../api/postApi";

export default function Profile() {
  const { state, dispatch, profile, setProfile } = useContext(UserContext);
  const navigate = useNavigate();

  // ✅ Detect Mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // ✅ Mobile Resize Listener
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Fetch Profile + My Posts (ONLY ONE useEffect ✅)
  useEffect(() => {
    const fetchProfileAndPosts = async () => {
      try {
        const data = await getMyProfile();
        setProfile(data);

        const myPosts = await getMyPosts();
        dispatch({ type: "SET_USER_POSTS", payload: myPosts });
      } catch (error) {
        console.error("Failed to fetch profile/posts:", error);
      }
    };

    fetchProfileAndPosts();
  }, [dispatch, setProfile]);

  // ✅ Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    headline: "",
    about: "",
    location: "",
    phone: "",
    email: "",
    college: "",
    branch: "",
    batch: "",
  });

  // ✅ Posts State
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [mediaPreviews, setMediaPreviews] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [postsCarouselIndex, setPostsCarouselIndex] = useState(0);
  const [openMenuId, setOpenMenuId] = useState(null);

  // ✅ Skills State
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [skillType, setSkillType] = useState("technical");

  // ✅ Achievements State
  const [showAddAch, setShowAddAch] = useState(false);
  const [achText, setAchText] = useState("");
  const [achMediaFiles, setAchMediaFiles] = useState([]);
  const [achMediaPreviews, setAchMediaPreviews] = useState([]);
  const [editingAchId, setEditingAchId] = useState(null);
  const [editingAchText, setEditingAchText] = useState("");
  const [isAchievementsEditMode, setIsAchievementsEditMode] = useState(false);

  // ✅ Desktop Tab State
  const [activeTab, setActiveTab] = useState("details");

  // ✅ Logout Handler
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      try {
        sessionStorage.clear();
      } catch (e) {}
      navigate("/login");
    }
  };

  // ✅ Posts CRUD
  const handleNewPost = () => {
    if (postContent.trim()) {
      const newPost = {
        id: Date.now(),
        name: profile?.name,
        headline: profile?.headline,
        time: "now",
        content: postContent,
        media: mediaPreviews.map((preview, idx) => ({
          type: mediaFiles[idx].type.startsWith("image") ? "image" : "video",
          url: preview,
        })),
        likes: 0,
        liked: false,
        comments: [],
      };

      dispatch({ type: "ADD_POST", payload: newPost });
      setPostContent("");
      setMediaFiles([]);
      setMediaPreviews([]);
      setIsCreatingPost(false);
    }
  };

  const handleUpdatePost = (postId, updates) => {
    dispatch({ type: "UPDATE_POST", payload: { postId, updates } });
  };

  const handleDeletePost = (postId) => {
    dispatch({ type: "DELETE_POST", payload: postId });
  };

  // ✅ Experience CRUD
  const addExperience = (exp) => {
    const newExp = { id: Date.now(), ...exp };
    updateAndSync({ experience: [newExp, ...(profile?.experience || [])] });
  };

  const updateExperience = (id, updates) => {
    const updatedExperience = (profile?.experience || []).map((e) =>
      e.id === id ? { ...e, ...updates } : e
    );
    updateAndSync({ experience: updatedExperience });
  };

  const deleteExperience = (id) => {
    const updatedExperience = (profile?.experience || []).filter(
      (e) => e.id !== id
    );
    updateAndSync({ experience: updatedExperience });
  };

  // ✅ Skills CRUD
  const addSkill = (type, skill) => {
    if (!skill) return;

    const updatedSkills = {
      ...(profile?.skills || {}),
      [type]: [...((profile?.skills && profile.skills[type]) || []), skill],
    };

    updateAndSync({ skills: updatedSkills });
  };

  const updateSkill = (type, index, newValue) => {
    const updatedSkills = {
      ...(profile?.skills || {}),
      [type]: ((profile?.skills && profile.skills[type]) || []).map((s, i) =>
        i === index ? newValue : s
      ),
    };

    updateAndSync({ skills: updatedSkills });
  };

  const deleteSkill = (type, index) => {
    const updatedSkills = {
      ...(profile?.skills || {}),
      [type]: ((profile?.skills && profile.skills[type]) || []).filter(
        (_, i) => i !== index
      ),
    };

    updateAndSync({ skills: updatedSkills });
  };

  // ✅ Achievements CRUD
  const addAchievement = (text) => {
    if (!text) return;

    const newAchievement = {
      id: Date.now(),
      text,
      media: achMediaPreviews.map((preview, idx) => ({
        type: achMediaFiles[idx].type.startsWith("image") ? "image" : "video",
        url: preview,
      })),
    };

    setAchMediaFiles([]);
    setAchMediaPreviews([]);
    setShowAddAch(false);

    updateAndSync({
      achievements: [newAchievement, ...(profile?.achievements || [])],
    });
  };

  const updateAchievement = (id, text) => {
    const updatedAchievements = (profile?.achievements || []).map((a) =>
      a.id === id ? { ...a, text } : a
    );
    updateAndSync({ achievements: updatedAchievements });
  };

  const deleteAchievement = (id) => {
    const updatedAchievements = (profile?.achievements || []).filter(
      (a) => a.id !== id
    );
    updateAndSync({ achievements: updatedAchievements });
  };

  // ✅ Helper function to update and sync with backend
  const updateAndSync = async (updates) => {
    try {
      const newProfile = { ...(profile || {}), ...updates };
      setProfile(newProfile);
      await updateProfile(updates);
    } catch (error) {
      console.error("Error syncing profile:", error);
    }
  };

  // ✅ Media Handlers
  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    setMediaFiles(files);

    const previews = [];
    let loadedCount = 0;

    files.forEach((file) => {
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

    files.forEach((file) => {
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

  return (
    <div
      style={{
        backgroundColor: "#F3F2EF",
        minHeight: "100vh",
        marginLeft: isMobile ? 0 : 300,
        marginTop: isMobile ? 0 : 70,
        paddingTop: isMobile ? 12 : 20,
        paddingBottom: isMobile ? 90 : 40,
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", width: "100%" }}>
        {/* ✅ SIDEBAR ONLY IN DESKTOP */}
        {!isMobile && (
          <ProfileSidebar
            profile={profile}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            handleLogout={handleLogout}
          />
        )}

        {/* ✅ MAIN CONTENT */}
        <main
          style={{
            flex: 1,
            width: "100%",
            maxWidth: isMobile ? "100%" : 900,
            paddingLeft: isMobile ? 12 : 24,
            paddingRight: isMobile ? 12 : 30,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {/* ✅ MOBILE = show all sections */}
          {isMobile ? (
            <>
              <ProfileDetailSection
                profile={profile}
                setProfile={setProfile}
                isEditingProfile={isEditingProfile}
                setIsEditingProfile={setIsEditingProfile}
                editForm={editForm}
                setEditForm={setEditForm}
                isMobile={true}
              />

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

              <ExperienceSection
                experience={profile?.experience}
                onAdd={addExperience}
                onUpdate={updateExperience}
                onDelete={deleteExperience}
              />

              <SkillsSection
                skills={profile?.skills}
                onAddSkill={(type, skill) => addSkill(type, skill)}
                onRemoveSkill={(type, index) => deleteSkill(type, index)}
                onUpdateSkill={(type, index, newVal) =>
                  updateSkill(type, index, newVal)
                }
                isAddingSkill={isAddingSkill}
                setIsAddingSkill={setIsAddingSkill}
                newSkill={newSkill}
                setNewSkill={setNewSkill}
                skillType={skillType}
                setSkillType={setSkillType}
              />

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
            </>
          ) : (
            <>
              {/* ✅ Desktop Tabs */}
              {activeTab === "details" && (
                <ProfileDetailSection
                  profile={profile}
                  setProfile={setProfile}
                  isEditingProfile={isEditingProfile}
                  setIsEditingProfile={setIsEditingProfile}
                  editForm={editForm}
                  setEditForm={setEditForm}
                />
              )}

              {activeTab === "posts" && (
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

              {activeTab === "experience" && (
                <ExperienceSection
                  experience={profile?.experience}
                  onAdd={addExperience}
                  onUpdate={updateExperience}
                  onDelete={deleteExperience}
                />
              )}

              {activeTab === "skills" && (
                <SkillsSection
                  skills={profile?.skills}
                  onAddSkill={(type, skill) => addSkill(type, skill)}
                  onRemoveSkill={(type, index) => deleteSkill(type, index)}
                  onUpdateSkill={(type, index, newVal) =>
                    updateSkill(type, index, newVal)
                  }
                  isAddingSkill={isAddingSkill}
                  setIsAddingSkill={setIsAddingSkill}
                  
                  newSkill={newSkill}
                  setNewSkill={setNewSkill}
                  skillType={skillType}
                  setSkillType={setSkillType}
                />
              )}

              {activeTab === "achievements" && (
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
            </>
          )}
        </main>
      </div>
    </div>
  );
}
