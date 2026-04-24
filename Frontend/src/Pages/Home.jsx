import { useEffect, useState } from "react";
import SidebarLeft from "../Components/SidebarLeft";
import SidebarRight from "../Components/SidebarRight";
import CreatePost from "../Components/CreatePost";
import Post from "../Components/Post";
import { getAllPosts } from "../api/postApi";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const fetchPosts = async () => {
    const data = await getAllPosts();
    setPosts(Array.isArray(data) ? data : []);
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
        {!isMobile && <SidebarLeft />}

        <div
          style={{
            width: isMobile ? "100%" : "45%",
            height: isMobile ? "auto" : "calc(100vh - 100px)",
            overflowY: isMobile ? "visible" : "auto",
            paddingBottom: isMobile ? "90px" : "40px",
          }}
        >
          <CreatePost onPostCreated={fetchPosts} />
          {posts.map((post) => (
            <Post key={post._id} data={post} />
          ))}
        </div>

        {!isMobile && <SidebarRight />}
      </div>
    </div>
  );
}
