import { useContext, useEffect, useState } from "react";
import { AdminAuth } from "../App";

async function getPosts(setShow) {
  const url = "http://localhost:3000/posts/adminposts";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });

    if (!response.ok) {
      throw new Error(`Error occurred ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    setShow(true);
    return json;
  } catch (error) {
    console.log(error);
  }
}

function Posts() {
  const [allPosts, setAllPosts] = useState([]);
  const [show, setShow] = useState(false);
  const adminAuth = useContext(AdminAuth);
  useEffect(() => {
    const posts = async () => {
      const result = await getPosts(setShow);
      console.log("ARR RES");
      console.log(result);
      setAllPosts(result.posts);
    };
    posts();
  }, []);

  if (show == false) {
    return <h2>You are not authorized to view this resource</h2>;
  }

  return (
    <>
      <h2>All blogposts go here</h2>
      {allPosts.map((post) => (
        <p>{post.title}</p>
      ))}
    </>
  );
}

export default Posts;
