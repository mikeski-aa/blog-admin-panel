import { useContext, useEffect, useState } from "react";
import { AdminAuth } from "../App";
import IndividualPost from "../components/IndividualPost";
import "../styles/Posts.css";
import NewPostModal from "../components/NewPostModal";

async function getPosts(setShow) {
  const url = "http://localhost:3000/admin/posts";

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
  const [newPostModal, setNewPostModal] = useState(false);
  useEffect(() => {
    const posts = async () => {
      const result = await getPosts(setShow);
      console.log("ARR RES");
      console.log(result);
      setAllPosts(result.posts);
    };
    posts();
  }, []);

  const handleAddNewPost = () => {
    setNewPostModal(!newPostModal);
  };

  if (show == false) {
    return <h2>You are not authorized to view this resource</h2>;
  }

  return (
    <>
      <h2>All blogposts go here</h2>
      <NewPostModal setNewModal={setNewPostModal} newModalShow={newPostModal} />
      <div className="allPosts">
        <button onClick={handleAddNewPost}>Add new post</button>
        {allPosts.map((post) => (
          <IndividualPost
            title={post.title}
            text={post.text}
            authorid={post.userId}
            published={post.published}
            username={post.user.username}
            id={post.id}
            key={post.id}
          />
        ))}
      </div>
    </>
  );
}

export default Posts;
