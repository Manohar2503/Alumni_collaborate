import { useContext, useEffect, useState } from "react";
import SidebarLeft from "../Components/SidebarLeft";
import SidebarRight from "../Components/SidebarRight";
import CreatePost from "../Components/CreatePost";
import Post from "../Components/Post";
import axios from "axios";
import { UserContext } from "../Layout/Layout";

export default function Home() {
  const { state } = useContext(UserContext);
  const [posts, setPosts] = useState([]);

  // Fetch posts from backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/posts`,
          { withCredentials: true }
        );
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to load posts", err);
      }
    };

    fetchPosts();
  }, []);

  const handleNewPost = (post) => {
    setPosts((prev) => [post, ...prev]);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", backgroundColor: "#F3F2EF", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1200px", width: "100%", display: "flex", gap: "20px", marginTop: "20px", padding: "0 16px" }}>
        
        <SidebarLeft />

        <div style={{ width: "50%", height: "calc(100vh - 100px)", overflowY: "auto", paddingBottom: "40px" }}>
          
          <CreatePost onPostCreated={handleNewPost} />

          {posts.length === 0 ? (
            <p style={{ textAlign: "center", color: "#777" }}>No posts yet</p>
          ) : (
            posts.map((p) => (
              <Post key={p._id} data={p} />
            ))
          )}
        </div>

        <SidebarRight />
      </div>
    </div>
  );
}
