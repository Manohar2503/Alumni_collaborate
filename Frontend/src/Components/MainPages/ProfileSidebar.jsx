export default function ProfileSidebar({ profile, activeTab, setActiveTab, handleLogout }) {
  return (
    <aside style={{ position: "fixed", left: 0, top: 70, width: 260, background: "white", borderRadius: 0, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "calc(100vh - 70px)", overflowY: "auto", zIndex: 100 }}>
      <div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
          <img onClick={() => setActiveTab('details')} src={profile.profileImage} alt="profile" style={{ width: 120, height: 120, borderRadius: "50%", border: "4px solid white", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", cursor: 'pointer' }} />
        </div>
        <h3 style={{ textAlign: "center", margin: 0, fontSize: 18 }}>{profile.name}</h3>
        <p style={{ textAlign: "center", marginTop: 6, color: "#666", fontSize: 13 }}>{profile.headline}</p>

        <nav style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 8 }}>
          <button onClick={() => setActiveTab('posts')} style={{ textAlign: 'left', padding: '10px 12px', borderRadius: 8, border: 'none', background: activeTab === 'posts' ? '#e8f8ee' : 'transparent', cursor: 'pointer', fontWeight: 600 }}>→ Posts</button>
          <button onClick={() => setActiveTab('skills')} style={{ textAlign: 'left', padding: '10px 12px', borderRadius: 8, border: 'none', background: activeTab === 'skills' ? '#e8f8ee' : 'transparent', cursor: 'pointer', fontWeight: 600 }}>→ Skills</button>
          <button onClick={() => setActiveTab('experience')} style={{ textAlign: 'left', padding: '10px 12px', borderRadius: 8, border: 'none', background: activeTab === 'experience' ? '#e8f8ee' : 'transparent', cursor: 'pointer', fontWeight: 600 }}>→ Experience</button>
          <button onClick={() => setActiveTab('achievements')} style={{ textAlign: 'left', padding: '10px 12px', borderRadius: 8, border: 'none', background: activeTab === 'achievements' ? '#e8f8ee' : 'transparent', cursor: 'pointer', fontWeight: 600 }}>→ Achievements</button>
        </nav>
      </div>

      <div style={{ marginTop: 18 }}>
        <button onClick={handleLogout} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', background: '#fff', cursor: 'pointer', color: '#c0392b', fontWeight: 700 }}>Logout</button>
      </div>
    </aside>
  );
}
