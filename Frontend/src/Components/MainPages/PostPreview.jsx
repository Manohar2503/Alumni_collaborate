import { useState } from "react";

export default function PostPreview({ content, limit = 100 }) {
  const [expanded, setExpanded] = useState(false);
  if (!content) return null;
  const isLong = content.length > limit;
  return (
    <p style={{ fontSize: "13px", color: "#333", margin: "0 0 12px 0", lineHeight: "1.5", whiteSpace: "pre-wrap" }}>
      {isLong && !expanded ? content.slice(0, limit) + "... " : content}
      {isLong && (
        <span onClick={() => setExpanded((s) => !s)} style={{ color: "#0A66C2", cursor: "pointer", fontWeight: 600 }}>
          {expanded ? " show less" : "more"}
        </span>
      )}
    </p>
  );
}
