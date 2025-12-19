import { useEffect, useState } from "react";
import SidebarLeft from "../Components/SidebarLeft";
import SidebarRight from "../Components/SidebarRight";
import CreatePost from "../Components/CreatePost";
import Post from "../Components/Post";
import axios from "axios";

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
    <div style={{ display: "flex", justifyContent: "center", background: "#F3F2EF" }}>
      <div style={{ maxWidth: 1200, width: "100%", display: "flex", gap: 20, marginTop: 20 }}>
        <SidebarLeft />

        <div style={{ width: "50%" }}>
          <CreatePost onPostCreated={(p) => setPosts([p, ...posts])} />

          {posts.map((p) => (
            <Post key={p._id} data={p} />
          ))}
        </div>

        <SidebarRight />
      </div>
    </div>
  );
}
