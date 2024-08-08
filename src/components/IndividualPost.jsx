import { useState } from "react";
import EditModal from "./EditModal";

function IndividualPost(props) {
  const [id, setId] = useState(props.id);
  const [publish, setPublish] = useState(props.published);
  const [modalShow, setModalShow] = useState(false);

  let publishButton = "";
  let published = "false";

  if (publish === true) {
    publishButton = "Unpublish";
    published = "true";
  } else {
    publishButton = "Publish";
    published = "false";
  }

  const edithandler = () => {
    setModalShow(!modalShow);
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
      window.location.href = "/posts";
    } catch (error) {
      console.log(error);
    }
  };

  const publishHandler = async () => {
    const datastring = `id=${id}&state=${publish}`;

    try {
      const url = `http://localhost:3000/admin/publish?${datastring}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }

      const json = await response.json();
      console.log(json);
      setPublish(!publish);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <EditModal
        title={props.title}
        text={props.text}
        modalShow={modalShow}
        setModal={setModalShow}
        id={props.id}
      />
      <div className="postContainer">
        <div>Title: {props.title}</div>
        <div>Text: {props.text}</div>
        <div>Author ID: {props.authorid}</div>
        <div>Is the post published: {published}</div>
        <div>Post ID: {props.id}</div>
        <div>Author: {props.username}</div>
        <div className="buttons">
          <button onClick={publishHandler}>{publishButton}</button>
          <button onClick={edithandler}>Edit</button>
          <button onClick={deleteHandler}>Delete</button>
        </div>
      </div>
    </>
  );
}

export default IndividualPost;
