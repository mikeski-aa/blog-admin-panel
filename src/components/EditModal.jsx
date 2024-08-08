import "../styles/modal.css";
import { useState } from "react";

async function handleSubmit(title, text, id) {
  const newbody = {
    newtitle: title,
    newtext: text,
    id: id,
  };
  console.log(newbody);
  const url = `http://localhost:3000/admin/editpost`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(newbody),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    window.location.href = "/posts";
  } catch (error) {
    console.log(error);
  }
}

function EditModal(props) {
  const [title, setTitle] = useState(props.title);
  const [text, setText] = useState(props.text);

  const handleTitleChange = (e) => {
    console.log(e.target.value);
    setTitle(e.target.value);
  };

  const handleTextChange = (e) => {
    console.log(e.target.value);
    setText(e.target.value);
  };

  const handleCancel = () => {
    props.setModal(false);
  };

  return (
    <>
      <div className={`editModal ${props.modalShow}`}>
        <div className="editBox">
          <form method="none" action={(e) => e.preventDefault()}>
            <div className="titleEdit">
              <label htmlFor="title"> Change title</label>
              <input
                type="text"
                defaultValue={props.title}
                onChange={(e) => handleTitleChange(e)}
              />
            </div>
            <div className="textEdit">
              <label htmlFor="text"> Change post body</label>
              <textarea
                defaultValue={props.text}
                onChange={(e) => handleTextChange(e)}
              />
            </div>
          </form>
          <button onClick={() => handleSubmit(title, text, props.id)}>
            Apply change
          </button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </>
  );
}

export default EditModal;
