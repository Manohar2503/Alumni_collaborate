import { useEffect, useState } from "react";
import axios from "axios";
import SidebarLeft from "../Components/SidebarLeft";
import SidebarRight from "../Components/SidebarRight";
import CreatePost from "../Components/CreatePost";
import Post from "../Components/Post";

export default function Home() {
  const [posts, setPosts] = useState([]);

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

  return (
     <div style={{ display: "flex", justifyContent: "center", backgroundColor: "#F3F2EF", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1200px", width: "100%", display: "flex", gap: "20px", marginTop: "20px", padding: "0 16px" }}>
        
        <SidebarLeft />

        <div style={{ width: "45%", height: "calc(100vh - 100px)", overflowY: "auto", paddingBottom: "40px" }}>
         <CreatePost onPostCreated={fetchPosts} />
          {posts.map((post) => (
            <Post key={post.id} data={post} />
          ))}
        </div>

        <SidebarRight />

      </div>
    </div>
  );
}


