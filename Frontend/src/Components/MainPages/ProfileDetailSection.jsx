import { useState } from "react";
import { FiEdit2, FiMapPin, FiPhone, FiMail } from "react-icons/fi";

export default function ProfileDetailSection({ 
  profile, 
  setProfile, 
  isEditingProfile, 
  setIsEditingProfile, 
  editForm, 
  setEditForm 
}) {
  return (
    <div style={{ background: 'white', borderRadius: 12, overflow: 'hidden', border: '1px solid #e5e5e5' }}>
      {/* Cover Image Section */}
      <div style={{ background: profile.coverImage || 'linear-gradient(135deg, #667eea 0%, #d946ef 100%)', height: 240, position: 'relative', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <button onClick={() => { setEditForm({ name: profile.name, headline: profile.headline, about: profile.about, location: profile.location, phone: profile.phone, email: profile.email, college: profile.college, branch: profile.branch, batch: profile.batch }); setIsEditingProfile(true); }} style={{ position: 'absolute', right: 16, top: 16, background: 'white', border: 'none', width: 44, height: 44, borderRadius: '50%', boxShadow: '0 2px 8px rgba(0,0,0,0.12)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}><FiEdit2 color="#0A66C2" size={20} /></button>
      </div>

      {isEditingProfile ? (
        <div style={{ padding: 32 }}>
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
            <button onClick={() => { setProfile(p => ({ ...p, name: editForm.name, headline: editForm.headline, about: editForm.about, location: editForm.location, phone: editForm.phone, email: editForm.email, batch: editForm.batch, branch: editForm.branch, college: editForm.college })); setIsEditingProfile(false); }} style={{ padding: '12px 24px', background: '#0A66C2', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>Save Changes</button>
            <button onClick={() => setIsEditingProfile(false)} style={{ padding: '12px 24px', background: '#f0f0f0', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>Cancel</button>
          </div>
        </div>
      ) : (
        <div style={{ padding: 32, position: 'relative' }}>
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
  );
}
