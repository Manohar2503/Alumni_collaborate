import { useEffect, useState } from "react";
import axios from "axios";
import SidebarLeft from "../Components/SidebarLeft";
import SidebarRight from "../Components/SidebarRight";
import CreatePost from "../Components/CreatePost";
import Post from "../Components/Post";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const fetchPosts = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_URL}/posts`,
      { withCredentials: true }
    );
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", backgroundColor: "#F3F2EF", minHeight: "100vh" }}>
      <div
        style={{
          maxWidth: "1200px",
          width: "100%",
          display: "flex",
          gap: "20px",
          marginTop: "20px",
          padding: "0 16px",
        }}
      >
        {/* ✅ Left Sidebar only for desktop */}
        {!isMobile && <SidebarLeft />}

        {/* ✅ Feed width changes only in mobile */}
        <div
          style={{
            width: isMobile ? "100%" : "45%",
            height: isMobile ? "auto" : "calc(100vh - 100px)",
            overflowY: isMobile ? "visible" : "auto",
            paddingBottom: isMobile ? "90px" : "40px", // ✅ for bottom navbar space
          }}
        >
          <CreatePost onPostCreated={fetchPosts} />
          {posts.map((post) => (
            <Post key={post._id} data={post} />
          ))}
        </div>

        {/* ✅ Right Sidebar only for desktop */}
        {!isMobile && <SidebarRight />}
      </div>
    </div>
  );
}
