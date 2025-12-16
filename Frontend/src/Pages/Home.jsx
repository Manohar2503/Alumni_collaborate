import { useContext, useMemo } from "react";
import SidebarLeft from "../Components/SidebarLeft";
import SidebarRight from "../Components/SidebarRight";
import CreatePost from "../Components/CreatePost";
import Post from "../Components/Post";
import { posts as staticPosts } from "../data/posts";
import { UserContext } from "../Layout/Layout";

export default function Home() {
  const { state } = useContext(UserContext);
  
  const displayPosts = useMemo(() => {
    const userPosts = (state?.userPosts || []);
    return [...userPosts, ...staticPosts];
  }, [state?.userPosts]);

  return (
    <div style={{ display: "flex", justifyContent: "center", backgroundColor: "#F3F2EF", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1200px", width: "100%", display: "flex", gap: "20px", marginTop: "20px", padding: "0 16px" }}>
        
        <SidebarLeft />

        <div style={{ width: "50%", height: "calc(100vh - 100px)", overflowY: "auto", paddingBottom: "40px" }}>
          <CreatePost />

          {displayPosts.map((p) => (
            <Post key={p.id} data={p} />
          ))}
        </div>

        <SidebarRight />

      </div>
    </div>
  );
}
