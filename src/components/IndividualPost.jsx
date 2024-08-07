import { useState } from "react";

function IndividualPost(props) {
  const [id, setId] = useState(props.id);

  let published = "false";

  if (props.published == true) {
    published = "true";
  } else {
    published = "false";
  }

  const edithandler = () => {
    window.location.href = "/posts/edit";
  };

  const deleteHandler = async () => {
    alert("Are you sure you want to delete this post?");
    const url = `http://localhost:3000/admin/delete/${id}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.error}`);
      }

      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  const publishHandler = async () => {};

  return (
    <>
      <div className="postContainer">
        <div>Title: {props.title}</div>
        <div>Text: {props.text}</div>
        <div>Author ID: {props.authorid}</div>
        <div>Is the post published: {published}</div>
        <div>Post ID: {props.id}</div>
        <div>Author: {props.username}</div>
        <div className="buttons">
          <button onClick={publishHandler}>Publish toggle</button>
          <button onClick={edithandler}>Edit</button>
          <button onClick={deleteHandler}>Delete</button>
        </div>
      </div>
    </>
  );
}

export default IndividualPost;
