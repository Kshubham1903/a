//npm i axios

import React, { useState, useEffect } from "react";

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from JSONPlaceholder
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        setPosts(data);
      })
      .catch(error => {
        console.error("Fetch error:", error);
      });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Posts from JSONPlaceholder</h2>
      {posts.slice(0, 10).map(post => (
        <div key={post.id} style={{ marginBottom: 16 }}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

export default PostList;
